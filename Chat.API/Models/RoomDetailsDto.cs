using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class RoomDetailsDto : RoomDto
    {
        List<UserDto> bannedUsers = new List<UserDto>();
        bool isLoggedUserAuthor = false;

        public RoomDetailsDto(Room roomFromDb) : base(roomFromDb)
        {
            Id = roomFromDb.Id;
            Name= roomFromDb.Name;
        }
    }
}
