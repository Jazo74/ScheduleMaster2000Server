using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScheduleMaster2000Server;
using ScheduleMaster2000Server.Baseclasses;


namespace ScheduleMaster2000Server.Services
{
   public interface IDB_Slots
    {
        List<Slot> GetAllSlotsByDayId(int dayID);
        Slot GetSlotById(int slotID);
        void UpdateSlot(int slotID, int taskID);
    }
}