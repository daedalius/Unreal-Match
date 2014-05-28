namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using Alchemy;
    using UnrealMatch.Game;
    using System.Diagnostics;

    public class Server
    {
        public WebSocketServer Socket;
        public List<Game> Games { get; private set; }

        public Server()
        {
            this.Games = new List<Game>();
            this.Socket = new WebSocketServer(4510, IPAddress.Loopback);
            this.Socket.TimeOut = new TimeSpan(1, 0, 0);
            this.Socket.OnConnect = this.ConnectingHandler;
            this.Socket.OnConnected = this.ConnectedHandler;
            this.Socket.OnSend = this.SendingHandler;
            this.Socket.OnReceive = this.ReciveDataHandler;
            this.Socket.OnDisconnect = this.DisconnectedHandler;

            this.Socket.Start();
        }


        public void AddGame(string gameName, string mapName, int maxPlayers)
        {
            var game = new Game(gameName, mapName, maxPlayers);
            this.Games.Add(game);
        }

        public Game GetGame(string gameName)
        {
            return this.Games.Where(x => x.Name == gameName).First();
        }

        private void ConnectingHandler(Alchemy.Classes.UserContext context)
        {
            Debug.WriteLine("Connecting: " + DateTime.Now);
        }

        private void ConnectedHandler(Alchemy.Classes.UserContext context)
        {
            Debug.WriteLine("Connected: " + DateTime.Now);

            var requestPathInfo = new RequestPathInfo(context.RequestPath);

            // Save client context at first time
            GetGame(requestPathInfo.GameName).SaveContextJoinedPlayer(context, requestPathInfo.PlayerIndexNumber);
            //Debug.WriteLine(String.Format("someone with ID={0} has been connected", requestPathInfo.PlayerIndexNumber));
        }

        private void ReciveDataHandler(Alchemy.Classes.UserContext context)
        {
            Debug.WriteLine(context.RequestPath + " Recive: " + DateTime.Now);

            var requestPathInfo = new RequestPathInfo(context.RequestPath);
            GetGame(requestPathInfo.GameName).HandleClientMessage(context.DataFrame);
            Debug.WriteLine(context.DataFrame);
            // UserContext already in game. Need to just inform about new state.
            //GetGame(requestPathInfo.GameName).SaveRecivedStateByPlayer(requestPathInfo.PlayerIndexNumber);
        }

        private void SendingHandler(Alchemy.Classes.UserContext context)
        {
            Debug.WriteLine("Sending: " + DateTime.Now);
        }

        private void DisconnectedHandler(Alchemy.Classes.UserContext context)
        {
            Debug.WriteLine(context.RequestPath + " Disconnected: " + DateTime.Now);
        }
    }
}