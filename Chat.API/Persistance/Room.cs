﻿using Chat.API.Enums;
using Chat.API.Models;

namespace Chat.API.Persistance
{
    public class Room
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public Colors Color { get; set; } = Colors.Transparent;
        public required User CreatedBy { get; set; }
        public string? RoomPassword { get; set; }
    }
}
