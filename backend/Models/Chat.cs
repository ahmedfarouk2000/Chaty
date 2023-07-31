using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Chat
    {
        public int Id { get; set; }


        public string Content { get; set; } // replace by the text  not null
        public DateTime Date { get; set; } // not null  
        public string ContentType { get; set; } // either image or text till now (could be null)
        public string? ImagePublicId { get; set; } // if text thus it will be null



        [JsonIgnore]
        public User? User { get; set; }
        public int UserId { get; set; }
    }
}