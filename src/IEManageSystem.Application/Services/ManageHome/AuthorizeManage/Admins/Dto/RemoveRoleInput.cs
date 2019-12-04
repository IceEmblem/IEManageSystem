using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto
{
    public class RemoveRoleInput
    {
        [Required]
        public int AdminId { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}
