using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Add_SingleData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Field1",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field2",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field3",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field4",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field5",
                table: "ContentComponentData");

            migrationBuilder.CreateTable(
                name: "SingleData",
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
                    ContentComponentDataId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SingleData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SingleData_ContentComponentData_ContentComponentDataId",
                        column: x => x.ContentComponentDataId,
                        principalTable: "ContentComponentData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SingleData_ContentComponentDataId",
                table: "SingleData",
                column: "ContentComponentDataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SingleData");

            migrationBuilder.AddColumn<string>(
                name: "Field1",
                table: "ContentComponentData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field2",
                table: "ContentComponentData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field3",
                table: "ContentComponentData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field4",
                table: "ContentComponentData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field5",
                table: "ContentComponentData",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
