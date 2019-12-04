using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users.Accounts
{
    public class SafetyProblem:ValueObject<SafetyProblem>
    {
        public SafetyProblem(string problem, string answer)
        {
            Problem = problem;
            Answer = answer;
        }

        /// <summary>
        /// 问题
        /// </summary>
        [MaxLength(20)]
        [MinLength(4)]
        public string Problem { get; protected set; }

        /// <summary>
        /// 答案
        /// </summary>
        [MaxLength(20)]
        [MinLength(4)]
        public string Answer { get; protected set; }
    }
}
