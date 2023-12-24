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

    public class MessagesController : ControllerBase
    {

        private readonly IDataRepository repo;
        private readonly IMapper mapper;
        private readonly IMessageService messageService ;
        public MessagesController(IDataRepository repo, IMapper mapper, IMessageService messageService)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.messageService = messageService;
        }

        // [Authorize] //searches for the "Authorize: Bearer" in the header of the request 
        [HttpPost]
        public async Task<ActionResult<ChatyDto>> SendTextMessage(ChatyDto chat)
        { 
            Chaty response = await messageService.SendMessage(chat) ;
            
            if(response == null){
                return StatusCode(201);
            }

            return Ok(response) ;
        }



        [HttpPost("Image")]
        public async Task<ActionResult<ChatyDto>> SendImageMessage([FromQuery] int SenderId
        , [FromQuery] int ReceiverId ,[FromQuery] string ContentType, IFormFile File)
        {
            MessageDto msg = new MessageDto(){
                ContentType = ContentType,
                File = File, 
            }; 
            ChatyDto chat = new ChatyDto(){
                SenderId = SenderId,
                ReceiverId = ReceiverId,
                Message = msg, 
            }; 

            Chaty response = await messageService.SendMessage(chat) ;
            
            if(response == null){
                return StatusCode(201);
            }

            return Ok(response) ;
        }



         [HttpPost("AllMessages")] 
        public async Task<ActionResult<List<MessageWithSenderViewModel>>> getMessage(GetMessagesDto infos)
        { // must make sure also that the id passed in the url is the same as the the one embedded in the token
            List<MessageWithSenderViewModel> response = await messageService.getAllMessages(infos) ;
            
            if(response == null){
                return StatusCode(201);
            }

            return Ok(response) ;
        }



        [HttpPost("DeleteMessages")] 
        public async Task<ActionResult> deleteMessages(List<MessageWithSenderViewModel> messages)
        { // must make sure also that the id passed in the url is the same as the the one embedded in the token
            await messageService.deleteMessages(messages) ;
            return Ok() ;
        }



        




    }
}