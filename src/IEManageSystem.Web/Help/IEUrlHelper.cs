using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help
{
    public class IEUrlHelper
    {
        public static string CreateUrl(string controllerName, string actionName)
        {
            controllerName = TrimEndString(controllerName, "AppService", "");

            controllerName = TrimEndString(controllerName, "Controller", "");

            return $"api/{controllerName}/{actionName}";
        }

        /// <summary>
        /// 替换字符串末尾位置中指定的字符串
        /// </summary>
        /// <param name="source">源串</param>
        /// <param name="searchStr">查找的串</param>
        /// <param name="replaceStr">替换的目标串</param>
        private static string TrimEndString(string source, string searchStr, string replaceStr)
        {
            var result = source;
            try
            {
                if (string.IsNullOrEmpty(result))
                {
                    return result;
                }
                if (source.Length < searchStr.Length)
                {
                    return result;
                }
                if (source.IndexOf(searchStr, source.Length - searchStr.Length, searchStr.Length, StringComparison.Ordinal) > -1)
                {
                    result = source.Substring(0, source.Length - searchStr.Length);
                }
                return result;
            }
            catch (Exception e)
            {
                return result;
            }
        }
    }
}
