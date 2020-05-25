using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server.Services;

namespace ScheduleMaster2000Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysController : ControllerBase
    {
        IDB_Days ds = new DB_Days();

        //// GET: api/Days
        //[HttpGet]
        //public IEnumerable<string> GetAllDays()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Days/5
        //[HttpGet("{id}", Name = "GetDayById")]
        //public string GetDayById(int id)
        //{
        //    return "value";
        //}

        // GET: api/Days/Schedule/5
        [HttpGet("Schedule/{scheduleId}", Name = "GetDaysByScheduleId")]
        public Day[] GetDaysByScheduleId(int scheduleId)
        {
            List<Day> days = ds.GetAllDaysByScheduleId(scheduleId);
            Day[] dayArray = new Day[days.Count];
            for (int i = 0; i < days.Count; i++)
            {
                dayArray[i] = days[i];
            }
            return dayArray;
        }

        // POST: api/Days
        [HttpPost]
        public void Post([FromForm] int scheduleId, [FromForm] string dayName, [FromForm] int dayNumber)
        {
            ds.InsertDay(scheduleId, dayName, dayNumber);
        }

        // PUT: api/Days/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] int dayId, string dayName)
        {
            ds.UpdateDay(dayId, dayName);
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
            
        //}
    }
}
