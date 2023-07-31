using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend.Helpers
{
    public static class Extensions
    {
        public static void AddPagination(this HttpResponse response, int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var serializedPaginationHeader = JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter);
            response.Headers.Add("Pagination", serializedPaginationHeader);
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}