using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.Core
{
    public class IEMemoryCache : MemoryCache, IIEMemoryCache
    {
        public IEMemoryCache() : base(new MemoryCacheOptions {
            SizeLimit = null
        })
        {
        }
    }
}
