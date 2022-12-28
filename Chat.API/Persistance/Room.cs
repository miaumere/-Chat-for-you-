﻿using Chat.API.Models;

namespace Chat.API.Persistance
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User CreatedBy { get; set; }
    }
}
