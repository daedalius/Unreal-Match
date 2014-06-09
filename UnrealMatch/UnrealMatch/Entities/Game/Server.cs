namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using UnrealMatch.Game;
    using Fleck;

    public class Server
    {
        /// <summary>
        /// Single instance of singleton pattern
        /// </summary> 
        private static Server instance = new Server();

        /// <summary>
        /// All games running on this server
        /// </summary>
        public List<Game> Games { get; private set; }

        /// <summary>
        /// All clients connected to this server
        /// </summary>
        private List<IWebSocketConnection> ClientConnectionContexts;

        /// <summary>
        /// Server-side socket for receive and send players data
        /// </summary>
        public WebSocketServer WebSocketServer;

        /// <summary>
        /// Return singleton instance of server
        /// </summary>
        /// <returns>Server single instance</returns>
        public static Server Get()
        {
            return Server.instance;
        }

        /// <summary>
        /// Initializing game list, opening socket and subscrubing on sockets events
        /// </summary>
        private Server()
        {
            this.Games = new List<Game>();
            this.ClientConnectionContexts = new List<IWebSocketConnection>();
            this.WebSocketServer = new WebSocketServer("ws://127.0.0.1:4510");

            this.WebSocketServer.Start(client =>
                {
                    client.OnOpen = () =>
                        {
                            this.OnClientConnectedHandler(client);
                        };
                    client.OnMessage = (message) =>
                        {
                            this.OnServerReceiveMessageHandler(client, message);
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="gameName"></param>
        /// <param name="mapName"></param>
        /// <param name="maxPlayers"></param>
        public void AddGame(string gameName, string mapName, int maxPlayers)
        {
            var game = new Game(gameName, mapName, maxPlayers);
            this.Games.Add(game);
        }

        /// <summary>
        /// Returning game by name
        /// </summary>
        public Game GetGame(string gameName)
        {
            return this.Games.Where(x => x.Name == gameName).First();
        }

        /// <summary>
        /// Handling client connection event
        /// </summary>
        /// <param name="client">Client socket context</param>
        private void OnClientConnectedHandler(IWebSocketConnection client)
        {
            Debug.WriteLine("Client " + client.ConnectionInfo.Path + " connected " + DateTime.Now);

            // Add client in all clients list
            this.ClientConnectionContexts.Add(client);
            
            var requestPathInfo = new RequestPathInfo(client.ConnectionInfo.Path);
            var game = this.GetGame(requestPathInfo.GameName);

            // Add "local" refs in game instance
            game.Players[requestPathInfo.PlayerIndexNumber].ClientContext = client;
            game.Players[requestPathInfo.PlayerIndexNumber].Status = ClientStatus.Connected;
        }

        /// <summary>
        /// Handling sended client message
        /// </summary>
        /// <param name="clientContext">Client socket context</param>
        /// <param name="message">Clients message</param>
        private void OnServerReceiveMessageHandler(IWebSocketConnection clientContext, string message)
        {
            var requestPathInfo = new RequestPathInfo(clientContext.ConnectionInfo.Path);
            this.GetGame(requestPathInfo.GameName).HandleClientMessage(clientContext, message);
        }
    }
}