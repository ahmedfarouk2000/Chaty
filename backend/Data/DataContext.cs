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
        public DbSet<Value> Values { get; set; } // V   alues is the database name  
        public DbSet<User> Users { get; set; } // V   alues is the database name 
        public DbSet<Chat> Chats { get; set; } // V   alues is the database name 

        public DbSet<MainPhoto> MainPhotos { get; set; } // all current main photos
        public DbSet<Message> Messages {get; set;}

        public DbSet<Chaty> Chatys {get; set;}
    }
}