using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.Users.Dto
{
    public class SetSafetyProblemInput
    {
        /// <summary>
        /// 问题
        /// </summary>
        [MinLength(4)]
        [MaxLength(20)]
        public string Problem { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        [MinLength(4)]
        [MaxLength(20)]
        public string Answer { get; set; }
    }
}
