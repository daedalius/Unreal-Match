using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UnrealMatch.Entities
{
    public class PlayerStatistic
    {
        // Order number
        public int Number { get; set; }
        // Nickname
        public string Name { get; set; }
        // Score points (frags for example)
        public int Score { get; set; }
    }
}