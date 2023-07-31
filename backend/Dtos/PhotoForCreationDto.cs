using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class PhotoForCreationDto
    {
        public string? Content { get; set; } // will contain the url
        public IFormFile File { get; set; }
        public DateTime Date { get; set; } // not null  
        public string? ContentType { get; set; }
        public string? ImagePublicId { get; set; } // if text thus it will be null

        public PhotoForCreationDto()
        {
            Date = DateTime.Now;

        }


    }
}