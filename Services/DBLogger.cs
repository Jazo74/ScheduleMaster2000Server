using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using Npgsql;
using ScheduleMaster2000Server.Baseclasses;

namespace ScheduleMaster2000Server.Services
{
    public class DBLogger : I_Logger
    {
        public void Log(string userId, string type, string path, string param1, string param2, string param3)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("INSERT INTO logs(user_id, log_type, log_path, log_param1, log_param2, log_param3)" +
                    " VALUES (@userId, @type, @path, @param1, @param2, @param3);", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.Parameters.AddWithValue("type", type);
                    cmd.Parameters.AddWithValue("path", path);
                    cmd.Parameters.AddWithValue("param1", param1);
                    cmd.Parameters.AddWithValue("param2", param2);
                    cmd.Parameters.AddWithValue("param3", param3);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Log> GetLog(string userId, string logType)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM logs WHERE user_id = @userId AND log_type = @logType", conn))
                {
                    List<Log> logList = new List<Log>();
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.Parameters.AddWithValue("logType", logType);
                    var reader = cmd.ExecuteReader();
                    int logId = 0;
                    string userID = "";
                    string logTYPE = "";
                    string logPath = "";
                    string logParam1 = "";
                    string logParam2 = "";
                    string logParam3 = "";
                    string timeStamp = "";

                    while (reader.Read())
                    {
                        logId = (int)reader["log_id"];
                        userID = reader["user_id"].ToString();
                        logTYPE = reader["log_type"].ToString();
                        logPath = reader["log_path"].ToString();
                        logParam1 = reader["log_param1"].ToString();
                        logParam2 = reader["log_param2"].ToString();
                        logParam3 = reader["log_param3"].ToString();
                        timeStamp = reader["created_at"].ToString();
                        Log logLine = new Log(logId, userID, logTYPE, logPath, logParam1, logParam2, logParam3, timeStamp);
                        logList.Add(logLine);
                    }
                    return logList;
                }
            }
        }

        public List<Log> GetAllLogs()
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM logs", conn))
                {
                    List<Log> logList = new List<Log>();
                    var reader = cmd.ExecuteReader();
                    int logId = 0;
                    string userID = "";
                    string logTYPE = "";
                    string logPath = "";
                    string logParam1 = "";
                    string logParam2 = "";
                    string logParam3 = "";
                    string timeStamp = "";
                    while (reader.Read())
                    {
                        logId = (int)reader["log_id"];
                        userID = reader["user_id"].ToString();
                        logTYPE = reader["log_type"].ToString();
                        logPath = reader["log_path"].ToString();
                        logParam1 = reader["log_param1"].ToString();
                        logParam2 = reader["log_param2"].ToString();
                        logParam3 = reader["log_param3"].ToString();
                        timeStamp = ((DateTime)reader["created_at"]).ToString();
                        Log logLine = new Log(logId, userID, logTYPE, logPath, logParam1, logParam2, logParam3, timeStamp);
                        logList.Add(logLine);
                    }
                    return logList;
                }
            }
        }
    }
}
