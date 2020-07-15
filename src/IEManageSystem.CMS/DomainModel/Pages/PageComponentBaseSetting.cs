using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    /// <summary>
    /// 页面组件基本设置
    /// </summary>
    public class PageComponentBaseSetting:ValueObject
    {
        protected PageComponentBaseSetting() { }

        public PageComponentBaseSetting(int sortIndex, string width, string height, string padding, string margin, string backgroundImage,string backgroundColor, string className)
        {
            SortIndex = sortIndex;
            Width = width;
            Height = height;
            Padding = padding;
            Margin = margin;
            BackgroundColor = backgroundColor;
            BackgroundImage = backgroundImage;
            ClassName = className;
        }

        public int SortIndex { get; protected set; }

        public string Width { get; protected set; }

        public string Height { get; protected set; }

        public string Padding { get; protected set; }

        public string Margin { get; protected set; }

        public string BackgroundColor { get; protected set; }

        public string BackgroundImage { get; protected set; }

        public string ClassName { get; protected set; }

        protected override IEnumerable<object> GetAtomicValues()
        {

            yield return SortIndex;
            yield return Width;
            yield return Height;
            yield return Padding;
            yield return Margin;
            yield return BackgroundColor;
            yield return BackgroundImage;
            yield return ClassName;
        }
    }
}
