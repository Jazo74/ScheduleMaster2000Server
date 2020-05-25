using Microsoft.Extensions.Configuration.UserSecrets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class User
    {
        public string UserId { get; set; }
        public string NickName { get; set; }
        public string Password { get; set; }

        public User(string userId, string nickName, string password)
        {
            UserId = userId;
            NickName = nickName;
            Password = password;
        }
    }

}
