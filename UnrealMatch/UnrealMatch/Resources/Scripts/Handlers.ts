class Handlers
{
    public static MouseInterval: number;

    public static MouseDownHandler(event: MouseEvent)
    {
        if(IsMouseInputEnable)
        {
            Handlers.MouseInterval = setInterval(function()
            {
                var numb = event.button;

                switch(numb)
                {
                    case 0:
                        {
                            // Left button - main firemode
                            var weaponDelay = CurrentPlayer.Weapon.GetDelay(Weapons.WeaponMode.Standart) * 1000;
                            if(ShotDelay == 0)
                            {
                                CurrentPlayer.Weapon.MakeShot(Weapons.WeaponMode.Standart);
                                ShotDelay = weaponDelay;
                                console.log('shoot from ' + CurrentPlayer.Weapon.ToEnum().toString());
                            }
                            break;
                        }
                    case 2:
                        {
                            // Right button - alt firemode
                            var weaponDelay = CurrentPlayer.Weapon.GetDelay(Weapons.WeaponMode.Alternate) * 1000;
                            if(ShotDelay == 0)
                            {
                                CurrentPlayer.Weapon.MakeShot(Weapons.WeaponMode.Alternate);
                                ShotDelay = weaponDelay;
                                console.log('shoot from ' + CurrentPlayer.Weapon.ToEnum().toString());
                            }
                            break;
                        }
                }

            }, 50);
        }
    }

    public static MouseUpHandler(event: MouseEvent)
    {
        if(IsMouseInputEnable)
        {
            clearInterval(Handlers.MouseInterval);
        }
    }

    public static MouseWheelHandler(event: MouseWheelEvent)
    {
        if(IsMouseInputEnable)
        {
            // +: up
            // -: down
            var delta: number = event.wheelDelta / 120;
            if(delta > 0)
            {
                for(var i = 0; i < delta; i++)
                {
                    WHUD.SelectNextWeapon();
                }
            }
            else
            {
                for(var i = 0; i > delta; i--)
                {
                    WHUD.SelectPreviousWeapon();
                }
            }
        }
    }

    public static MouseMoveHandler(event: MouseEvent)
    {
        if(IsMouseInputEnable)
        {
            // The simplest way set the values to prevent the occurrence unnecessary garbage (premature optimization, yes)
            Mouse.X = event.pageX - ContentElement.offsetLeft;
            Mouse.Y = event.pageY - ContentElement.offsetTop;

            CurrentPlayer.ReactOnPlayerInput();
        }
    }

    public static KeyPressHandler(eventArg)
    {

        switch(eventArg.charCode)
        {
            // right
            case 100:
                {
                    if(IsKeyboardInputEnable)
                    {
                        CurrentPlayer.StartStrafeRight()
                        //CurrentPlayer.UpdateInnerOriginRectangle();
                        CurrentPlayer.ReactOnPlayerInput();
                    }
                    break;
                }

            // left
            case 97:
                {
                    if(IsKeyboardInputEnable)
                    {
                        CurrentPlayer.StartStrafeLeft()
                        //CurrentPlayer.UpdateInnerOriginRectangle();
                        CurrentPlayer.ReactOnPlayerInput();
                    }
                    break;
                }
            case 32:
                {

                    if(IsKeyboardInputEnable)
                    {
                        CurrentPlayer.TryJump();
                        //CurrentPlayer.UpdateInnerOriginRectangle();
                        CurrentPlayer.ReactOnPlayerInput();
                    }
                    break;
                }
            case 113:
                {
                    if(GsHUD)
                    {
                        GsHUD.Show();
                    }
                }
        }
    }

    public static KeyUpHandler(eventArg)
    {
        switch(eventArg.keyCode)
        {
            // right
            case 68:
                {
                    if(IsKeyboardInputEnable)
                    {
                        CurrentPlayer.StopStrafeRight();
                    }
                    break;
                }

            // left
            case 65:
                {
                    if(IsKeyboardInputEnable)
                    {
                        CurrentPlayer.StopStrafeLeft();
                    }
                    break;
                }

            case 81:
                {
                    if(GsHUD)
                    {
                        GsHUD.Hide();
                    }
                }
        }
    }
}