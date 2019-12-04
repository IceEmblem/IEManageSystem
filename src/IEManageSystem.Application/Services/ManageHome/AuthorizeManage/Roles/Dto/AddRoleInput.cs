using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto
{
    public class AddRoleInput
    {
        [Required]
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }
    }
}
