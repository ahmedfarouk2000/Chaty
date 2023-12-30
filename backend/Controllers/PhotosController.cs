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

namespace backend.Controllers
{
    // [Authorize] //searches for the "Authorize: Bearer" in the header of the request 
    [Route("[controller]")]
    [ApiController]


    public class PhotosController : ControllerBase
    {
        private readonly IDataRepository repo;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private Cloudinary cloudinary;
        public PhotosController(IDataRepository repo, IMapper mapper
        , IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );

            cloudinary = new Cloudinary(account);
        }

        // [HttpPost("{userId}")]
        // public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        // {
        //     // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     //     return Unauthorized();       

        //     var user = await repo.GetUser(userId);

        //     var file = photoForCreationDto.File;

        //     var uploadResult = new ImageUploadResult();

        //     if (file.Length > 0)
        //     {

        //         using (var stream = file.OpenReadStream())
        //         {

        //             var uploadParam = new ImageUploadParams()
        //             {
        //                 File = new FileDescription(file.Name, stream),
        //                 // Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")

        //             };

        //             uploadResult = cloudinary.Upload(uploadParam);


        //         }
        //     }

        //     photoForCreationDto.Content = uploadResult.Uri.ToString();
        //     photoForCreationDto.ContentType = "photo";
        //     photoForCreationDto.ImagePublicId = uploadResult.PublicId;

        //     var photo = mapper.Map<Chat>(photoForCreationDto);

        //     // user.Chats.Add(photo);

        //     if (await repo.SaveAll())
        //     {
        //         var photoToReturn = mapper.Map<PhotoForReturnDto>(photo);
        //         return Ok();

        //     }

        //     return BadRequest("Could not adddddddddd photo bro");


        // }


        // [HttpPost("Videos/{userId}")]
        // public async Task<IActionResult> AddVideoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        // {
        //     // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     //     return Unauthorized();

        //     var user = await repo.GetUser(userId);

        //     var file = photoForCreationDto.File;

        //     var uploadResult = new VideoUploadResult();

        //     if (file.Length > 0)
        //     {

        //         using (var stream = file.OpenReadStream())
        //         {

        //             var uploadParam = new VideoUploadParams
        //             {
        //                 File = new FileDescription(file.Name, stream),
        //                 // PublicId = "video_upload_example"
        //             };

        //             uploadResult = cloudinary.UploadLarge(uploadParam);
        //         }
        //     }

        //     photoForCreationDto.Content = uploadResult.Uri.ToString();
        //     photoForCreationDto.ContentType = "video";
        //     photoForCreationDto.ImagePublicId = uploadResult.PublicId;

        //     var photo = mapper.Map<Chat>(photoForCreationDto);

        //     // user.Chats.Add(photo);

        //     if (await repo.SaveAll())
        //     {
        //         var photoToReturn = mapper.Map<PhotoForReturnDto>(photo);
        //         return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);

        //     }

        //     return BadRequest("Could not adddddddddd photo bro");


        // }



        // [HttpGet("{id}", Name = "GetPhoto")]
        // public async Task<IActionResult> GetPhoto(int id)
        // {

        //     var photoFromRepo = await repo.GetPhoto(id);

        //     var photo = mapper.Map<PhotoForReturnDto>(photoFromRepo);

        //     return Ok(photo);

        // }






        [HttpPost("MainPhoto/{userId}")]
        public async Task<IActionResult> AddMainPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        { // needed
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var user = await repo.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {

                using (var stream = file.OpenReadStream())
                {

                    var uploadParam = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")

                    };

                    uploadResult = cloudinary.Upload(uploadParam);
                }
            }

            photoForCreationDto.Content = uploadResult.Uri.ToString();
            // photoForCreationDto.ContentType = "photo";
            photoForCreationDto.ImagePublicId = uploadResult.PublicId;

            var photo = mapper.Map<MainPhoto>(photoForCreationDto);


            await repo.DeleteMainPhoto(userId); // must first remove the main image and replace it by another one
            user.MainPhoto = photo;

            if (await repo.SaveAll())
            {
                var photoToReturn = mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetMainPhoto", new { userId = userId, id = photo.Id }, photoToReturn);

            }

            return BadRequest("Could not adddddddddd photo bro");


        }



        [HttpGet("{id}", Name = "GetMainPhoto")]
        public async Task<IActionResult> GetMainPhoto(int id)
        { // needed

            var photoFromRepo = await repo.GetMainPhoto(id);

            var photo = mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);

        }


        [HttpGet("MainPhoto/Remove/{userId}")]
        public async Task<IActionResult> RemoveMainPhotoForUser(int userId){ // needed
            var removedPhoto = await repo.RemoveMainPhoto(userId) ;
            return Ok(removedPhoto) ;
        }





    }
}