using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos
{
    public class OutputDtoBase
    {
        /// <summary>
        /// 是否执行成功
        /// </summary>
        public bool IsSuccess()
        {
            if (ErrorMessage == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 错误消息
        /// </summary>
        [NonSerialized]
        public string ErrorMessage = null;
    }
}
