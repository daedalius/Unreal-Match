namespace UnrealMatch.Entities.Interfaces
{
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;

    public interface IGetCenterPoint
    {
        Point GetCenterPoint(PlayerCollisionPart part);
    }
}
