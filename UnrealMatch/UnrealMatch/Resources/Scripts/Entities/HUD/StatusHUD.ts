module Entities
{
    export class StatusHUD
    {
        private rootElement: HTMLElement;
        private armourElement: HTMLElement;
        private hpElement: HTMLElement;

        constructor(rootElement: HTMLElement)
        {
            this.rootElement = rootElement;
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

        public Hide()
        {
            if($(this.rootElement).hasClass('visible'))
            {
                $(this.rootElement).removeClass('visible');
            }
        }

        public Show()
        {
            if(!$(this.rootElement).hasClass('visible'))
            {
                $(this.rootElement).addClass('visible');
            }
        }
    }
} 