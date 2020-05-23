using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class Add_SingleSettingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageComponentSetting_PageComponentBase_PageComponentBaseId",
                table: "PageComponentSetting");

            migrationBuilder.DropTable(
                name: "SingleData");

            migrationBuilder.DropIndex(
                name: "IX_PageComponentSetting_PageComponentBaseId",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "Field1",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "Field2",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "Field3",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "Field4",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "Field5",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "PageComponentBaseId",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "PageComponentBaseSetting_Col",
                table: "PageComponentBase");

            migrationBuilder.AddColumn<int>(
                name: "PageComponentId",
                table: "PageComponentSetting",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PageComponentBaseSetting_BackgroundImage",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageComponentBaseSetting_Width",
                table: "PageComponentBase",
                nullable: true);

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
                    ContentComponentDataId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SingleComponentData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SingleComponentData_ContentComponentData_ContentComponentDataId",
                        column: x => x.ContentComponentDataId,
                        principalTable: "ContentComponentData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentSetting_PageComponentId",
                table: "PageComponentSetting",
                column: "PageComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleComponentData_ContentComponentDataId",
                table: "SingleComponentData",
                column: "ContentComponentDataId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleSettingData_PageComponentSettingId",
                table: "SingleSettingData",
                column: "PageComponentSettingId");

            migrationBuilder.AddForeignKey(
                name: "FK_PageComponentSetting_PageComponentBase_PageComponentId",
                table: "PageComponentSetting",
                column: "PageComponentId",
                principalTable: "PageComponentBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageComponentSetting_PageComponentBase_PageComponentId",
                table: "PageComponentSetting");

            migrationBuilder.DropTable(
                name: "SingleComponentData");

            migrationBuilder.DropTable(
                name: "SingleSettingData");

            migrationBuilder.DropIndex(
                name: "IX_PageComponentSetting_PageComponentId",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "PageComponentId",
                table: "PageComponentSetting");

            migrationBuilder.DropColumn(
                name: "PageComponentBaseSetting_BackgroundImage",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageComponentBaseSetting_Width",
                table: "PageComponentBase");

            migrationBuilder.AddColumn<string>(
                name: "Field1",
                table: "PageComponentSetting",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field2",
                table: "PageComponentSetting",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field3",
                table: "PageComponentSetting",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field4",
                table: "PageComponentSetting",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field5",
                table: "PageComponentSetting",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PageComponentBaseId",
                table: "PageComponentSetting",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageComponentBaseSetting_Col",
                table: "PageComponentBase",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SingleData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContentComponentDataId = table.Column<int>(type: "int", nullable: true),
                    Field1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Field2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Field3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Field4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Field5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SortIndex = table.Column<int>(type: "int", nullable: false)
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
                name: "IX_PageComponentSetting_PageComponentBaseId",
                table: "PageComponentSetting",
                column: "PageComponentBaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleData_ContentComponentDataId",
                table: "SingleData",
                column: "ContentComponentDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_PageComponentSetting_PageComponentBase_PageComponentBaseId",
                table: "PageComponentSetting",
                column: "PageComponentBaseId",
                principalTable: "PageComponentBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
