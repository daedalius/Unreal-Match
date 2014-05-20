namespace UnrealMatch.Entities
{
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum ClientStatus
    {
        Disconnected,
        Connected,
        Ready
    }
}