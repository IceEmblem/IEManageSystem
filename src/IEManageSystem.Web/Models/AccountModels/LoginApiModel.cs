using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Models.AccountModels
{
    public class LoginApiModel
    {
        [Required]
        public string AccountID { get; set; }
        
        [Required]
        public string Password { get; set; }

        public bool RememberLogin { get; set; }

        public string ReturnUrl { get; set; }
    }
}
