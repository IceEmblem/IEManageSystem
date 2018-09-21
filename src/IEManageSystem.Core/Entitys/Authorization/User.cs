using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization
{
    [Table("User")]
    public class User:Entity
    {
        [Required]
        [MaxLength(15)]
        [MinLength(6)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(60)]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Phone]
        public string Phone { get; set; }

        public string HeadSculpture { get; set; }

        public string Role { get; set; }

        public int? TenantId { get; set; }
    }
}
