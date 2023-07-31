using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Content { get; set; } // will contain the url
        public DateTime Date { get; set; } // not null  
        public string ImagePublicId { get; set; } // if text thus it will be null
    }
}