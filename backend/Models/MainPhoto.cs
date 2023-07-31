using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class MainPhoto
    {

        public int Id { get; set; }

        public string? Content { get; set; } // the url
        public DateTime Date { get; set; } // not null  
        public string? ImagePublicId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
        public int UserId { get; set; }

    }
}