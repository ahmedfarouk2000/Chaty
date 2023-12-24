using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Data
{
    public interface IMessageService
    {
        Task<Message> SaveMessage(MessageDto message ); 
        Task<Chaty> SendMessage(ChatyDto chat) ;

        Task<List<MessageWithSenderViewModel>> getAllMessages(GetMessagesDto infos);

        Task deleteMessages(List<MessageWithSenderViewModel> messages) ;
        
    }
}