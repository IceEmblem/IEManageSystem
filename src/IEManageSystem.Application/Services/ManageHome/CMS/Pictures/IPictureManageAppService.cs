using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Pictures.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pictures
{
    public interface IPictureManageAppService: IApplicationService
    {
        GetFileAndDirsOutput GetFileAndDirs(GetFileAndDirsInput input);

        SavePictureOutput SavePicture(SavePictureInput input);

        DeletePictureOutput DeletePicture(DeletePictureInput input);

        CreateDirOutput CreateDir(CreateDirInput input);

        DeleteDirOutput DeleteDir(DeleteDirInput input);
    }
}
