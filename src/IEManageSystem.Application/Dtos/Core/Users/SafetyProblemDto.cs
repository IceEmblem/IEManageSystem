using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization.Users.Accounts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Dtos.Core.Users
{
    [AutoMap(typeof(SafetyProblem))]
    public class SafetyProblemDto
    {
        /// <summary>
        /// 问题
        /// </summary>
        public string Problem { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        public string Answer { get; set; }
    }
}
