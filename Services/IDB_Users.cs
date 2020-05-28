using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;


namespace ScheduleMaster2000Server.Services
{
   public interface IDB_Users
   {
        User GetUser(string email);

        void AddUser(string email, string nickname, string password);

        bool UserAlreadyExists(string email);
   }
}