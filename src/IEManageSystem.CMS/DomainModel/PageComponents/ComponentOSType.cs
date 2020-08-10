using Abp.Domain.Values;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class ComponentOSType : ValueObject
    {
        public const string WebComponentType = "Web";

        public const string ReactNativeComponentType = "Native";

        public string OS { get; protected set; }

        protected ComponentOSType() { 
        }

        protected ComponentOSType(string type) {
            OS = type;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new string[] { OS };
        }

        public static ComponentOSType WebComponent => new ComponentOSType("Web");

        public static ComponentOSType ReactNativeComponent => new ComponentOSType("Native");

        public static ComponentOSType CreateOSType(string type) {
            if (type == WebComponentType || string.IsNullOrEmpty(type)) {
                return WebComponent;
            }

            if (type == ReactNativeComponentType) {
                return ReactNativeComponent;
            }

            throw new UserFriendlyException("无效的组件类型");
        }
    }
}
