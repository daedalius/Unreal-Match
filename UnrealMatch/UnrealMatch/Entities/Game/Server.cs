﻿namespace UnrealMatch.Entities
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
            this.Socket = new WebSocketServer(99, IPAddress.Loopback);
            this.Socket.OnConnected = this.PlayerConnectionHandler;
            this.Socket.TimeOut = new TimeSpan(1, 0, 0);
            this.Socket.OnReceive = this.RecivePlayersDataHandler;
            this.Socket.OnSend = this.SendingHandler;
            this.Socket.OnDisconnect = this.PlayerDisconnectedHandler;

            // [BlackIndianMagic]
            // On exception try execute in console this:
            // net stop was /y

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

        public void JoinPlayer(string playerName, string gameName)
        {
            this.GetGame(gameName).JoinPlayer(playerName);
        }

        private void PlayerDisconnectedHandler(Alchemy.Classes.UserContext context)
        {
            // [TODO] disconnect handling
        }

        private void SendingHandler(Alchemy.Classes.UserContext context)
        {
            // do nothing
        }

        private void RecivePlayersDataHandler(Alchemy.Classes.UserContext context)
        {
            var requestPathInfo = new RequestPathInfo(context.RequestPath);
            Debug.WriteLine(context.DataFrame);
            // UserContext already in game. Need to just inform about new state.
            //GetGame(requestPathInfo.GameName).SaveRecivedStateByPlayer(requestPathInfo.PlayerIndexNumber);
        }

        private void PlayerConnectionHandler(Alchemy.Classes.UserContext context)
        {
            var requestPathInfo = new RequestPathInfo(context.RequestPath);

            // Save client context at first time
            GetGame(requestPathInfo.GameName).SaveContextJoinedPlayer(context, requestPathInfo.PlayerIndexNumber);
            Debug.WriteLine(String.Format("someone with ID={0} has been connected",requestPathInfo.PlayerIndexNumber));
        }
    }
}