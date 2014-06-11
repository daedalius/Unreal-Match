namespace UnrealMatch.Entities.ClientMessageTypes
{
    using System;
    using System.Diagnostics;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Weapons;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public class ClientShot
    {
        // Who made this shot
        public int PlayerId { get; set; }
        // Weapon
        public WeaponType Weapon { get; set; }
        // Mode
        public WeaponMode Mode { get; set; }
        // Shot initial position
        public Point StartPosition { get; set; }
        // Shot initial angle
        public double Angle { get; set; }
        // Shot direction: "Right" or "Left"
        public string Direction { get; set; }

        public ClientShot(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, string direction)
        {
            this.PlayerId = provider;
            this.Weapon = weapon;
            this.Mode = mode;
            this.StartPosition = position;
            this.Angle = angle;
            this.Direction = direction;
        }

        public Shot ConvertToShot()
        {
            PlayerViewDirection direction;
            if (this.Direction == "Right")
            {
                direction = PlayerViewDirection.Right;
            }
            else
            {
                direction = PlayerViewDirection.Left;
            }

            switch (this.Weapon)
            {
                case WeaponType.Hammer:
                    {
                        throw new NotImplementedException();
                    }
                case WeaponType.Enforcer:
                    {
                        Debug.WriteLine("Enforcer");
                        return new EnforcerShot(this.PlayerId, this.StartPosition, this.Angle, direction);
                    }
                case WeaponType.Biogun:
                    {
                        throw new NotImplementedException();
                    }
                case WeaponType.Shockrifle:
                    {
                        if (this.Mode == WeaponMode.Standart)
                        {
                            Debug.WriteLine("Shockrifle standart");
                            return new ASMDShot(this.PlayerId, this.StartPosition, this.Angle, direction);
                        }
                        else
                        {
                            Debug.WriteLine("Shockrifle alternate");
                            return new ASMDShell(this.PlayerId, this.StartPosition, this.Angle, direction);
                        }
                    }
                case WeaponType.Linkgun:
                    {
                        throw new NotImplementedException();
                    };
                case WeaponType.Minigun:
                    {
                        throw new NotImplementedException();
                    }
                case WeaponType.Flackcannon:
                    {
                        throw new NotImplementedException();
                    }
                case WeaponType.Rocketlauncher:
                    {
                        throw new NotImplementedException();
                    }
                case WeaponType.Sniperrifle:
                    {
                        throw new NotImplementedException();
                    }
            }

            // This code must be unreachable
            throw new NotImplementedException();
        }
    }
}