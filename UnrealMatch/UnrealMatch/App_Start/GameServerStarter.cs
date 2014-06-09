namespace UnrealMatch.App_Start
{
    using System;

    public class GameServerStarter
    {
        public static void StartServer()
        {
            UnrealMatch.Instances.GameServer = Entities.Server.Get();
        }
    }
}