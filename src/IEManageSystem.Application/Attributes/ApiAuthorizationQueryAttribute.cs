using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Attributes
{
    /// <summary>
    /// Api授权查询特性，此特性应用于方法，应用此特性说明该方法是一个查询方法，需要拥有Api域的查询才可访问，若未应用此特性则说明该方法是一个管理方法，需要拥有Api域的管理权限才可访问
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class ApiAuthorizationQueryAttribute: Attribute
    {
    }
}
