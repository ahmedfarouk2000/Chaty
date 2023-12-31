using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AuthRepository : IAuthRepository
    {

        private readonly DataContext context;
        
        public AuthRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await context.Users.Include(p => p.MainPhoto).FirstOrDefaultAsync(x => x.Name == username);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }

        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;


                    CreatePasswordHash(password, 
                    
                    out passwordSalt, out passwordHash);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwaordSalt, out byte[] passwordHash)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwaordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            bool userExists = await context.Users.AnyAsync(x => x.Name == username);
            return userExists;
        }
    }
}