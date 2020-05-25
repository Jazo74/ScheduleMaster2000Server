using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class Chore
    {
        public int TaskId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public string UserId { get; set; }
        public string TaskColor { get; set; }

        public Chore(int taskId, string taskTitle, string taskDescription, string userId, string taskColor)
        {
            TaskId = taskId;
            TaskTitle = taskTitle;
            TaskDescription = taskDescription;
            UserId = userId;
            TaskColor = taskColor;
        }

        public Chore(string taskTitle, string taskDescription, string userId, string task_color)
        {
            TaskTitle = taskTitle;
            TaskDescription = taskDescription;
            UserId = userId;
            TaskColor = task_color;
        }
    }
}
