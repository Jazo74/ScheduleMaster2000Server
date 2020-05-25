using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;


namespace ScheduleMaster2000Server.Services
{
   public interface IDB_Days
    {
        // GET
        List<Day> GetAllDaysByScheduleId(int scheduleID);

        // INSERT
        void InsertDay(int scheduleId, string dayName, int dayNumber);

        // UPDATE
        void UpdateDay(int dayId, string dayName);
        
        // DELETE
        // Not possible to delete days from schedules
    }
}