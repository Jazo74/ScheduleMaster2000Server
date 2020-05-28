using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScheduleMaster2000Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        I_Logger dbLogger = new DBLogger();

        // GET: api/<LogController>
        [HttpGet]
        public IEnumerable<Log> Get()
        {
            List<Log> logList = dbLogger.GetAllLogs();
            Log[] logArray = new Log[logList.Count];
            for (int i = 0; i < logList.Count; i++)
            {
                logArray[i] = logList[i];
            }
            return logArray;
        }

        // GET api/<LogController>/5
        [HttpGet("{userId}/{method}")]
        public IEnumerable<Log> GetLogByParams(string userId, string method)
        {
            List<Log> logList = dbLogger.GetLog(userId, method);
            Log[] logArray = new Log[logList.Count];
            for (int i = 0; i < logList.Count; i++)
            {
                logArray[i] = logList[i];
            }
            return logArray;
        }

        // POST api/<LogController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LogController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LogController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
