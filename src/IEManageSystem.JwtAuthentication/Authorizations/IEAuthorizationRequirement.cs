using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.JwtAuthentication.Authorizations
{
    public class IEAuthorizationRequirement: IAuthorizationRequirement
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="isAllowAccess">
        ///     是否允许访问
        ///         IEnumerable<string>：权限列表
        ///         返回值：是否允许访问
        /// </param>
        public IEAuthorizationRequirement(
            Func<IEnumerable<string>, bool> isAllowAccess
            )
        {
            IsAllowAccess = isAllowAccess;
        }

        public Func<IEnumerable<string>, bool> IsAllowAccess { get; protected set; }
    }
}
