using Abp.Collections.Extensions;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
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

        public DateTime CreationTime { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public void ToClick() {
            Click++;
        }

        public void ToScore(int score, int userId) 
        {
            if (score < 0 || score > 10) {
                throw new Exception("评分范围错误");
            }

            string userIdStr = userId.ToString();
            List<string> userIds = ScoreUser.Split("|").ToList();
            if (userIds.Any(e=>e == userIdStr)) {
                throw new Exception("用户已评论过，无法再评论");
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
