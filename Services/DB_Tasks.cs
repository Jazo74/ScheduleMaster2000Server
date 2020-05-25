using Npgsql;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Services
{
    public class DB_Tasks : IDB_Tasks
    {
        public Chore GetTaskById(int taskID)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM tasks WHERE task_id = @taskId", conn))
                {
                    cmd.Parameters.AddWithValue("taskId", taskID);
                    var reader = cmd.ExecuteReader();
                    int taskId = 0;
                    string userId = "";
                    string taskTitle = "";
                    string taskDescription = "";
                    string task_color = "";
                    
                    while (reader.Read())
                    {
                        taskId = (int)reader["task_id"];
                        taskTitle = reader["task_title"].ToString();
                        userId = reader["user_id"].ToString();
                        taskDescription = reader["task_description"].ToString();
                        task_color = reader["task_color"].ToString();
                    }
                    Chore task = new Chore(taskId, taskTitle, taskDescription, userId, task_color);
                    return task;
                }
            }
        }

        public List<Chore> GetAllTasksByUser(string userID)
        {
            List<Chore> tasks = new List<Chore>();
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM tasks WHERE user_id = @userId", conn))
                {
                    cmd.Parameters.AddWithValue("userId", userID);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int taskId = (int)reader["task_id"];
                        string taskTitle = reader["task_title"].ToString();
                        string userId = reader["user_id"].ToString();
                        string taskDescription = reader["task_description"].ToString();
                        string task_color = reader["task_color"].ToString();
                        tasks.Add(new Chore(taskId, taskTitle, taskDescription, userId, task_color));
                    }
                    return tasks;
                }
            }
        }

        public void InsertTask(string userId, string taskTitle, string taskDescription, string taskColor)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("INSERT INTO tasks(task_title, task_description, task_color, user_id) " +
                    "VALUES (@taskTitle, @taskDescription, @taskColor, @userId);", conn))
                {
                    cmd.Parameters.AddWithValue("taskTitle", taskTitle);
                    cmd.Parameters.AddWithValue("taskDescription", taskDescription);
                    cmd.Parameters.AddWithValue("taskColor", taskColor);
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateTask(int taskId, string taskTitle, string taskDescription, string taskColor)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("UPDATE tasks SET task_title = @taskTitle, " +
                    "task_description = @taskDescription, task_color = @taskColor WHERE task_id = @taskId;", conn))
                {
                    cmd.Parameters.AddWithValue("taskId", taskId);
                    cmd.Parameters.AddWithValue("taskTitle", taskTitle);
                    cmd.Parameters.AddWithValue("task_description", taskDescription);
                    cmd.Parameters.AddWithValue("taskColor", taskColor);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTask(int taskId)
        {
            using (var conn = new NpgsqlConnection(Program.ConnectionString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("DELETE from tasks WHERE task_id = @taskId", conn))
                {
                    cmd.Parameters.AddWithValue("taskId", taskId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

