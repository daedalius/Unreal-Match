namespace UnrealMatch.Entities.GameObjects
{
    using Fleck;
    using System;
    using System.Diagnostics;
    using UnrealMatch.Entities.Calculations;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Interfaces;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public class Player : IMomentShotHitTest
    {
        /// <summary>
        /// Player nickname
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Player ID for this game
        /// </summary>
        public int Number { get; set; }
        /// <summary>
        /// Player health and armour
        /// </summary>
        public PlayerHealthStatus HealthStatus { get; set; }
        /// <summary>
        /// Player point in total
        /// </summary>
        public int Score { get; set; }
        /// <summary>
        /// Player position on level
        /// </summary>
        public Point Position { get; set; }
        /// <summary>
        /// Player view direction
        /// </summary>
        public PlayerViewDirection Direction { get; set; }
        /// <summary>
        /// Player view angle
        /// </summary>
        public double AngleOfView { get; set; }
        /// <summary>
        /// Player weapons and ammo
        /// </summary>
        public PlayerMunitions Munitions { get; set; }
        /// <summary>
        /// Weapon in hands
        /// </summary>
        public WeaponType Weapon { get; set; }
        /// <summary>
        /// Get player head rectangle
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public Rectangle HeadRectangle
        {
            get
            {
                var start = new Point(this.Position.X - 15, this.Position.Y + 129 + 28);
                var end = new Point(this.Position.X + 15, this.Position.Y + 129);
                return new Rectangle(start, end);
            }
        }
        /// <summary>
        /// Get player body rectangle
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public Rectangle BodyRectangle
        {
            get
            {
                var start = new Point(this.Position.X - 32, this.Position.Y + 128);
                var end = new Point(this.Position.X + 32, this.Position.Y);
                return new Rectangle(start, end);
            }
        }
        /// <summary>
        /// Player connection status
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public ClientStatus Status { get; set; }
        /// <summary>
        /// Player connection context
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public IWebSocketConnection ClientContext { get; set; }

        public Player(string playerName)
        {
            this.Weapon = WeaponType.Enforcer;
            this.Name = playerName;
            this.Status = ClientStatus.Disconnected;
            this.Score = 0;
            this.Position = new Point(600, 24);
            this.Direction = PlayerViewDirection.Right;
            this.AngleOfView = 0;
            this.Munitions = new PlayerMunitions();
            this.HealthStatus = new PlayerHealthStatus();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // IMomentShotHitTest Implementation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        MomentShotIntersectionResult IMomentShotHitTest.MomentShotHitTest(Shot shot)
        {
            var headIntersectionPoint = Get.ShotRectangleIntersection(shot, this.HeadRectangle);
            var bodyIntersectionPoint = Get.ShotRectangleIntersection(shot, this.BodyRectangle);

            // There is no intersections
            if (headIntersectionPoint == null && bodyIntersectionPoint == null)
            {
                return null;
            }
            // At least one intersection there
            else
            {
                // Headshot
                if (headIntersectionPoint != null && bodyIntersectionPoint == null)
                {
                    return new MomentShotIntersectionResult() { Intersection = headIntersectionPoint, Shot = shot, Victim = this, PlayerPart = PlayerCollisionPart.Head };
                }
                // Bodyshot
                if (headIntersectionPoint == null && bodyIntersectionPoint != null)
                {
                    return new MomentShotIntersectionResult() { Intersection = bodyIntersectionPoint, Shot = shot, Victim = this, PlayerPart = PlayerCollisionPart.Body };
                }

                // If both
                MomentShotIntersectionResult head = new MomentShotIntersectionResult() { Intersection = headIntersectionPoint, Shot = shot, Victim = this, PlayerPart = PlayerCollisionPart.Head };
                MomentShotIntersectionResult body = new MomentShotIntersectionResult() { Intersection = bodyIntersectionPoint, Shot = shot, Victim = this, PlayerPart = PlayerCollisionPart.Body };
                var compareResult = head.CompareTo(body);

                if (compareResult >= 0)
                {
                    return head;
                }
                else
                {
                    return body;
                }
            }
        }

        bool IMomentShotHitTest.HandleIntersection(MomentShotIntersectionResult intersection)
        {
            this.HealthStatus.Decrease(intersection.Shot.Damage);
            Debug.WriteLine("-{0} HP от попадания в {1} из {2}", intersection.Shot.Damage, intersection.PlayerPart.ToString(), intersection.Shot.Weapon.ToString());

            return true;
        }

        public Point GetCenterPoint(PlayerCollisionPart part)
        {
            if (part == PlayerCollisionPart.Body)
            {
                return this.BodyRectangle.GetCenterPoint();
            }

            if (part == PlayerCollisionPart.Head)
            {
                return this.HeadRectangle.GetCenterPoint();
            }

            throw new InvalidOperationException("There is player and there is no intersections for center point computing");
        }
    }
}