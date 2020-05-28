using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class Log
    {
        public int LogId { get; set; }
        public string UserId { get; set; }
        public string LogType { get; set; }
        public string LogPath { get; set; }
        public string LogParam1 { get; set; }
        public string LogParam2 { get; set; }
        public string LogParam3 { get; set; }
        public string TimeStamp { get; set; }

        public Log(int logId, string userId, string logType, string logPath, string logParam1, string logParam2, string logParam3, string timeStamp)
        {
            LogId = logId;
            UserId = userId;
            LogType = logType;
            LogPath = logPath;
            LogParam1 = logParam1;
            LogParam2 = logParam2;
            LogParam3 = logParam3;
            TimeStamp = timeStamp;

        }
    }
}
