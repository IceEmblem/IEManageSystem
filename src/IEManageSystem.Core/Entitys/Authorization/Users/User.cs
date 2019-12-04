using Abp.Domain.Entities;
using IEManageSystem.Configuration;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users.Accounts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;
using UtilityAction.FileHandle;

namespace IEManageSystem.Entitys.Authorization.Users
{
    [Table("User")]
    public class User:Entity
    {
        protected User() {
        }

        public User(Account account)
        {
            Account = account;
        }

        public Account Account { get; protected set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        [EmailAddress]
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        [Phone]
        public string Phone { get; set; }

        /// <summary>
        /// 个性签名
        /// </summary>
        public string PersonSignature { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; protected set; }

        /// <summary>
        /// 真实姓名
        /// </summary>
        public string RealName { get; set; }

        /// <summary>
        /// 身份证号
        /// </summary>
        public string IDNumber { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 性别（true男，false女）
        /// </summary>
        public bool Sex { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// 权限
        /// </summary>
        public ICollection<UserRole> UserRoles { get; set; }

        public int? TenantId { get; set; }

        public void AddRole(Role role)
        {
            UserRole userRole = new UserRole(this, role);

            if (UserRoles == null) {
                UserRoles = new List<UserRole>();
            }

            UserRoles.Add(userRole);
        }

        public void SetHeadSculpture(string base64Image)
        {
            string rootPath = AppConfigurations.RootPath;
            string webPath = $"\\Sonarqube\\{Id}.png";

            if (!string.IsNullOrEmpty(HeadSculpture))
            {
                File.Delete(rootPath + HeadSculpture);
            }

            string path = rootPath + webPath;

            if (File.Exists(path))
            {
                File.Delete(path);
            }

            ImageHandle.SaveImage(base64Image, path);

            HeadSculpture = webPath;
        }
    }
}
