using Abp.Collections.Extensions;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageData:Entity, IHasCreationTime
    {
        public string Name { get; set; }

        public string Title { get; set; }

        public string Describe { get; set; }

        public string Content { get; set; }

        public string Images { get; set; }

        [Range(0, 10)]
        public double Score { get; protected set; }

        public int ScoreNum { get; protected set; }

        public string ScoreUser { get; protected set; }

        /// <summary>
        /// 点击量
        /// </summary>
        public int Click { get; protected set; }

        // 扩展字段
        public string Field1 { get; set; }

        public string Field2 { get; set; }

        public string Field3 { get; set; }

        public string Field4 { get; set; }

        public string Field5 { get; set; }

        public EntityEdit Creator { get; set; }

        public EntityEdit LastUpdater { get; set; }

        /// <summary>
        /// 即将删除-------------------------
        /// </summary>
        public DateTime CreationTime { get; set; }

        public string PageName { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public void ToClick() {
            Click++;
        }

        public void ToScore(int score, int userId) 
        {
            if (score < 0 || score > 10) {
                throw new UserFriendlyException("无效的评分范围");
            }

            string userIdStr = userId.ToString();
            List<string> userIds = ScoreUser == null ? new List<string>() : ScoreUser.Split("|").ToList();
            if (userIds.Any(e=>e == userIdStr)) {
                throw new UserFriendlyException("已评分，无法再次评分");
            }

            if (userIds.Count > 5000) {
                throw new UserFriendlyException("评分人数已达到上限");
            }

            double sum = Score * ScoreNum;
            sum = sum + score;
            ScoreNum++;
            Score = sum / ScoreNum;
            userIds.Add(userIdStr);
            ScoreUser = userIds.JoinAsString("|");
        }
    }
}
