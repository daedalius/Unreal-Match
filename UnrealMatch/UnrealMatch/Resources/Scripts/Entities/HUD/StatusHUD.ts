module Entities
{
    export class StatusHUD extends AbstractHUD
    {
        private armourElement: HTMLElement;
        private hpElement: HTMLElement;

        constructor(rootElement: HTMLElement)
        {
            super(rootElement);
            this.hpElement = <HTMLElement>rootElement.querySelector('#hp-value');
            this.armourElement = <HTMLElement>rootElement.querySelector('#armour-value');
        }

        public SetHP(hp: string)
        {
            this.hpElement.textContent = hp;
        }

        public SetArmour(armour: string)
        {
            this.armourElement.textContent = armour;
        }
    }
} 