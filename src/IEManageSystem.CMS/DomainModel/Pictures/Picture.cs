using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace IEManageSystem.CMS.DomainModel.Pictures
{
    public class Picture
    {
        protected static Regex _regex = new Regex(@"/(?<name>[^/]*?)$");

        public static Picture CreatePictureFile(string webPath)
        {
            return new Picture(webPath, false);
        }

        public static Picture CreatePictureDir(string webPath)
        {
            return new Picture(webPath, true);
        }

        protected Picture(string webPath, bool isDir)
        {
            WebPath = webPath;

            Name = GetName(webPath);

            IsDir = isDir;
        }

        protected string GetName(string webPath)
        {
            string name = _regex.Match(webPath).Groups["name"].Value;

            return name;
        }

        /// <summary>
        /// 
        /// </summary>
        public string WebPath { get; protected set; }

        public string Name { get; protected set; }

        /// <summary>
        /// 是否是图片目录
        /// </summary>
        public bool IsDir { get; protected set; }
    }
}
