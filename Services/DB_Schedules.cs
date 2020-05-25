using Npgsql;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Services
{
    public class DB_Schedules : IDB_Schedules
    {
        public List<Schedule> GetAllSchedules()
        {
            List<Schedule> schedules = new List<Schedule>();
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM schedules ", conn))
                {
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        
                        int scheduleId = (int)reader["schedule_id"];
                        string scheduleName = reader["schedule_name"].ToString();
                        string userId = reader["user_id"].ToString();
                        schedules.Add(new Schedule(scheduleId, scheduleName, userId));
                    }

                    return schedules;
                }
            }
        }

        public Schedule GetScheduleById(int scheduleID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM schedules WHERE schedule_id = @scheduleId", conn))
                {
                    cmd.Parameters.AddWithValue("scheduleId", scheduleID);
                    var reader = cmd.ExecuteReader();
                    int scheduleId = 0;
                    string scheduleName = "";
                    string userId = "";
                    while (reader.Read())
                    {
                        scheduleId = (int)reader["schedule_id"];
                        scheduleName = reader["schedule_name"].ToString();
                        userId = reader["user_id"].ToString();
                    }
                    Schedule schedule = new Schedule(scheduleId, scheduleName, userId);
                    return schedule;
                }
            }
        }

        public List<Schedule> GetAllSchedulesByUser(string userID)
        {
           
            List<Schedule> schedules = new List<Schedule>();
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM schedules WHERE user_id = @userId", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userID);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {

                        int scheduleId = (int)reader["schedule_id"];
                        string scheduleName = reader["schedule_name"].ToString();
                        string userId = reader["user_id"].ToString();
                        schedules.Add(new Schedule(scheduleId, scheduleName, userId));
                    }

                    return schedules;
                }
            }
        }

        public void InsertSchedule(string userId, string scheduleName)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("INSERT INTO schedules(schedule_name, user_id) VALUES (@scheduleName, @userId);", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.Parameters.AddWithValue("scheduleName", scheduleName);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateSchedule(int scheduleId, string scheduleName)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("UPDATE schedules SET schedule_name = @scheduleName" +
                    "WHERE schedule_id = @scheduleId;", conn))
                {
                    cmd.Parameters.AddWithValue("scheduleId", scheduleId);
                    cmd.Parameters.AddWithValue("scheduleName", scheduleName);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteSchedule(int scheduleId)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("DELETE from schedules WHERE schedule_id = @scheduleId", conn))
                {
                    cmd.Parameters.AddWithValue("scheduleId", scheduleId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Schedule GetLastScheduleIdByUserId(string userID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM schedules " +
                    "WHERE user_id = @userId " +
                    "ORDER BY schedule_id DESC LIMIT 1", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userID);
                    var reader = cmd.ExecuteReader();
                    int scheduleId = -1;
                    string scheduleName = "";
                    string userId = "";
                    while (reader.Read())
                    {
                        scheduleId = (int)reader["schedule_id"];
                        scheduleName = reader["schedule_name"].ToString();
                        userId = reader["user_id"].ToString();
                    }
                    Schedule schedule = new Schedule(scheduleId, scheduleName, userId);
                    return schedule;
                }
            }
        }
    }
}

