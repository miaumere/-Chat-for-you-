using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chat.API.Migrations
{
    /// <inheritdoc />
    public partial class AddColorAndPasswordToRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RoomPassword",
                table: "Rooms",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomPassword",
                table: "Rooms");
        }
    }
}
