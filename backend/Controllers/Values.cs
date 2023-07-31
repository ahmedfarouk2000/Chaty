using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("[controller]")] // name of the controller (/value)
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext context;
        public ValuesController(DataContext context)
        {
            this.context = context;

        }
        // GET api/values
        // [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValues(int id)
        {
            var value = await context.Values.FirstOrDefaultAsync(x => x.Id == id);
            // FirstOrDefault means if no matches then return null and Ok(null) is empty  
            //First will find the first match if not found then will return an error 500 internal Server error

            return Ok(value);

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
