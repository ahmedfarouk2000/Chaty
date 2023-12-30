using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Dtos
{
    public class UserToListDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        // public ICollection<Chat> Chats { get; set; }
        public MainPhoto? MainPhoto { get; set; } // used to display the image of the user 

        public DateTime DateOfCreation { get; set; } // not null  
        public DateTime LastTimeActive { get; set; } // not null  
        public bool Gender { get; set; } // true means male , false is female

        public DateTime DateOfBirth { get; set; } // not null
        public int? ChatsLength {get; set;}  // very very optional 





    }
}