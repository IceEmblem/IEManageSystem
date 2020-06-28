using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Update_PageData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "PageDatas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "PageDatas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "PageDatas",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "PageDatas");

            migrationBuilder.DropColumn(
                name: "Images",
                table: "PageDatas");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "PageDatas");
        }
    }
}
