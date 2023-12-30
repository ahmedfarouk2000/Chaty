using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Helpers;
using backend.Models; // Add the using statement to import the Extensions class


namespace backend.Controllers
{

    [Route("[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {

        private readonly IDataRepository repo;
        private readonly IMapper mapper;
        private readonly IMessageService messageService ;
        public UsersController(IDataRepository repo, IMapper mapper , IMessageService messageService)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.messageService = messageService;
        }

        [HttpGet] // NOT NEEDED TO BE AUTH
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        { // any authonticated user can get access to all the users just any token sent from the login is suffiecent 
            // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            // var userFromRepo = await repo.GetUser(currentUserId);
            // userParams.UserId = currentUserId;

            // if(string.IsNullOrEmpty(userParams.Gender)){
            // userParams.Gender = userFromRepo.Gender ? false : true;
            // }


            var users = await repo.GetUsers(userParams);

            // var usersWithLength = new IEnumerable<UserToListDto>() ;
            var usersWithLength = new List<UserToListDto>();


            foreach (var user in users)
            {

                GetMessagesDto messagesDto = new GetMessagesDto
                {
                    SenderId = userParams.UserId,
                    ReceiverId = user.Id
                };

                List<MessageWithSenderViewModel> allMessages = await messageService.getAllMessages(messagesDto);
                int chatLength =  allMessages.Count;

                usersWithLength.Add(new UserToListDto{
                    Id = user.Id,
                    Name = user.Name,
                    MainPhoto = user.MainPhoto,
                    DateOfCreation= user.DateOfCreation,
                    LastTimeActive = user.LastTimeActive,
                    Gender =  user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    ChatsLength = chatLength
                });      
            }

            //var usersToReturn = mapper.Map<IEnumerable<UserToListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersWithLength);
        }

        // [Authorize] //searches for the "Authorize: Bearer" in the header of the request 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        { // must make sure that the id in the url matched with the id passed in the token


            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var user = await repo.GetUser(id);
            var userToReturn = mapper.Map<UserToListDto>(user);

            return Ok(userToReturn);
        }
        // [Authorize] //searches for the "Authorize: Bearer" in the header of the request 
        [HttpPut("{userId}")]
        public async Task<ActionResult<UserToListDto>> UpdateUser(int userId, UserToListDto updatedUser)
        { // must make sure also that the id passed in the url is the same as the the one embedded in the token

            UserToListDto userAfterTheUpdate = await repo.updateUserData(userId, updatedUser);
            return Ok(userAfterTheUpdate);

        }

        [HttpPut("UpdateLastTimeActive/{userId}")]
        public async Task<ActionResult> updateUserLastTimeActive(int userId){
            User updateUser = await repo.updateUserLastTimeActive(userId) ;
            return Ok(updateUser);
        }




    }
}