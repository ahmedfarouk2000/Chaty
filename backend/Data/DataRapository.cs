using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataRapository : IDataRepository
    {
        public readonly DataContext context;
        public DataRapository(DataContext context)
        {
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await context.Users.Include(p => p.Chats).Include(p => p.MainPhoto).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = context.Users.Include(p => p.Chats).Include(p => p.MainPhoto)
            .OrderByDescending(u => u.LastTimeActive).AsQueryable();
            users = users.Where(u => u.Gender == userParams.Gender); // will get this from the paramters

            if(!string.IsNullOrEmpty(userParams.OrderBy)){ // there is an input
                if(userParams.OrderBy == "created"){
                    users =users.OrderByDescending(u => u.DateOfCreation) ;
                }
                else if (userParams.OrderBy == "active"){ // last active user
                    users =users.OrderByDescending(u => u.LastTimeActive) ;
                }
            }



            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }


        public async Task<Chat> GetPhoto(int id)
        {
            var photo = await context.Chats.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }


        public async Task<MainPhoto> GetMainPhoto(int id)
        {
            var MainPhoto = await context.MainPhotos.FirstOrDefaultAsync(p => p.Id == id);

            return MainPhoto;
        }

        public async Task<bool> DeleteMainPhoto(int id)
        {
            var MainPhoto = await context.MainPhotos.FirstOrDefaultAsync(p => p.UserId == id);

            if (MainPhoto != null)
            {
                context.MainPhotos.Remove(MainPhoto); // Remove the MainPhoto entity from the DbSet
                // await context.SaveChangesAsync(); // Save the changes to update the database
                return true;
            }
            return false;


        }




        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}