using Npgsql;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Services
{
    public class DB_Days : IDB_Days
    {
        public List<Day> GetAllDaysByScheduleId(int scheduleID)
        {
            List<Day> days = new List<Day>();
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM days WHERE schedule_id = @scheduleId", conn))
                {
                    cmd.Parameters.AddWithValue("scheduleId", scheduleID);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {

                        int dayId = (int)reader["day_id"];
                        string dayName = reader["day_name"].ToString();
                        int scheduleId = (int)reader["schedule_id"];
                        int dayNumber = (int)reader["day_number"];
                        days.Add(new Day(dayId, dayName, scheduleId, dayNumber));
                    }
                    return days;
                }
            }
        }

        public List<Slot> GetAllSlotsByDayId(int dayID)
        {
            List<Slot> slots = new List<Slot>();
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM slots WHERE day_id = @dayId", conn))
                {
                    cmd.Parameters.AddWithValue("dayId", dayID);
                    var reader = cmd.ExecuteReader();
                    int taskId = -1;
                    while (reader.Read())
                    {

                        int slotId = (int)reader["slot_id"];
                        int dayId = (int)reader["day_id"];
                        int slotNumber = (int)reader["slot_number"];
                        //taskId = (int)reader["task_id"];
                        //var tempTaskId = reader["task_id"];
                        taskId = -1;
                        slots.Add(new Slot(slotId, taskId, dayId, slotNumber));
                    }
                    return slots;
                }
            }
        }

        // INSERT
        public void InsertDay(int scheduleId, string dayName, int dayNumber)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("INSERT INTO days(schedule_id, day_name, day_number) VALUES (@scheduleId, @dayName, @dayNumber);", conn))
                {
                    cmd.Parameters.AddWithValue("scheduleId", scheduleId);
                    cmd.Parameters.AddWithValue("dayName", dayName);
                    cmd.Parameters.AddWithValue("dayNumber", dayNumber);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // UPDATE
        public void UpdateDay(int dayId, string dayName)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("UPDATE days SET day_name = @dayName" +
                    "WHERE day_id = @dayId;", conn))
                {
                    cmd.Parameters.AddWithValue("dayName", dayName);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

