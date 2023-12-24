

namespace backend.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string? Content {get ; set;}
        public DateTime? Date { get; set; }  // date it was sent in
        public string? ContentType { get; set; } // text or image or video
    }
}