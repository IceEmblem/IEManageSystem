using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Update_MenuBase_Add_RootMenuId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RootMenuId",
                table: "Menus",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_RootMenuId",
                table: "Menus",
                column: "RootMenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_Menus_RootMenuId",
                table: "Menus",
                column: "RootMenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_Menus_RootMenuId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_RootMenuId",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "RootMenuId",
                table: "Menus");
        }
    }
}
