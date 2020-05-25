using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class Day
    {
        public int DayId { get; set; }
        public string DayName { get; set; }
        public int ScheduleId { get; set; }
        public int DayNumber { get; set; }

        public Day(int dayId, string dayName, int scheduleId, int dayNumber)
        {
            DayId = dayId;
            DayName = dayName;
            ScheduleId = scheduleId;
            DayNumber = dayNumber;
        }

        public Day(string dayName, int scheduleId, int dayNumber)
        {
            DayName = dayName;
            ScheduleId = scheduleId;
            DayNumber = dayNumber;
        }
    }
}
