using System;
using System.Collections.Generic;
using System.Text;
using Abp.ObjectMapping;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.Pictures;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Services.ManageHome.CMS.Pictures.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Pictures
{
    [ApiAuthorization(ApiScopeProvider.Page)]
    public class PictureManageAppService : IEManageSystemAppServiceBase, IPictureManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PictureManager _pictureManager { get; set; }

        public PictureManageAppService(
            IObjectMapper objectMapper,
            PictureManager pictureManager)
        {
            _objectMapper = objectMapper;

            _pictureManager = pictureManager;
        }

        [ApiAuthorizationQuery]
        public GetFileAndDirsOutput GetFileAndDirs(GetFileAndDirsInput input)
        {
            List<Picture> pictures = _pictureManager.GetFileAndDirs(input.PicDirPath);

            return new GetFileAndDirsOutput() { Pictures = _objectMapper.Map<List<PictureDto>>(pictures) };
        }

        public SavePictureOutput SavePicture(SavePictureInput input)
        {
            _pictureManager.SavePicture(input.PicWebPath, input.Base64Image);

            return new SavePictureOutput();
        }

        public DeletePictureOutput DeletePicture(DeletePictureInput input)
        {
            _pictureManager.DeletePicture(input.PicWebPath);

            return new DeletePictureOutput();
        }

        public CreateDirOutput CreateDir(CreateDirInput input)
        {
            _pictureManager.CreateDir(input.PicWebPath);

            return new CreateDirOutput();
        }

        public DeleteDirOutput DeleteDir(DeleteDirInput input)
        {
            _pictureManager.DeleteDir(input.PicWebPath);

            return new DeleteDirOutput();
        }
    }
}
