using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;

namespace ScheduleMaster2000Server.Services
{
    interface I_Logger
    {
        void Log(string userId, string type, string path, string param1, string param2, string param3);
        List<Log> GetAllLogs();
        List<Log> GetLog(string userId, string logType);
    }
}
