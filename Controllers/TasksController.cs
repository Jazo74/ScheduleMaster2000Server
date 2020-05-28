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
    public class TasksController : ControllerBase
    {
        IDB_Tasks ds = new DB_Tasks();
        I_Logger dbLogger = new DBLogger();

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Tasks/5
        [HttpGet("{id}", Name = "GetTask")]
        public string Get(int id)
        {
            return "value";
        }

        // GET: api/Tasks/Users/5
        [HttpGet("Users/{userId}", Name = "GetTasksByUserId")]
        public IEnumerable<Chore> GetTasksByUser(string userId)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "none";
            string param2 = "none";
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);

            List<Chore> tasks = ds.GetAllTasksByUser(userId);
            Chore[] taskArray = new Chore[tasks.Count];
            for (int i = 0; i < tasks.Count; i++)
            {
                taskArray[i] = tasks[i];
            }

            return taskArray;
        }

        // POST: api/Tasks
        [HttpPost]
        public void Post([FromForm] string userId, [FromForm] string taskTitle, [FromForm] string taskDescription, [FromForm] string taskColor)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "taskTitle = " + taskTitle;
            string param2 = "taskDescription = " + taskDescription;
            string param3 = "taskColor = " + taskColor;
            dbLogger.Log(userID, type, source, param1, param2, param3);

            ds.InsertTask(userId, taskTitle, taskDescription, taskColor);
        }

        // PUT: api/Tasks/5
        [HttpPut("{taskid}")]
        public void Put(int taskId, [FromForm] string taskDescription, [FromForm] string taskColor)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "taskDescription = " + taskDescription;
            string param2 = "taskColor = " + taskColor;
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);

            ds.UpdateTask(taskId, taskDescription, taskColor);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "none";
            string param2 = "none";
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);
        }
    }
}
