using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pictures;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(Picture))]
    public class PictureDto
    {
        public string WebPath { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// 是否是图片目录
        /// </summary>
        public bool IsDir { get; set; }
    }
}
