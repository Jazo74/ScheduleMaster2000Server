using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server.Services;

namespace ScheduleMaster2000Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {
        IDB_Slots ds = new DB_Slots();
        I_Logger dbLogger = new DBLogger();

        //// GET: api/Slots
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/Slots/Day/5
        [HttpGet("Day/{dayId}", Name = "GetSlots")]
        public Slot[] Get(int dayId)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "none";
            string param2 = "none";
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);

            List<Slot> slots = ds.GetAllSlotsByDayId(dayId);
            Slot[] slotArray = new Slot[slots.Count];
            for (int i = 0; i < slots.Count; i++)
            {
                slotArray[i] = slots[i];
            }
            return slotArray;
        }

        //// POST: api/Slots
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT: api/Slots/5
        [HttpPut("{slotId}")]
        public void Put(int slotId, [FromForm] int taskId)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "taskId = " + taskId;
            string param2 = "none";
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);

            ds.UpdateSlot(slotId, taskId);
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
