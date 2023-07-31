using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dtos
{
    public class UserForRegitserDto
    {
        [Required]
        [StringLength(int.MaxValue, MinimumLength = 5, ErrorMessage = "Username length must be 5 or more")]
        public string Username { get; set; }

        [Required]
        [StringLength(int.MaxValue, MinimumLength = 4, ErrorMessage = "Password length must be 4 or more")]
        public string Password { get; set; }



        // public DateTime DateOfCreation { get; set; }

        // public DateTime LastTimeActive { get; set; }

        [Required]
        public bool Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }


        // public UserForRegitserDto()
        // {
        //     DateOfCreation = DateTime.Now;
        //     LastTimeActive = DateTime.Now;

        // }

    }
}