﻿using System.ComponentModel.DataAnnotations;

namespace Schuetzler_Mission11.API.Data
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; } = "";
        [Required]
        public string Author { get; set; } = "";
        [Required]
        public string Publisher { get; set; } = "";
        [Required]
        public string ISBN { get; set; } = "";
        [Required]
        public string Category { get; set; } = "";
        [Required]
        public int PageCount { get; set; } = 0;
        [Required]
        public decimal Price { get; set; } = 0;

    }
}
