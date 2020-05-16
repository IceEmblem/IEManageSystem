using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Update_CompositeMenu_SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DisplayName", "Icon", "Name" },
                values: new object[] { "主菜单", "", "Main" });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CompositeMenuId", "DisplayName", "Icon", "Name", "RootMenuId" },
                values: new object[] { 1, "首页", "oi-home", "Home", 1 });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CompositeMenuId", "DisplayName", "Icon", "Name", "RootMenuId" },
                values: new object[] { 1, "游戏", "oi-dial", "Game", 1 });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 3, 1 });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 102,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 3, 1 });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "CompositeMenuId", "Discriminator", "DisplayName", "Icon", "Name", "PageDataId", "RootMenuId" },
                values: new object[] { 4, 1, "CompositeMenu", "技术文档", "oi-document", "Document", null, 1 });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 103,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 4, 1 });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 104,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 4, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 103,
                column: "CompositeMenuId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 104,
                column: "CompositeMenuId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DisplayName", "Icon", "Name" },
                values: new object[] { "首页", "oi-home", "Home" });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CompositeMenuId", "DisplayName", "Icon", "Name", "RootMenuId" },
                values: new object[] { null, "游戏", "oi-dial", "Game", null });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CompositeMenuId", "DisplayName", "Icon", "Name", "RootMenuId" },
                values: new object[] { null, "技术文档", "oi-document", "Document", null });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 2, null });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 102,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 2, null });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 103,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 3, null });

            migrationBuilder.UpdateData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 104,
                columns: new[] { "CompositeMenuId", "RootMenuId" },
                values: new object[] { 3, null });
        }
    }
}
