namespace backend.Dtos
{

 public class ChatyDto
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public MessageDto? Message { get; set; }
    }

}