using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Dtos;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfiles : Profile
    { // I Dont need to tell anyone about this file btww
        // this file will contain all the mapper that I want to return as a result from the api

        public AutoMapperProfiles()
        {
            CreateMap<User, UserToListDto>();
            CreateMap<UserToListDto, User>(); // for the put query

            CreateMap<Chat, PhotoForReturnDto>(); // for the put query
            CreateMap<PhotoForCreationDto, Chat>(); // for the put query


            CreateMap<MainPhoto, PhotoForReturnDto>(); // for the put query
            CreateMap<PhotoForCreationDto, MainPhoto>(); // for the put query


            //  var photo = mapper.Map<MainPhoto>(photoForCreationDto);
        }
    }
}