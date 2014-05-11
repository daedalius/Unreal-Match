module Entities
{
    export class AbstractHUD
    {
        public RootElement: HTMLElement;
        private visible: boolean;

        constructor(rootElement: HTMLElement)
        {
            this.RootElement = rootElement;
            this.visible = false;            
        }

        public Hide()
        {
            if(this.visible)
            {
                if($(this.RootElement).hasClass('visible'))
                {
                    $(this.RootElement).removeClass('visible');
                }
            }
            this.visible = false;
        }

        public Show()
        {
            if(!this.visible)
            {
                if(!$(this.RootElement).hasClass('visible'))
                {
                    $(this.RootElement).addClass('visible');
                }
            }
            this.visible = true;
        }

        public Refresh()
        {
        }
    }
} 