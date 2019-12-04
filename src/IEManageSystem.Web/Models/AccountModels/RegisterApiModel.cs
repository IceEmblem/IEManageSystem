using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Models.AccountModels
{
    public class RegisterApiModel
    {
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string AccountID { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string Password { get; set; }
    }
}
