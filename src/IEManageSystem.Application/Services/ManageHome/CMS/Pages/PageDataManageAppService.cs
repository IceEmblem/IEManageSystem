using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.Runtime.Session;
using Abp.UI;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    [RemoteService(false)]
    [ApiAuthorization(ApiScopeProvider.Page)]
    public class PageDataManageAppService : IEManageSystemAppServiceBase, IPageDataManageAppService
    {
        private PageDataManager _pageDataManager { get; set; }

        private PageManager _pageManager { get; set; }

        private UpdateContentComponentDataService _updateContentComponentDataService { get; set; }

        private DeletePageDataService _deletePageDataService { get; set; }

        private UserManager _userManager { get; }

        private IAbpSession _abpSession { get; }

        public PageDataManageAppService(
            PageDataManager pageDataManager,
            PageManager pageManager,
            UpdateContentComponentDataService updateContentComponentDataService,
            DeletePageDataService deletePageDataService,
            UserManager userManager,
             IAbpSession abpSession
            )
        {
            _pageDataManager = pageDataManager;
            _pageManager = pageManager;
            _updateContentComponentDataService = updateContentComponentDataService;
            _deletePageDataService = deletePageDataService;
            _abpSession = abpSession;
            _userManager = userManager;
        }

        /// <summary>
        /// 添加文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public AddPageDataOutput AddPageData(AddPageDataInput input)
        {
            PageData pageData = new PageData()
            {
                Name = input.Name,
                Title = input.Title,
                Describe = input.Describe,
                Content = input.Content,
                Tags = input.Tags.Select(e=>new Tag() { Name = e.Name, DisplayName = e.DisplayName }).ToList(),
                Images = input.Images,
                Field1 = input.Field1,
                Field2 = input.Field2,
                Field3 = input.Field3,
                Field4 = input.Field4,
                Field5 = input.Field5,
            };

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageDataManager.AddPageData(input.PageName, pageData, editor);

            return new AddPageDataOutput();
        }

        /// <summary>
        /// 更新文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input)
        {
            var post = _pageDataManager.PostRepository.GetAllIncluding(new Expression<Func<PageData, object>>[] {
                    e=>e.Tags
                }).FirstOrDefault(e => e.Id == input.Id);

            post.Name = input.Name;
            post.Title = input.Title;
            post.Describe = input.Describe;
            post.Content = input.Content;
            post.Tags = input.Tags.Select(e => new Tag() { Name = e.Name, DisplayName = e.DisplayName }).ToList();
            post.Images = input.Images;
            post.Field1 = input.Field1;
            post.Field2 = input.Field2;
            post.Field3 = input.Field3;
            post.Field4 = input.Field4;
            post.Field5 = input.Field5;

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageDataManager.UpdatePageData(input.PageName, post, editor);

            return new UpdatePageDataOutput();
        }

        /// <summary>
        /// 创作者更新文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public UpdatePageDataOutput UpdatePageDataOfCreator(UpdatePageDataInput input)
        {
            var post = _pageDataManager.PostRepository.GetAllIncluding(new Expression<Func<PageData, object>>[] {
                    e=>e.Tags
                }).FirstOrDefault(e => e.Id == input.Id);

            post.Name = input.Name;
            post.Title = input.Title;
            post.Describe = input.Describe;
            post.Content = input.Content;
            post.Tags = input.Tags.Select(e => new Tag() { Name = e.Name, DisplayName = e.DisplayName }).ToList();
            post.Images = input.Images;
            post.Field1 = input.Field1;
            post.Field2 = input.Field2;
            post.Field3 = input.Field3;
            post.Field4 = input.Field4;
            post.Field5 = input.Field5;

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageDataManager.UpdatePageDataOfCreator(input.PageName, post, editor);

            return new UpdatePageDataOutput();
        }

        /// <summary>
        /// 删除文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public DeletePageDataOutput DeletePageData(DeletePageDataInput input)
        {
            var pageData = _pageDataManager.PostRepository.FirstOrDefault(e => e.Name == input.Name && e.PageName == input.PageName);

            if (pageData == null)
            {
                throw new UserFriendlyException("找不到要删除的文章");
            }

            _deletePageDataService.DeletePageData(pageData);

            return new DeletePageDataOutput();
        }

        /// <summary>
        /// 创造者删除文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public DeletePageDataOutput DeletePageDataOfCreator(DeletePageDataInput input)
        {
            var pageData = _pageDataManager.PostRepository.FirstOrDefault(e => e.Name == input.Name && e.PageName == input.PageName);

            if (pageData == null)
            {
                throw new UserFriendlyException("找不到要删除的文章");
            }

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _deletePageDataService.DeletePageDataOfCreator(pageData, editor);

            return new DeletePageDataOutput();
        }

        /// <summary>
        /// 更新文章数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public UpdateComponentDataOutput UpdateComponentData(UpdateComponentDataInput input)
        {
            List<ContentComponentData> contentComponentDatas = new List<ContentComponentData>();
            foreach (var item in input.ComponentDatas)
            {
                var componentData = new ContentComponentData()
                {
                    Sign = item.Sign,

                };
                componentData.SingleDatas = new List<ComponentSingleData>();

                foreach (var singleData in item.SingleDatas)
                {
                    componentData.SingleDatas.Add(new ComponentSingleData()
                    {
                        Name = singleData.Name,
                        SortIndex = singleData.SortIndex,
                        Field1 = singleData.Field1,
                        Field2 = singleData.Field2,
                        Field3 = singleData.Field3,
                        Field4 = singleData.Field4,
                        Field5 = singleData.Field5,
                    });
                }

                contentComponentDatas.Add(componentData);
            }

            var pageData = _pageDataManager.PostRepository.FirstOrDefault(e => e.Name == input.PageDataName && e.PageName == input.PageName);

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _updateContentComponentDataService.UpdateContentComponentData(pageData, contentComponentDatas, editor);

            return new UpdateComponentDataOutput();
        }

        /// <summary>
        /// 创造者更新文章数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public UpdateComponentDataOutput UpdateComponentDataOfCreator(UpdateComponentDataInput input)
        {
            List<ContentComponentData> contentComponentDatas = new List<ContentComponentData>();
            foreach (var item in input.ComponentDatas)
            {
                var componentData = new ContentComponentData()
                {
                    Sign = item.Sign,

                };
                componentData.SingleDatas = new List<ComponentSingleData>();

                foreach (var singleData in item.SingleDatas)
                {
                    componentData.SingleDatas.Add(new ComponentSingleData()
                    {
                        Name = singleData.Name,
                        SortIndex = singleData.SortIndex,
                        Field1 = singleData.Field1,
                        Field2 = singleData.Field2,
                        Field3 = singleData.Field3,
                        Field4 = singleData.Field4,
                        Field5 = singleData.Field5,
                    });
                }

                contentComponentDatas.Add(componentData);
            }

            var pageData = _pageDataManager.PostRepository.FirstOrDefault(e => e.Name == input.PageDataName && e.PageName == input.PageName);

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _updateContentComponentDataService.UpdateContentComponentDataOfCreator(pageData, contentComponentDatas, editor);

            return new UpdateComponentDataOutput();
        }
    }
}
