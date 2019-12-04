using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto
{
    public class UpdateRoleInput
    {
        [Required]
        public int Id { get; set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }
    }
}
