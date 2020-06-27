using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 15, nullable: false),
                    Password = table.Column<string>(maxLength: 60, nullable: false),
                    SafetyProblem_Problem = table.Column<string>(maxLength: 20, nullable: true),
                    SafetyProblem_Answer = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApiScopeNode",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiScopeNode", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CmsComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CmsComponents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    DisplayName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Describe = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Describe = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteSettings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Group = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 20, nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    PersonSignature = table.Column<string>(nullable: true),
                    HeadSculpture = table.Column<string>(nullable: true),
                    RealName = table.Column<string>(nullable: true),
                    IDNumber = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Sex = table.Column<bool>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApiScope",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    ApiManageScopeId = table.Column<int>(nullable: true),
                    ApiQueryScopeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiScope", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApiScope_ApiScopeNode_ApiManageScopeId",
                        column: x => x.ApiManageScopeId,
                        principalTable: "ApiScopeNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApiScope_ApiScopeNode_ApiQueryScopeId",
                        column: x => x.ApiQueryScopeId,
                        principalTable: "ApiScopeNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContentPagePermissionCollection",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsEnableQueryPermission = table.Column<bool>(nullable: false),
                    ContentPageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentPagePermissionCollection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentPagePermissionCollection_Pages_ContentPageId",
                        column: x => x.ContentPageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PageComponentBase",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Sign = table.Column<string>(nullable: true),
                    ParentSign = table.Column<string>(nullable: true),
                    CmsComponentId = table.Column<int>(nullable: true),
                    PageComponentBaseSetting_SortIndex = table.Column<int>(nullable: true),
                    PageComponentBaseSetting_Width = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Height = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Padding = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Margin = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_BackgroundColor = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_BackgroundImage = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_ClassName = table.Column<string>(nullable: true),
                    PageId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    MenuName = table.Column<string>(nullable: true),
                    PageLeafSetting_PageName = table.Column<string>(nullable: true),
                    PageLeafSetting_PageSize = table.Column<int>(nullable: true),
                    PageLeafSetting_Top = table.Column<int>(nullable: true),
                    PageLeafSetting_SearchKey = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageComponentBase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageComponentBase_CmsComponents_CmsComponentId",
                        column: x => x.CmsComponentId,
                        principalTable: "CmsComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PageComponentBase_Pages_PageId",
                        column: x => x.PageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PageDatas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    PageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageDatas_Pages_PageId",
                        column: x => x.PageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiScopePermission",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApiScopeId = table.Column<int>(nullable: false),
                    PermissionId = table.Column<int>(nullable: false),
                    ApiScopeNodeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiScopePermission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApiScopePermission_ApiScopeNode_ApiScopeNodeId",
                        column: x => x.ApiScopeNodeId,
                        principalTable: "ApiScopeNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApiScopePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(nullable: false),
                    PermissionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentPagePermission",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionId = table.Column<int>(nullable: false),
                    ContentPagePermissionCollectionId = table.Column<int>(nullable: true),
                    ContentPagePermissionCollectionId1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentPagePermission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId",
                        column: x => x.ContentPagePermissionCollectionId,
                        principalTable: "ContentPagePermissionCollection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId1",
                        column: x => x.ContentPagePermissionCollectionId1,
                        principalTable: "ContentPagePermissionCollection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContentPagePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PageComponentSetting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    PageComponentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageComponentSetting", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageComponentSetting_PageComponentBase_PageComponentId",
                        column: x => x.PageComponentId,
                        principalTable: "PageComponentBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComponentDatas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sign = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    PageDataId = table.Column<int>(nullable: true),
                    PageId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComponentDatas_PageDatas_PageDataId",
                        column: x => x.PageDataId,
                        principalTable: "PageDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ComponentDatas_Pages_PageId",
                        column: x => x.PageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    DisplayName = table.Column<string>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    CompositeMenuId = table.Column<int>(nullable: true),
                    RootMenuId = table.Column<int>(nullable: true),
                    PageDataId = table.Column<int>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Menus_Menus_CompositeMenuId",
                        column: x => x.CompositeMenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Menus_PageDatas_PageDataId",
                        column: x => x.PageDataId,
                        principalTable: "PageDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Menus_Menus_RootMenuId",
                        column: x => x.RootMenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SingleSettingData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    SortIndex = table.Column<int>(nullable: false),
                    Field1 = table.Column<string>(nullable: true),
                    Field2 = table.Column<string>(nullable: true),
                    Field3 = table.Column<string>(nullable: true),
                    Field4 = table.Column<string>(nullable: true),
                    Field5 = table.Column<string>(nullable: true),
                    PageComponentSettingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SingleSettingData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SingleSettingData_PageComponentSetting_PageComponentSettingId",
                        column: x => x.PageComponentSettingId,
                        principalTable: "PageComponentSetting",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SingleComponentData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    SortIndex = table.Column<int>(nullable: false),
                    Field1 = table.Column<string>(nullable: true),
                    Field2 = table.Column<string>(nullable: true),
                    Field3 = table.Column<string>(nullable: true),
                    Field4 = table.Column<string>(nullable: true),
                    Field5 = table.Column<string>(nullable: true),
                    ComponentDataId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SingleComponentData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SingleComponentData_ComponentDatas_ComponentDataId",
                        column: x => x.ComponentDataId,
                        principalTable: "ComponentDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[] { 1, null, "CompositeMenu", "主菜单", "", "Main", null, null });

            migrationBuilder.InsertData(
                table: "Pages",
                columns: new[] { "Id", "Description", "Discriminator", "DisplayName", "Name" },
                values: new object[] { 1, "这是一个首页", "StaticPage", "首页", "Home" });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[] { 2, 1, "CompositeMenu", "首页", "oi-home", "Home", null, 1 });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[] { 3, 1, "CompositeMenu", "游戏", "oi-dial", "Game", null, 1 });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[] { 4, 1, "CompositeMenu", "技术文档", "oi-document", "Document", null, 1 });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[,]
                {
                    { 101, 3, "LeafMenu", "主机游戏", null, "PCGame", null, 1 },
                    { 102, 3, "LeafMenu", "手机游戏", null, "PhoneGame", null, 1 },
                    { 103, 4, "LeafMenu", "站点技术", null, "Web", null, 1 },
                    { 104, 4, "LeafMenu", "桌面开发", null, "Desktop", null, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_UserName",
                table: "Account",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApiScope_ApiManageScopeId",
                table: "ApiScope",
                column: "ApiManageScopeId");

            migrationBuilder.CreateIndex(
                name: "IX_ApiScope_ApiQueryScopeId",
                table: "ApiScope",
                column: "ApiQueryScopeId");

            migrationBuilder.CreateIndex(
                name: "IX_ApiScopePermission_ApiScopeNodeId",
                table: "ApiScopePermission",
                column: "ApiScopeNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_ApiScopePermission_PermissionId",
                table: "ApiScopePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentDatas_Sign",
                table: "ComponentDatas",
                column: "Sign");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentDatas_PageDataId",
                table: "ComponentDatas",
                column: "PageDataId");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentDatas_PageId",
                table: "ComponentDatas",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentPagePermission_ContentPagePermissionCollectionId",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentPagePermission_ContentPagePermissionCollectionId1",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId1");

            migrationBuilder.CreateIndex(
                name: "IX_ContentPagePermission_PermissionId",
                table: "ContentPagePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentPagePermissionCollection_ContentPageId",
                table: "ContentPagePermissionCollection",
                column: "ContentPageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_CompositeMenuId",
                table: "Menus",
                column: "CompositeMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_Name",
                table: "Menus",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_PageDataId",
                table: "Menus",
                column: "PageDataId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_RootMenuId",
                table: "Menus",
                column: "RootMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_CmsComponentId",
                table: "PageComponentBase",
                column: "CmsComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_PageId",
                table: "PageComponentBase",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_Sign",
                table: "PageComponentBase",
                column: "Sign");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentSetting_PageComponentId",
                table: "PageComponentSetting",
                column: "PageComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_PageDatas_Name",
                table: "PageDatas",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_PageDatas_PageId",
                table: "PageDatas",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_Pages_Name",
                table: "Pages",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permission_Name",
                table: "Permission",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Role_Name",
                table: "Role",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleId",
                table: "RolePermission",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleComponentData_ComponentDataId",
                table: "SingleComponentData",
                column: "ComponentDataId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleSettingData_PageComponentSettingId",
                table: "SingleSettingData",
                column: "PageComponentSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_User_AccountId",
                table: "User",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                table: "UserRole",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApiScope");

            migrationBuilder.DropTable(
                name: "ApiScopePermission");

            migrationBuilder.DropTable(
                name: "ContentPagePermission");

            migrationBuilder.DropTable(
                name: "Logics");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "RolePermission");

            migrationBuilder.DropTable(
                name: "SingleComponentData");

            migrationBuilder.DropTable(
                name: "SingleSettingData");

            migrationBuilder.DropTable(
                name: "SiteSettings");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "ApiScopeNode");

            migrationBuilder.DropTable(
                name: "ContentPagePermissionCollection");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "ComponentDatas");

            migrationBuilder.DropTable(
                name: "PageComponentSetting");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "PageDatas");

            migrationBuilder.DropTable(
                name: "PageComponentBase");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "CmsComponents");

            migrationBuilder.DropTable(
                name: "Pages");
        }
    }
}
