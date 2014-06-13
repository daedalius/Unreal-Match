namespace UnrealMatch.Entities.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using UnrealMatch.Entities.Calculations;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public interface IMomentShotHitTest : IGetCenterPoint
    {
        /// <summary>
        /// Return MomentShotIntersectionResult instance if had intersection or null
        /// </summary>
        MomentShotIntersectionResult MomentShotHitTest(Shot shot);
        /// <summary>
        /// Handle intersection in game and return true if this intersection completely handled
        /// </summary>
        /// <returns></returns>
        bool HandleIntersection(MomentShotIntersectionResult intersection);
    }
}