namespace UnrealMatch.Entities.Enums
{
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum BlastType
    {
        ASMDBlast,
        ASMDBigBlast,
    }
}