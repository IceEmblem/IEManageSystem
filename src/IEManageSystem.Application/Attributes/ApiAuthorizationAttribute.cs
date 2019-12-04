using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using IEManageSystem.ApiAuthorization.DomainModel;
using Abp.Web.Models;

namespace IEManageSystem.Attributes
{
    /// <summary>
    /// Api授权特性，作用于控制器上或AppService上，应用此特性将会启用Api域的授权检查
    /// </summary>
    [AttributeUsage(AttributeTargets.Class , AllowMultiple = true, Inherited = true)]
    public class ApiAuthorizationAttribute : Attribute
    {
        public string ApiScopeName { get; set; }

        public ApiAuthorizationAttribute(string apiScopeName = null)
        {
            ApiScopeName = apiScopeName;
        }
    }
}
