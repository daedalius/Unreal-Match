namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using UnrealMatch.Game;
    using System.Diagnostics;
    using Fleck;

    public class Server
    {
        public List<IWebSocketConnection> ClientConnections;
        public WebSocketServer WebSocketServer;
        public List<Game> Games { get; private set; }

        public Server()
        {
            this.Games = new List<Game>();
            this.ClientConnections = new List<IWebSocketConnection>();
            this.WebSocketServer = new WebSocketServer("ws://127.0.0.1:4510");

            this.WebSocketServer.Start(client =>
                {
                    client.OnOpen = () =>
                        {
                            this.ConnectedHandler(client);
                        };
                    client.OnMessage = (message) =>
                        {
                            this.ReciveMessageHandler(client, message);
                        };
                    client.OnClose = () =>
                        {
                            // [TODO] - Correct client removing
                            Debug.WriteLine("Client " + client.ConnectionInfo.Path + " disconnected");
                        };
                    client.OnError = (exception) =>
                        {
                            // [TODO] - Error handling
                            Debug.WriteLine("Client " + client.ConnectionInfo.Path + " has some problems");
                            Debug.WriteLine("Exception meassage: " + exception.Message);
                        };
                });
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

        private void ConnectedHandler(IWebSocketConnection client)
        {
            Debug.WriteLine("Client " + client.ConnectionInfo.Path + " connected " + DateTime.Now);
            this.ClientConnections.Add(client);
            // Add refs in game instance
            var requestPathInfo = new RequestPathInfo(client.ConnectionInfo.Path);
            var game = this.GetGame(requestPathInfo.GameName);

            game.Players[requestPathInfo.PlayerIndexNumber].ClientContext = this.ClientConnections.Last();
            game.Players[requestPathInfo.PlayerIndexNumber].Status = ClientStatus.Connected;
        }

        private void ReciveMessageHandler(IWebSocketConnection clientContext, string message)
        {
            Debug.WriteLine(clientContext.ConnectionInfo.Path + " Recive: " + DateTime.Now);
            Debug.WriteLine(message);

            var requestPathInfo = new RequestPathInfo(clientContext.ConnectionInfo.Path);
            this.GetGame(requestPathInfo.GameName).HandleClientMessage(clientContext, message);
        }
    }
}