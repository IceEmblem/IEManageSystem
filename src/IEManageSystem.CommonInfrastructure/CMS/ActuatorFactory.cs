using Abp.Domain.Entities;
using IEManageSystem.CMS;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.Extensions.DependencyModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;
using System.Threading;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public class ActuatorFactory : IActuatorFactory
    {
        private ReaderWriterLockSlim _rwlock { get; } = new ReaderWriterLockSlim();

        private MemoryStream _assemblyMemoryStream;

        private ActuatorAssemblyLoadContext _assemblyLoadContext { get; set; }

        private Assembly _actuatorsAssembly { get; set; }

        private Dictionary<string, Actuator> _actuators { get; set; } = new Dictionary<string, Actuator>();

        private Dictionary<string, string> _actuatorCodes { get; set; } = new Dictionary<string, string>();

        public ActuatorFactory() 
        {
            if (!CreateAssemblyMemoryStream().Success)
            {
                throw new Exception("执行器程序集创建失败");
            }

            CreateActuatorsAssembly();
        }

        private EmitResult CreateAssemblyMemoryStream() 
        {
            if (_assemblyMemoryStream != null) {
                _assemblyMemoryStream.Close();
            }

            _assemblyMemoryStream = new MemoryStream();

            // var assemblyNames = typeof(ActuatorFactory).Assembly.GetReferencedAssemblies().Select(e=>e.Name).ToList();

            var refs = AppDomain.CurrentDomain.GetAssemblies()
                .Where(e => !e.IsDynamic && !string.IsNullOrWhiteSpace(e.Location))
                .Select(e=> MetadataReference.CreateFromFile(e.Location))
                .ToList();

            refs.Add(MetadataReference.CreateFromFile(typeof(object).Assembly.Location));

            //List<MetadataReference> refs = new List<MetadataReference>() {
            //    MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(List<int>).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(IQueryable).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(ASCIIEncoding).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(JsonConvert).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(IEManageSystemCMSModule).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(Entity).Assembly.Location),
            //    MetadataReference.CreateFromFile(typeof(Enumerable).Assembly.Location),
            //};

            var cSharpCompilation = CSharpCompilation
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

            foreach (var code in _actuatorCodes) {
                cSharpCompilation = cSharpCompilation.AddSyntaxTrees(CSharpSyntaxTree.ParseText(CreateActuatorCode(code.Key, code.Value)));
            }

            var result = cSharpCompilation.Emit(_assemblyMemoryStream);

            _assemblyMemoryStream.Seek(0, SeekOrigin.Begin);

            return result;
        }

        private void CreateActuatorsAssembly() 
        {
            _assemblyLoadContext?.Unload();

            _assemblyLoadContext = new ActuatorAssemblyLoadContext();
            _actuatorsAssembly = _assemblyLoadContext.LoadFromStream(_assemblyMemoryStream);
        }

        private string CreateActuatorClassName(string name) => $"{name}__Actuator__"; 

        private string CreateActuatorCode(string name, string funCode) {
            return $@"
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.CommonInfrastructure.CMS;
using IEManageSystem.CMS.DomainModel.PageComponents;
using Abp.UI;
using Abp.Authorization;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.Linq;

public class {CreateActuatorClassName(name)} : BaseActuator {{
    {funCode}
}}
";
        }

        public IActuator GetActuator(string name)
        {
            _rwlock.EnterReadLock();

            try
            {
                if (_actuators.ContainsKey(name))
                {
                    return _actuators[name];
                }

                Type type = _actuatorsAssembly.GetType(CreateActuatorClassName(name));

                if (type == null)
                {
                    return null;
                }

                object obj = Activator.CreateInstance(type);

                MethodInfo mInfo = type.GetMethod("Exec");

                Action<ContentComponentData, PageComponentBase, PageData, PageBase, User, string> action =
                    (ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request) =>
                    {
                        mInfo.Invoke(obj, new object[] { componentData, pageComponent, pageData, page, user, request });
                    };

                var actuator = new Actuator(action);

                _actuators[name] = actuator;

                return actuator;
            }
            catch (Exception ex) 
            {
                throw ex;
            }
            finally
            {
                _rwlock.ExitReadLock();
            }
        }

        public void Register(string name, string code)
        {
            _rwlock.EnterWriteLock();

            try
            {
                string oldCode;
                bool isExistOldCode = _actuatorCodes.TryGetValue(name, out oldCode); ;

                _actuatorCodes[name] = code;

                // 生成新的程序集流
                var eResult = CreateAssemblyMemoryStream();

                if (!eResult.Success)
                {
                    if (isExistOldCode)
                    {
                        _actuatorCodes[name] = oldCode;
                    }
                    else
                    {
                        _actuatorCodes.Remove(name);
                    }

                    throw new Exception($"执行器{name}注册失败，错误信息：{eResult.Diagnostics.First().ToString()}");
                }

                // 使用新的程序集
                CreateActuatorsAssembly();

                // _actuators 的成员是由上一个程序集生成的，所以释放掉
                _actuators = new Dictionary<string, Actuator>();
            }
            finally 
            {
                _rwlock.ExitWriteLock();
            }
        }
    }
}
