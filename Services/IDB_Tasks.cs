using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;


namespace ScheduleMaster2000Server.Services
{
   public interface IDB_Tasks
    {
        // SELECTS
        List<Chore> GetAllTasksByUser(string userId);
        Chore GetTaskById(int taskId);

        // INSERT
        void InsertTask(string userID, string taskTitle, string taskDescription, string taskColor);

        // UPDATE
        void UpdateTask(int taskId, string taskTitle, string taskDescription, string taskColor);

        // DELETE
        void DeleteTask(int taskId);



    }
}