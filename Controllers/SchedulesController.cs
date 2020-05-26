using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server.Services;

namespace ScheduleMaster2000Server.Controllers
{
    //[EnableCors("ControllerPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SchedulesController : ControllerBase
    {
        IDB_Schedules ds = new DB_Schedules();

        // GET: api/Schedules
        [HttpGet]
        public IEnumerable<Schedule> Get()
        {
            List<Schedule> schedules = ds.GetAllSchedules();
            Schedule[] scheduleArray = new Schedule[schedules.Count];
            for (int i = 0 ; i < schedules.Count; i++)
            {
                scheduleArray[i] = schedules[i];
            }
            
            return scheduleArray;
        }

        // GET: api/Schedules/Users/5
        [HttpGet("Users/{userId}", Name = "GetScheduleByUserId")]
        public IEnumerable<Schedule> GetScheduleByUserId(string userId)
        {
            List<Schedule> schedules = ds.GetAllSchedulesByUser(userId);
            Schedule[] scheduleArray = new Schedule[schedules.Count];
            for (int i = 0; i < schedules.Count; i++)
            {
                scheduleArray[i] = schedules[i];
            }

            return scheduleArray;
        }

        // GET: api/Schedules/5
        [HttpGet("{scheduleId}", Name = "GetScheduleById")]
        public IEnumerable<Schedule> Get(int scheduleId)
        {
            Schedule schedule = ds.GetScheduleById(scheduleId);
            Schedule[] scheduleArray = new Schedule[1];
            scheduleArray[0] = schedule;
            return scheduleArray;
        }

        // GET: api/Schedules/Last/5
        [HttpGet("Last/{userId}", Name = "GetLastScheduleById")]
        public IEnumerable<Schedule> GetLastScheduleIdByUserId(string userId)
        {
            Schedule schedule = ds.GetLastScheduleIdByUserId(userId);
            Schedule[] scheduleArray = new Schedule[1];
            scheduleArray[0] = schedule;
            return scheduleArray;
        }

        // POST: api/Schedules
        [HttpPost]
        public void Post([FromForm] string scheduleName, [FromForm] string userId)
        {
            ds.InsertSchedule(userId, scheduleName);
        }

        // PUT: api/Schedules/5
        [HttpPut("{scheduleId}")]
        public void Put(int scheduleId, [FromBody] string scheduleName)
        {
            ds.UpdateSchedule(scheduleId, scheduleName);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            ds.DeleteSchedule(id);
        }
    }
}
