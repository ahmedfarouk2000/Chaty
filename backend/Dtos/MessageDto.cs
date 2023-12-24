namespace backend.Dtos
{

 public class MessageDto
    {
        public string? Content {get ; set;}
        public DateTime? Date { get; set; }  // date it was sent in
        public string? ContentType { get; set; } // text or image or video
        public IFormFile? File { get; set; } // this for case (photo or video)

        // public MessageDto()
        // {
        //     File = new FormFile(null, 0, 0, null, null);
        // }

    }

}