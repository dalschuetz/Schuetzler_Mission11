﻿using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace Schuetzler_Mission11.API.Data
{
    public class BookDbContext : DbContext 
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) 
        { 
            
        }

        public DbSet<Book> Books { get; set; }
    }
}
