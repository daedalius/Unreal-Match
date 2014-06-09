namespace UnrealMatch.Entities.Network
{
    public class RequestPathInfo
    {
        public string GameName { get; set; }
        public int PlayerIndexNumber { get; set; }

        /// <summary>
        /// Return parsed game name and player index number from recived RequestPath
        /// </summary>
        /// <param name="requestPathString">RequestPath format: /{gamename}-{playerIndexNumber}</param>
        public RequestPathInfo(string requestPathString)
        {
            this.GameName = requestPathString.Substring(1, requestPathString.LastIndexOf('-') - requestPathString.LastIndexOf('/') - 1);
            this.PlayerIndexNumber = int.Parse(requestPathString.Substring(requestPathString.LastIndexOf('-') + 1));
        }
    }
}