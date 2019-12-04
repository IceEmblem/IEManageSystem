using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users
{
    [Table("UserRole")]
    public class UserRole : Entity
    {
        protected UserRole() {
        }

        public UserRole(User user, Role role)
        {
            UserId = user.Id;

            RoleId = role.Id;

            Role = role;
        }

        public int UserId { get; protected set; }

        public int RoleId { get; protected set; }

        public Role Role { get; set; }
    }
}
