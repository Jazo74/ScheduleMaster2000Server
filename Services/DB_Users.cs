using Npgsql;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Services
{
    public class DB_Users : IDB_Users
    {
        public User GetUser(string email)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                if (email == null)
                {
                    email = "";
                }
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM users " +
                    "WHERE user_id = @email", conn))
                {
                    string userID = "";
                    string nickName = "";
                    string password = "";
                    cmd.Parameters.AddWithValue("email", email);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        userID = reader["user_id"].ToString();
                        nickName = reader["nickname"].ToString();
                        password = reader["pw"].ToString();
                    }
                    User user = new User(userID, nickName, password);
                    return user;
                }
            }
        }

        public void AddUser(string userId, string nickName, string password)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("INSERT INTO users (user_id, nickname, pw) VALUES (@userId, @nickName, @password)", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.Parameters.AddWithValue("nickName", nickName);
                    cmd.Parameters.AddWithValue("password", password);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        
        public bool UserAlreadyExists(string userID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT user_id FROM users WHERE user_id = @userId", conn))
                {
                    List<User> users = new List<User>();
                    string userId = "notfound";
                    cmd.Parameters.AddWithValue("userId", userID);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        userId = reader["user_id"].ToString();
                    }
                    if (userId == "notfound")
                    {
                        return false;
                    }
                    return true;
                }
            }
        }
    }
}

