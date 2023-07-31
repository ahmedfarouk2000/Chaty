using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int CurrentPage, int ItemPerPage, int TotalItems, int TotalPages)
        {
            this.CurrentPage = CurrentPage;
            this.ItemPerPage = ItemPerPage;
            this.TotalItems = TotalItems;
            this.TotalPages = TotalPages;
        }
    }
}