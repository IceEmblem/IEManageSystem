using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Models.ConsentModels
{
    public class ConsentModel
    {
        public string ClientName { get; set; }
        public string ClientUrl { get; set; }
        public string ClientLogoUrl { get; set; }
        public bool AllowRememberConsent { get; set; }

        public IEnumerable<ScopeResourceModel> IdentityScopes { get; set; }
        public IEnumerable<ScopeResourceModel> ResourceScopes { get; set; }
    }
}
