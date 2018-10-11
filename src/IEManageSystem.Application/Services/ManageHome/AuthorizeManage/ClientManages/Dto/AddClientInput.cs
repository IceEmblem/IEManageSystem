using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto
{
    public class AddClientInput
    {
        /// <summary>
        /// 
        /// </summary>
        public string ClientId;

        /// <summary>
        /// 
        /// </summary>
        public List<string> AllowedGrantTypes;

        /// <summary>
        /// 
        /// </summary>
        public List<string> ClientSecrets;

        /// <summary>
        /// 
        /// </summary>
        public List<string> RedirectUris;

        /// <summary>
        /// 
        /// </summary>
        public List<string> PostLogoutRedirectUris;

        /// <summary>
        /// 
        /// </summary>
        public List<string> AllowedScopes;

        /// <summary>
        /// 
        /// </summary>
        public bool AllowOfflineAccess;
    }
}
