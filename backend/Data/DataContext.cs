using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore; // This is the main namespace for Entity Framework Core
using backend.Models;


namespace backend.Data
{
    public class DataContext : DbContext
    {


        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; } // must asjust the model
        // public DbSet<Chat> Chats { get; set; } // can remove it

        public DbSet<MainPhoto> MainPhotos { get; set; } // needed
        public DbSet<Message> Messages {get; set;} // needed

        public DbSet<Chaty> Chatys {get; set;} //  needed
    }
}