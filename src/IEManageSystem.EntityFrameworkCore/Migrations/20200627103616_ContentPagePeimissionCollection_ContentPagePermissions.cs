using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class ContentPagePeimissionCollection_ContentPagePermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId",
                table: "ContentPagePermission");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId1",
                table: "ContentPagePermission");

            migrationBuilder.DropIndex(
                name: "IX_ContentPagePermission_ContentPagePermissionCollectionId1",
                table: "ContentPagePermission");

            migrationBuilder.DropColumn(
                name: "ContentPagePermissionCollectionId1",
                table: "ContentPagePermission");

            migrationBuilder.AlterColumn<int>(
                name: "ContentPagePermissionCollectionId",
                table: "ContentPagePermission",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsManage",
                table: "ContentPagePermission",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId",
                principalTable: "ContentPagePermissionCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId",
                table: "ContentPagePermission");

            migrationBuilder.DropColumn(
                name: "IsManage",
                table: "ContentPagePermission");

            migrationBuilder.AlterColumn<int>(
                name: "ContentPagePermissionCollectionId",
                table: "ContentPagePermission",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ContentPagePermissionCollectionId1",
                table: "ContentPagePermission",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ContentPagePermission_ContentPagePermissionCollectionId1",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId",
                principalTable: "ContentPagePermissionCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentPagePermission_ContentPagePermissionCollection_ContentPagePermissionCollectionId1",
                table: "ContentPagePermission",
                column: "ContentPagePermissionCollectionId1",
                principalTable: "ContentPagePermissionCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
