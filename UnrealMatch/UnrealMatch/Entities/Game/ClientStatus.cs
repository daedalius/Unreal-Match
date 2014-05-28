namespace UnrealMatch.Entities
{
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum ClientStatus
    {
        Disconnected,
        // Socket opened
        Connecting,
        // Client socket can recive data
        Connected,
        // Client informed about the readiness himself
        // He is ready for countdown stage
        Ready
    }
}