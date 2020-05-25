using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScheduleMaster2000Server.Baseclasses
{
    public class Slot
    {
        public int SlotId { get; set; }
        public int TaskId { get; set; }
        public int DayId { get; set; }
        public int SlotNumber { get; set; }

        public Slot(int slotId, int taskId, int dayId, int slotNumber)
        {
            SlotId = slotId;
            TaskId = taskId;
            DayId = dayId;
            SlotNumber = slotNumber;
        }

        public Slot(int taskId, int dayId, int slotNumber)
        {
            TaskId = taskId;
            DayId = dayId;
            SlotNumber = slotNumber;
        }
    }
}
