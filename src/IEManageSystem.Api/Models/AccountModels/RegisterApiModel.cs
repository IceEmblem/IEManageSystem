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
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string AccountID { get; set; }

        [Required]
        public string Password { get; set; }
        
        [Required]
        public string VaildCode { get; set; }
    }
}
