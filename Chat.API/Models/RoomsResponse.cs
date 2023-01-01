using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class RoomsResponse
    {
        public List<RoomDto> RoomsCreatedByMe { get; set; } = new List<RoomDto>();
        public List<RoomDto> RoomsCreatedByOthers { get; set; } = new List<RoomDto>();

    }
}
