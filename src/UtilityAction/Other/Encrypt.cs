using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace UtilityAction.Other
{
    public class Encrypt
    {
        public static string MD5Utf8(string input)
        {
            var md5 = MD5.Create();

            var result = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var strResult = BitConverter.ToString(result);

            return strResult;
        }
    }
}
