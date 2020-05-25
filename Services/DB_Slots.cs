using Npgsql;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Services
{
    public class DB_Slots : IDB_Slots
    {
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
                    while (reader.Read())
                    {

                        int slotId = (int)reader["slot_id"];
                        int dayId = (int)reader["day_id"];
                        int slotNumber = (int)reader["slot_number"];
                        int taskId = (int)reader["task_id"];
                        slots.Add(new Slot(slotId, taskId, dayId, slotNumber));
                    }
                    return slots;
                }
            }
        }

        public Slot GetSlotById(int slotID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM slots WHERE slot_id = @slotId", conn))
                {
                    cmd.Parameters.AddWithValue("slotId", slotID);
                    var reader = cmd.ExecuteReader();
                    int taskId = 0;
                    int slotId = 0;
                    int dayId = 0;
                    int slotNumber = 0;
                    while (reader.Read())
                    {
                        slotId = (int)reader["slot_id"];
                        dayId = (int)reader["day_id"];
                        slotNumber = (int)reader["slot_number"];
                        taskId = (int)reader["task_id"];
                    }
                    Slot slot = new Slot(slotId, taskId, dayId, slotNumber);
                    return slot;
                }
            }
        }

        public void UpdateSlot(int slotID, int taskID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("UPDATE slots SET task_id = @taskId" +
                    "WHERE slot_id = @slotId;", conn))
                {
                    cmd.Parameters.AddWithValue("slotId", slotID);
                    cmd.Parameters.AddWithValue("taskId", taskID);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

