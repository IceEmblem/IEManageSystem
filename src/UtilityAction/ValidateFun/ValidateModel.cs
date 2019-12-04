using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityAction.ValidateFun
{
    public class ValidateModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns>成功返回空，失败返回错误信息集合</returns>
        public Dictionary<string, string> Validate<T>(T t)
        {
            Dictionary<string, string> errors = null;

            ValidationContext context = new ValidationContext(t);
            List<ValidationResult> results = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(t, context, results, true);
            if (isValid == false)
            {
                errors = new Dictionary<string, string>();
                foreach (var item in results)
                {
                    errors.Add(item.MemberNames.FirstOrDefault(), item.ErrorMessage);
                }
                return errors;
            }

            return errors;
        }
    }
}
