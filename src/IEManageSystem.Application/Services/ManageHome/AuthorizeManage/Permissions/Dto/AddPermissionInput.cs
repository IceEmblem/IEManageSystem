using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto
{
    public class AddPermissionInput
    {
        [Required]
        public string Name { get; set; }

        public string DisplayName { get; set; }
    }
}
