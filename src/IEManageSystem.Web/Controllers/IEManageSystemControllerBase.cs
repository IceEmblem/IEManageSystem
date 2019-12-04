using Abp.AspNetCore.Mvc.Controllers;
using Abp.Runtime.Validation;
using Abp.Web.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IEManageSystem.Api.Controllers
{
    public abstract class IEManageSystemControllerBase : AbpController
    {
        protected IEManageSystemControllerBase()
        {
            LocalizationSourceName = IEManageSystemConsts.LocalizationSourceName;
        }

        /// <summary>
        /// 保存模型验证信息
        /// </summary>
        protected Dictionary<string, string> _ValidateModelErrors { get; set; } = null;

        /// <summary>
        /// 反射验证模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        protected bool ValidateModel<T>(T t) where T : class
        {
            ValidationContext context = new ValidationContext(t);
            List<ValidationResult> results = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(t, context, results, true);
            if (isValid == true)
            {
                return true;
            }

            _ValidateModelErrors = new Dictionary<string, string>();
            foreach (var item in results)
            {
                foreach (var itemchild in item.MemberNames)
                {
                    if (!_ValidateModelErrors.ContainsKey(itemchild))
                        _ValidateModelErrors.Add(itemchild, item.ErrorMessage);
                }
            }

            return false;
        }

        /// <summary>
        /// 验证数据模型
        /// </summary>
        /// <returns></returns>
        protected bool ValidateModel()
        {
            if (ModelState.IsValid == true)
            {
                return true;
            }

            _ValidateModelErrors = new Dictionary<string, string>();
            foreach (var item in ModelState.Keys)
            {
                var modelState = ModelState[item];

                foreach (var error in modelState.Errors)
                {
                    if (!_ValidateModelErrors.ContainsKey(item))
                        _ValidateModelErrors.Add(item, error.ErrorMessage);
                }
            }

            return false;
        }
    }
}
