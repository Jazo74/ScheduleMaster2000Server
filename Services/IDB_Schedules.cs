using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;


namespace ScheduleMaster2000Server.Services
{
   public interface IDB_Schedules
    {
        // SELECTS
        List<Schedule> GetAllSchedules();
        List<Schedule> GetAllSchedulesByUser(string userID);
        Schedule GetScheduleById(int scheduleID);
        Schedule GetLastScheduleIdByUserId(string userID);

        // INSERT
        void InsertSchedule(string userId, string scheduleName);
        

        // UPDATE
        void UpdateSchedule(int ScheduleId, string scheduleName);

        // DELETE
        void DeleteSchedule(int scheduleId);



    }
}