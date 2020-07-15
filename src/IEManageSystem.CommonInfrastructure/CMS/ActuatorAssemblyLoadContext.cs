using System;
using System.Collections.Generic;
using System.Runtime.Loader;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public class ActuatorAssemblyLoadContext : AssemblyLoadContext
    {
        public ActuatorAssemblyLoadContext() : base(isCollectible: true) 
        { 
        }
    }
}
