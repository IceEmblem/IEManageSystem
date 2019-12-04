using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace UtilityAction.FileHandle
{
    public class ImageHandle
    {
        /// <summary>
        ///  将echarts返回的base64 转成图片
        /// </summary>
        /// <param name="image">图片的base64形式</param>
        /// <param name="proname">项目区分</param>
        public static void SaveImage(string image, string path)
        {
            string filepath = Path.GetDirectoryName(path);

            // 如果不存在就创建file文件夹
            if (!Directory.Exists(filepath))
            {
                if (filepath != null) Directory.CreateDirectory(filepath);
            }

            var match = Regex.Match(image, "data:image/png;base64,([\\w\\W]*)$");
            if (match.Success)
            {
                image = match.Groups[1].Value;
            }

            var photoBytes = Convert.FromBase64String(image);
            System.IO.File.WriteAllBytes(path, photoBytes);
        }
    }
}
