
using System.Data;
using AutoMapper;
using backend.Dtos;
using backend.Models;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.Data
{
    public class MessageService : IMessageService
    { // I want to SendMessage 

        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private Cloudinary cloudinary;

        public MessageService(DataContext context, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this.context = context;
            this.mapper = mapper;

             Account account = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );

            cloudinary = new Cloudinary(account);
        }


        public async Task<Message> SaveMessage(MessageDto message){ 

            if(message.ContentType == ContentType.Text){
                message.Date =  DateTime.Now ;
                Message mappedMessage = mapper.Map<Message>(message);
                await context.Messages.AddAsync(mappedMessage) ; 
                await context.SaveChangesAsync() ;
                return mappedMessage ;
            }

            else if(message.ContentType == ContentType.Image || message.ContentType == ContentType.Video 
                ||  message.ContentType == ContentType.Sound){
                
                var file = message?.File;

                var uploadResultImage = new ImageUploadResult();
                var uploadResultVideo = new VideoUploadResult();

                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        
                        if(message.ContentType == ContentType.Image){
                            var uploadParam = new ImageUploadParams()
                            {
                                File = new FileDescription(file.Name, stream),
                            };

                            uploadResultImage = cloudinary.Upload(uploadParam);
                        }

                        else if(message.ContentType == ContentType.Video || message.ContentType == ContentType.Sound){ 
                            var uploadParam = new VideoUploadParams
                            {
                                File = new FileDescription(file.Name, stream),
                            };

                            uploadResultVideo = cloudinary.UploadLarge(uploadParam);
                        }
                    }
                }
                
                message.Date =  DateTime.Now ;
                message.Content =message.ContentType == ContentType.Image ?
                uploadResultImage?.Uri?.ToString() : uploadResultVideo?.Uri?.ToString();
                Message mappedMessage = mapper.Map<Message>(message);
                await context.Messages.AddAsync(mappedMessage) ; 
                await context.SaveChangesAsync() ;
                return mappedMessage ;
            }



            return null ;
           
        }


        public async Task<Chaty> SendMessage(ChatyDto chat){ // this will map the sender with the receiver 

            Message sentMessage = await SaveMessage(chat?.Message) ; 

            Chaty chaty = new Chaty(){
                SenderId = chat.SenderId,
                ReceiverId = chat.ReceiverId,
                MessageId = sentMessage.Id,
            };

            await context.Chatys.AddAsync(chaty) ;
            await context.SaveChangesAsync() ;
            return chaty ;
        }




         public async Task<List<MessageWithSenderViewModel>> getAllMessages(GetMessagesDto infos ){ // this will map the sender with the receiver 

            List<int> messagesSenderToReceiver = await context.Chatys
                .Where(c =>   c.SenderId == infos.SenderId 
                && c.ReceiverId == infos.ReceiverId)
                .Select(c => c.MessageId)
                .ToListAsync() ;

            List<int> messagesReceiverToSender = await context.Chatys
                .Where(c =>   c.SenderId == infos.ReceiverId 
                && c.ReceiverId == infos.SenderId)
                .Select(c => c.MessageId)
                .ToListAsync() ;


            List<MessageWithSenderViewModel> allMessagesSenderToReceiver = await context.Messages
                .Where(message => messagesSenderToReceiver.Contains(message.Id))
                .Select(message => new MessageWithSenderViewModel
                {
                    Id = message.Id,
                    Content = message.Content,
                    Date = message.Date,
                    ContentType = message.ContentType, 
                    MessageSenderId = infos.SenderId 
                })
                .ToListAsync();


            List<MessageWithSenderViewModel> allMessagesReceiverToSender = await context.Messages
                .Where(message => messagesReceiverToSender.Contains(message.Id))
                .Select(message => new MessageWithSenderViewModel
                {
                    Id = message.Id,
                    Content = message.Content,
                    Date = message.Date,
                    ContentType = message.ContentType, 
                    MessageSenderId = infos.ReceiverId 
                })
                .ToListAsync();

            List<MessageWithSenderViewModel> allMessages = 
                allMessagesReceiverToSender.Concat(allMessagesSenderToReceiver)
                                           .OrderBy(message => message.Date)
                                           .ToList() ;         

            return allMessages ;

        }

        public async Task deleteMessages(List<MessageWithSenderViewModel> messages){
            var messageIds = messages.Select(vm => vm.Id).ToList();

            var messagesToDelete = await context.Messages
                .Where(message => messageIds.Contains(message.Id))
                .ToListAsync();

            context.Messages.RemoveRange(messagesToDelete);
            await context.SaveChangesAsync();
        }

        
        



     
    }
}