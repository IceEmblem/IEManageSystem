using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class updateother : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData");

            migrationBuilder.DropForeignKey(
                name: "FK_Menus_PageData_PageDataId",
                table: "Menus");

            migrationBuilder.DropForeignKey(
                name: "FK_PageData_Pages_PageId",
                table: "PageData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PageData",
                table: "PageData");

            migrationBuilder.RenameTable(
                name: "PageData",
                newName: "PageDatas");

            migrationBuilder.RenameIndex(
                name: "IX_PageData_PageId",
                table: "PageDatas",
                newName: "IX_PageDatas_PageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PageDatas",
                table: "PageDatas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentComponentData_PageDatas_PageDataId",
                table: "ContentComponentData",
                column: "PageDataId",
                principalTable: "PageDatas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_PageDatas_PageDataId",
                table: "Menus",
                column: "PageDataId",
                principalTable: "PageDatas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
                name: "FK_ContentComponentData_PageDatas_PageDataId",
                table: "ContentComponentData");

            migrationBuilder.DropForeignKey(
                name: "FK_Menus_PageDatas_PageDataId",
                table: "Menus");

            migrationBuilder.DropForeignKey(
                name: "FK_PageDatas_Pages_PageId",
                table: "PageDatas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PageDatas",
                table: "PageDatas");

            migrationBuilder.RenameTable(
                name: "PageDatas",
                newName: "PageData");

            migrationBuilder.RenameIndex(
                name: "IX_PageDatas_PageId",
                table: "PageData",
                newName: "IX_PageData_PageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PageData",
                table: "PageData",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData",
                column: "PageDataId",
                principalTable: "PageData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_PageData_PageDataId",
                table: "Menus",
                column: "PageDataId",
                principalTable: "PageData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PageData_Pages_PageId",
                table: "PageData",
                column: "PageId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
