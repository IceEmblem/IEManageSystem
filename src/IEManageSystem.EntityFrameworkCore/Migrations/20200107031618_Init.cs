using System;
using Microsoft.EntityFrameworkCore.Metadata;
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CmsComponents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                name: "PageComponentBase",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Sign = table.Column<string>(nullable: true),
                    ParentSign = table.Column<string>(nullable: true),
                    CmsComponentId = table.Column<int>(nullable: true),
                    PageComponentBaseSetting_SortIndex = table.Column<int>(nullable: false),
                    PageComponentBaseSetting_Col = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Height = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Padding = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_Margin = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_BackgroundColor = table.Column<string>(nullable: true),
                    PageComponentBaseSetting_ClassName = table.Column<string>(nullable: true),
                    PageId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    TargetPageId = table.Column<int>(nullable: true)
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
                    table.ForeignKey(
                        name: "FK_PageComponentBase_Pages_TargetPageId",
                        column: x => x.TargetPageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PageData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    PageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageData_Pages_PageId",
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                name: "PageComponentSetting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Field1 = table.Column<string>(nullable: true),
                    Field2 = table.Column<string>(nullable: true),
                    Field3 = table.Column<string>(nullable: true),
                    Field4 = table.Column<string>(nullable: true),
                    Field5 = table.Column<string>(nullable: true),
                    PageComponentBaseId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageComponentSetting", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageComponentSetting_PageComponentBase_PageComponentBaseId",
                        column: x => x.PageComponentBaseId,
                        principalTable: "PageComponentBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContentComponentData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Sign = table.Column<string>(nullable: true),
                    Field1 = table.Column<string>(nullable: true),
                    Field2 = table.Column<string>(nullable: true),
                    Field3 = table.Column<string>(nullable: true),
                    Field4 = table.Column<string>(nullable: true),
                    Field5 = table.Column<string>(nullable: true),
                    PageDataId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentComponentData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentComponentData_PageData_PageDataId",
                        column: x => x.PageDataId,
                        principalTable: "PageData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    DisplayName = table.Column<string>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    CompositeMenuId = table.Column<int>(nullable: true),
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
                        name: "FK_Menus_PageData_PageDataId",
                        column: x => x.PageDataId,
                        principalTable: "PageData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId" },
                values: new object[,]
                {
                    { 1, null, "CompositeMenu", "首页", "oi-home", "Home", null },
                    { 2, null, "CompositeMenu", "游戏", "oi-dial", "Game", null },
                    { 3, null, "CompositeMenu", "技术文档", "oi-document", "Document", null }
                });

            migrationBuilder.InsertData(
                table: "Pages",
                columns: new[] { "Id", "Description", "Discriminator", "DisplayName", "Name" },
                values: new object[] { 1, "这是一个首页", "StaticPage", "首页", "Home" });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId" },
                values: new object[,]
                {
                    { 101, 2, "LeafMenu", "主机游戏", null, "PCGame", null },
                    { 102, 2, "LeafMenu", "手机游戏", null, "PhoneGame", null },
                    { 103, 3, "LeafMenu", "站点技术", null, "Web", null },
                    { 104, 3, "LeafMenu", "桌面开发", null, "Desktop", null }
                });

            migrationBuilder.InsertData(
                table: "PageData",
                columns: new[] { "Id", "Name", "PageId", "Title" },
                values: new object[] { 1, "Index", 1, "首页" });

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
                name: "IX_ContentComponentData_PageDataId",
                table: "ContentComponentData",
                column: "PageDataId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_CompositeMenuId",
                table: "Menus",
                column: "CompositeMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_PageDataId",
                table: "Menus",
                column: "PageDataId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_CmsComponentId",
                table: "PageComponentBase",
                column: "CmsComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_PageId",
                table: "PageComponentBase",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_TargetPageId",
                table: "PageComponentBase",
                column: "TargetPageId");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentSetting_PageComponentBaseId",
                table: "PageComponentSetting",
                column: "PageComponentBaseId");

            migrationBuilder.CreateIndex(
                name: "IX_PageData_PageId",
                table: "PageData",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleId",
                table: "RolePermission",
                column: "RoleId");

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
                name: "ContentComponentData");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "PageComponentSetting");

            migrationBuilder.DropTable(
                name: "RolePermission");

            migrationBuilder.DropTable(
                name: "SiteSettings");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "ApiScopeNode");

            migrationBuilder.DropTable(
                name: "PageData");

            migrationBuilder.DropTable(
                name: "PageComponentBase");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "CmsComponents");

            migrationBuilder.DropTable(
                name: "Pages");

            migrationBuilder.DropTable(
                name: "Account");
        }
    }
}
