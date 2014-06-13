namespace UnrealMatch.Entities.GameObjects
{
    using System;

    /// <summary>
    /// Represent players health and armour points and provides methods to set them
    /// </summary>
    public class PlayerHealthStatus
    {
        private int hp;
        /// <summary>
        /// Players health points. Zero means death
        /// </summary>
        public int HP
        {
            get
            {
                return this.hp;
            }
            set
            {
                // No more than 199
                if (value > 199)
                {
                    this.hp = 199;
                }
                else
                {
                    this.hp = value;
                }
            }
        }

        private int armour;
        /// <summary>
        /// Players armour points. Zero means no harm protection to health at all
        /// </summary>
        public int Armour
        {
            get
            {
                return this.armour;
            }
            set
            {
                // No more than 100
                if (value > 100)
                {
                    this.armour = 100;
                }
                else
                {
                    this.armour = value;
                }
            }
        }

        public PlayerHealthStatus(int hp, int armour)
        {
            this.AddHealth(hp);
            this.AddArmour(armour);
        }

        public PlayerHealthStatus()
            : this(100, 20)
        { }
        
        /// <summary>
        /// Adds health points to player
        /// </summary>
        public void AddHealth(int healthToAdd)
        {
            if (healthToAdd <= 0)
            {
                throw new InvalidOperationException("Health to add must be greather than zero");
            }

            this.HP += healthToAdd;
        }

        /// <summary>
        /// Adds armour points to player
        /// </summary>
        public void AddArmour(int armourToAdd)
        {
            if (armourToAdd <= 0)
            {
                throw new InvalidOperationException("Armour to add must be greather than zero");
            }

            this.Armour += armourToAdd;
        }

        /// <summary>
        /// Compute harm to player
        /// </summary>
        /// <param name="damage">Damage from shot or blast</param>
        public void Decrease(int damage)
        {
            double damageToArmourPart = this.Armour / 100.0;
            double damageToHealthPart = 1 - damageToArmourPart;

            // Decrease
            this.Armour = this.Armour - (int)(damage * damageToArmourPart);
            this.HP = this.HP - (int)(damage * damageToHealthPart);
        }
    }
}