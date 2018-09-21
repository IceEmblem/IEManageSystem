using IEManageSystem.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Models
{
    /// <summary>
    /// Api返回数据结构
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [Serializable]
    public class ApiResultDataModel<T> where T : OutputDtoBase
    {
        public ApiResultDataModel()
        {
        }

        public ApiResultDataModel(bool isSuccess)
        {
            IsSuccess = isSuccess;
        }

        public ApiResultDataModel(T t)
        {
            IsSuccess = t.IsSuccess();

            Message = t.ErrorMessage;

            Value = t;
        }

        public ApiResultDataModel(bool isSuccess, T t)
        {
            IsSuccess = true;
            Value = t;
        }

        public ApiResultDataModel(Dictionary<string, string> erros)
        {
            IsSuccess = false;
            ErrorList = erros;
            Message = erros.Values.FirstOrDefault();
        }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 消息(可用于显示错误消息)
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 重定向地址
        /// </summary>
        public string RedirectHref { get; set; }

        /// <summary>
        /// 是否执行成功
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// 错误列表
        /// </summary>
        public Dictionary<string, string> ErrorList { get; set; }

        /// <summary>
        /// 返回值
        /// </summary>
        public T Value { get; set; }
    }

    /// <summary>
    /// Api返回数据结构
    /// </summary>
    public class ApiResultDataModel
    {
        public ApiResultDataModel()
        {
        }

        public ApiResultDataModel(bool isSuccess)
        {
            IsSuccess = isSuccess;
        }

        public ApiResultDataModel(bool isSuccess, object t)
        {
            IsSuccess = true;
            Value = t;
        }

        public ApiResultDataModel(Dictionary<string, string> erros)
        {
            IsSuccess = false;
            ErrorList = erros;
            Message = erros.Values.FirstOrDefault();
        }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 消息(可用于显示错误消息)
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 重定向地址
        /// </summary>
        public string RedirectHref { get; set; }

        /// <summary>
        /// 是否执行成功
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// 错误列表
        /// </summary>
        public Dictionary<string, string> ErrorList { get; set; }

        /// <summary>
        /// 返回值
        /// </summary>
        public object Value { get; set; }
    }
}
