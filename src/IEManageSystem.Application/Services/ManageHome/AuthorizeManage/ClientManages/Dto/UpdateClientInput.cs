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
        [StringLength(50, MinimumLength = 6)]
        [Required]
        public string ClientId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [StringLength(50, MinimumLength = 6)]
        public string ClientSecrets { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Url]
        public string RedirectUris { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Url]
        public string PostLogoutRedirectUris { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> AllowedGrantTypes { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> AllowedScopes { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public bool AllowOfflineAccess { get; set; }
    }
}
