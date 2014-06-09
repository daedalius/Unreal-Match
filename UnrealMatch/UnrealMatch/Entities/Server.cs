namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using Fleck;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Network;

    public class Server
    {
        /// <summary>
        /// Single instance of singleton pattern
        /// </summary> 
        private static Server instance = new Server();

        /// <summary>
        /// All games running on this server
        /// </summary>
        private List<Game> Games { get; set; }

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
        /// Initializes game list, opens socket and subscribes on sockets events
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
        /// Creates new game
        /// </summary>
        /// <param name="gameName">Unique game name</param>
        /// <param name="mapName">Game level</param>
        /// <param name="maxPlayers">Max players count</param>
        public void NewGame(string gameName, string mapName, int maxPlayers)
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
        /// Return games in waiting stage
        /// </summary>
        public IEnumerable<Game> GetAwaitableGames()
        {
            return this.Games.Where(g => g.State == GamePhase.Waiting);
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
        /// <param name="message">Client message</param>
        private void OnServerReceiveMessageHandler(IWebSocketConnection clientContext, string message)
        {
            var requestPathInfo = new RequestPathInfo(clientContext.ConnectionInfo.Path);
            this.GetGame(requestPathInfo.GameName).HandleClientMessage(clientContext, message);
        }
    }
}