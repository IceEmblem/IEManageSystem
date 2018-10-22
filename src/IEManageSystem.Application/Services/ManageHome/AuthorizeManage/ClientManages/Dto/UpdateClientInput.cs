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
        public string ClientSecret { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Url]
        public string RedirectUri { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Url]
        public string PostLogoutRedirectUri { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string AllowedGrantType { get; set; }

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
