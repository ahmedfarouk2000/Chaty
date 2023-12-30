using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;


namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            this.repo = repo;
            this.config = config;
            this.mapper = mapper;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegitserDto userForRegitserDto)
        {
            userForRegitserDto.Username = userForRegitserDto.Username.ToLower();

            if (await repo.UserExists(userForRegitserDto.Username))
            {
                return Ok("user name is already exist");
            }
            var userToCreate = new User
            {
                Name = userForRegitserDto.Username,
                DateOfCreation = DateTime.Now,
                LastTimeActive = DateTime.Now,
                Gender = userForRegitserDto.Gender,
                DateOfBirth = userForRegitserDto.DateOfBirth,
            };
            var createdUser = await repo.Register(userToCreate, userForRegitserDto.Password);
            return StatusCode(201);
            // return Ok({});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {

            var userFromRepo = await repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier , userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name , userFromRepo.Name),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            // var keyBytes = new byte[64]; // 64 bytes = 512 bits
            // using (var rng = RandomNumberGenerator.Create())
            // {
            //     rng.GetBytes(keyBytes);
            // }

            // var key = new SymmetricSecurityKey(keyBytes);


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                id= userFromRepo.Id,
                token = tokenHandler.WriteToken(token),
                name= userFromRepo.Name,
                dateOfCreation = userFromRepo.DateOfCreation,
                gender = userFromRepo.Gender,
                lastTimeActive = userFromRepo.DateOfCreation,
                dateOfBirth = userFromRepo.DateOfBirth,
                mainPhoto = userFromRepo.MainPhoto
            });

            // var userToReturn = mapper.Map<UserToListDto>(userFromRepo);

            // return Ok(userToReturn);

            // will send him the id so he can take it and 


        }


    }
}