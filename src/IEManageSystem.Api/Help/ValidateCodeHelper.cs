using Abp.Dependency;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UtilityAction.ValidateFun;

namespace IEManageSystem.Api.Help
{
    public class ValidateCodeHelper
    {
        private string ValidateCodeSesssionName { get; set; } = "ValidateCode";

        private IHttpContextAccessor _HttpContextAccessor { get; set; }

        private HttpContext _HttpContext {
            get {
                return _HttpContextAccessor.HttpContext;
            }
        }

        public ValidateCodeHelper(IHttpContextAccessor httpContextAccessor)
        {
            _HttpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// 生成一个验证码
        /// </summary>
        /// <returns></returns>
        public MemoryStream CreateValidateCode()
        {
            string code = "";
            VerificationCode verificationCode = new VerificationCode();
            System.IO.MemoryStream ms = verificationCode.Create(out code);
            _HttpContext.Session.SetString(ValidateCodeSesssionName, code);

            return ms;
        }

        /// <summary>
        /// 获取当前验证码
        /// </summary>
        /// <returns></returns>
        public string GetValidateCode()
        {
            return _HttpContext.Session.GetString(ValidateCodeSesssionName);
        }
    }
}
