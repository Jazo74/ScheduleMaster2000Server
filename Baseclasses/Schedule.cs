using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        public string ScheduleName { get; set; }
        public string UserId { get; set; }

        public Schedule(int scheduleId, string scheduleName, string userId)
        {
            ScheduleId = scheduleId;
            ScheduleName = scheduleName;
            UserId = userId;
        }

        public Schedule(string scheduleName, string userId)
        {
            ScheduleName = scheduleName;
            UserId = userId;
        }
    }
}
