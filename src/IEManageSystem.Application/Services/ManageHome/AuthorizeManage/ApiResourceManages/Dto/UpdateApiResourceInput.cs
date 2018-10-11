using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto
{
    public class UpdateApiResourceInput
    {
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string DisplayName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> Claims { get; set; }
    }
}
