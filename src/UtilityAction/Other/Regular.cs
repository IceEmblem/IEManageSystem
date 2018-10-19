using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace UtilityAction.Other
{
    /// <summary>
    /// 正则
    /// </summary>
    public static class Regular
    {
        public static bool IsMatchUrl(string matchstr)
        {
            string Pattern = @"^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&$%\$#\=~])*$";
            Regex regex = new Regex(Pattern);

            return regex.IsMatch(matchstr);
        }
    }
}
