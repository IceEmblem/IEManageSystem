using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Add_PageLeafSetting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageComponentBase_Pages_TargetPageId",
                table: "PageComponentBase");

            migrationBuilder.DropForeignKey(
                name: "FK_PageDatas_Pages_PageId",
                table: "PageDatas");

            migrationBuilder.DropIndex(
                name: "IX_PageDatas_Name",
                table: "PageDatas");

            migrationBuilder.DropIndex(
                name: "IX_PageComponentBase_TargetPageId",
                table: "PageComponentBase");

            migrationBuilder.DeleteData(
                table: "PageDatas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "TargetPageId",
                table: "PageComponentBase");

            migrationBuilder.AlterColumn<int>(
                name: "PageId",
                table: "PageDatas",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageLeafSetting_PageName",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PageLeafSetting_PageSize",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageLeafSetting_SearchKey",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PageLeafSetting_Top",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PageDatas_Name",
                table: "PageDatas",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_PageDatas_Pages_PageId",
                table: "PageDatas",
                column: "PageId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageDatas_Pages_PageId",
                table: "PageDatas");

            migrationBuilder.DropIndex(
                name: "IX_PageDatas_Name",
                table: "PageDatas");

            migrationBuilder.DropColumn(
                name: "PageLeafSetting_PageName",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageLeafSetting_PageSize",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageLeafSetting_SearchKey",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageLeafSetting_Top",
                table: "PageComponentBase");

            migrationBuilder.AlterColumn<int>(
                name: "PageId",
                table: "PageDatas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "TargetPageId",
                table: "PageComponentBase",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "PageDatas",
                columns: new[] { "Id", "Name", "PageId", "Title" },
                values: new object[] { 1, "Index", 1, "首页" });

            migrationBuilder.CreateIndex(
                name: "IX_PageDatas_Name",
                table: "PageDatas",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_TargetPageId",
                table: "PageComponentBase",
                column: "TargetPageId");

            migrationBuilder.AddForeignKey(
                name: "FK_PageComponentBase_Pages_TargetPageId",
                table: "PageComponentBase",
                column: "TargetPageId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PageDatas_Pages_PageId",
                table: "PageDatas",
                column: "PageId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
