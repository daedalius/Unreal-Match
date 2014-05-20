namespace UnrealMatch.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using UnrealMatch.Models;

    public class HomeController : Controller
    {
        // Player decided joint to exist game
        [HttpPost]
        public ActionResult Join(GamesInfo gameInfoModel)
        {
            //Instances.GameServer.JoinPlayer(gameInfoModel.Nickname, gameInfoModel.GameName);
            var game = Instances.GameServer.GetGame(gameInfoModel.GameName ?? gameInfoModel.AvailableGames[0]);            
            game.JoinPlayer(gameInfoModel.Nickname);

            // Model forming
            var model = new GameStartInfo()
            {
                GameName = game.Name,
                PlayerName = gameInfoModel.Nickname,                
                PlayerNumber = game.Players.Where(x => x.Name == gameInfoModel.Nickname).First().Number,
                PlayersCount = game.PlayersCount,
                MapName = game.Map.Title,
                MapWidth = game.Map.Size.Width,
                MapHeight = game.Map.Size.Height,
                MapPasses = game.Map.PassablenessMap,
                MapQuality = game.Map.Quality
            };

            return View("Join", model);
        }

        // Client decided create new game
        [HttpPost]
        public ActionResult Create(GamesInfo model)
        {
            Instances.GameServer.AddGame(model.GameName, model.AvailableMaps[0].ToString(), model.MaxPlayers);
            return this.Join(model);
        }

        // Game
        [HttpGet]
        public ActionResult Index()
        {
            var availableGames = Instances.GameServer.Games.Select(x => x.Name).ToArray();
            var availableModes = new string[] { "Deathmatch" };
            var availableMaps = new string[] { "Rising-Sun" };

            // Model forming
            var model = new GamesInfo()
            {
                AvailableGames = availableGames,
                AvailableMaps = availableMaps,
                AvailableModes = availableModes,
                MaxPlayers = 4
            };

            return View(model);
        }
    }
}
