using Abp.Dependency;
using Abp.UI;
using IEManageSystem.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UtilityAction.FileHandle;

namespace IEManageSystem.CMS.DomainModel.Pictures
{
    public class PictureManager : ITransientDependency
    {
        public static string PictureDirPath { get; }

        static PictureManager()
        {
            PictureDirPath = AppConfigurations.RootPath + "\\Picture";

            if (!Directory.Exists(PictureDirPath))
            {
                Directory.CreateDirectory(PictureDirPath);
            }
        }

        public void SavePicture(string picWebPath, string base64Image)
        {
            string fullPath = PictureDirPath + picWebPath;

            if (File.Exists(fullPath))
            {
                throw new UserFriendlyException("文件以存在");
            }

            ImageHandle.SaveImage(base64Image, fullPath);
        }

        public void DeletePicture(string picWebPath)
        {
            string fullPath = PictureDirPath + picWebPath;

            if (!File.Exists(fullPath))
            {
                return;
            }

            File.Delete(fullPath);
        }

        public void CreateDir(string picWebPath) 
        {
            string fullPath = PictureDirPath + picWebPath;

            if (Directory.Exists(fullPath))
            {
                return;
            }

            Directory.CreateDirectory(fullPath);
        }

        public void DeleteDir(string picWebPath)
        {
            string fullPath = PictureDirPath + picWebPath;

            if (!Directory.Exists(fullPath))
            {
                return;
            }

            Directory.Delete(fullPath);
        }

        public List<Picture> GetFileAndDirs(string picWebPath)
        {
            string fullPath = PictureDirPath + picWebPath;

            List<Picture> pictures = new List<Picture>();

            string[] dirs = Directory.GetDirectories(fullPath);
            foreach (string dir in dirs)
            {
                pictures.Add(Picture.CreatePictureDir(ToWebPath(dir)));
            }

            string[] files = Directory.GetFiles(fullPath);
            foreach (string file in files)
            {
                pictures.Add(Picture.CreatePictureFile(ToWebPath(file)));
            }

            return pictures;
        }


        private string ToWebPath(string path)
        {
            return path.Replace(AppConfigurations.RootPath, "").Replace("\\", "/");
        }
    }
}
