using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto
{
    public class UpdateClientInput
    {
        public int Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [MinLength(6)]
        [MaxLength(50)]
        [Required]
        public string ClientId;

        /// <summary>
        /// 
        /// </summary>
        [MinLength(6)]
        [MaxLength(50)]
        public string ClientSecrets;

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string RedirectUris;

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string PostLogoutRedirectUris;

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> AllowedGrantTypes;

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> AllowedScopes;

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public bool AllowOfflineAccess;
    }
}
