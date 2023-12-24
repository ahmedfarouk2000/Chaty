using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Helpers;
using backend.Models;

namespace backend.Data
{
    public interface IDataRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Chat> GetPhoto(int id);

        Task<MainPhoto> GetMainPhoto(int id);
        Task<bool> DeleteMainPhoto(int id);
        Task<UserToListDto> updateUserData(int userId , UserToListDto updatedUser);
        Task<User> updateUserLastTimeActive(int userId) ;

        Task<MainPhoto> RemoveMainPhoto(int userId);
    }
}