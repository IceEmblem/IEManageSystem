using Abp.Dependency;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Web
{
    public interface IIEMemoryCache : IMemoryCache, ISingletonDependency
    {
    }
}
