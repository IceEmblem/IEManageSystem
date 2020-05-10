using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.Extensions.DependencyModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public class ActuatorFactory : IActuatorFactory
    {
        private AppDomain _actuatorsDomain { get; set; }

        private CSharpCompilation _cSharpCompilation { get; }

        private Assembly _actuatorsAssembly { get; set; }

        private static string _actuatorsAssemblyName { get; } = Directory.GetCurrentDirectory() + "\\Actuators.dll";

        private Dictionary<string, Actuator> _actuators { get; } = new Dictionary<string, Actuator>();

        public ActuatorFactory() 
        {
            _actuatorsDomain = AppDomain.CreateDomain("ActuatorsDomain");

            IEnumerable<MetadataReference> refs = AppDomain.CurrentDomain.GetAssemblies().Where(e=> !e.IsDynamic ).Select(x => MetadataReference.CreateFromFile(x.Location));

            _cSharpCompilation = CSharpCompilation
                .Create(Guid.NewGuid().ToString() + ".dll")
                .WithOptions(new CSharpCompilationOptions(
                    Microsoft.CodeAnalysis.OutputKind.DynamicallyLinkedLibrary,
                    usings: null,
                    optimizationLevel: OptimizationLevel.Debug, // TODO
                    checkOverflow: false,                       // TODO
                    allowUnsafe: true,                          // TODO
                    platform: Platform.AnyCpu,
                    warningLevel: 4,
                    xmlReferenceResolver: null
                    )
                )
                .AddReferences(refs);

            if (File.Exists(_actuatorsAssemblyName)) {
                // _actuatorsAssembly = Assembly.LoadFile(_actuatorsAssemblyName);
                _actuatorsAssembly = _actuatorsDomain.Load(_actuatorsAssemblyName);

                return;
            }

            var eResult = _cSharpCompilation.Emit(_actuatorsAssemblyName);

            if (!eResult.Success) {
                throw new Exception("执行器程序集创建失败");
            }

            _actuatorsAssembly = _actuatorsDomain.Load(_actuatorsAssemblyName);

            // _actuatorsAssembly = Assembly.LoadFile(_actuatorsAssemblyName);
        }

        private string CreateActuatorClassName(string name) => $"{name}__Actuator__"; 

        private string CreateActuatorCode(string name, string funCode) {
            return $@"
public class {CreateActuatorClassName(name)} {{
    ${funCode}
}}
";
        }

        public IActuator GetActuator(string name)
        {
            if (_actuators.ContainsKey(name)) {
                return _actuators[name];
            }

            Type type = _actuatorsAssembly.GetType(CreateActuatorClassName(name));

            if (type == null) {
                return null;
            }

            object obj = Activator.CreateInstance(type);

            MethodInfo mInfo = type.GetMethod("Exec");

            Action<ContentComponentData, PageComponentBase, PageData> action = (ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData) => {
                mInfo.Invoke(obj, new object[]{ componentData, pageComponent, pageData });
            };

            _actuators[name] = new Actuator(action);

            return _actuators[name];
        }

        public void Register(string name, string code)
        {
            AppDomain.Unload(_actuatorsDomain);

            string actuatorCode = CreateActuatorCode(name, code);

            _cSharpCompilation.AddSyntaxTrees(CSharpSyntaxTree.ParseText(actuatorCode));

            var eResult = _cSharpCompilation.Emit(_actuatorsAssemblyName);

            if (!eResult.Success) {
                throw new Exception($"执行器{name}注册失败");
            }

            _actuatorsDomain = AppDomain.CreateDomain("ActuatorsDomain");

            _actuatorsAssembly = _actuatorsDomain.Load(_actuatorsAssemblyName);

            // _actuatorsAssembly = Assembly.LoadFile(_actuatorsAssemblyName);
        }
    }
}
