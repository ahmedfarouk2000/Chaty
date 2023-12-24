

namespace backend.Models
{
    public class Chaty
    {
        public int Id { get; set; }
        public User? Sender { get; set; } // the one who sends the message 
        public int SenderId { get; set; }

        public User? Receiver { get; set; } // the one who receive it
        public int ReceiverId { get; set; }

        public Message? Message { get; set; } // the message between them
        public int MessageId { get; set; }


    }
}