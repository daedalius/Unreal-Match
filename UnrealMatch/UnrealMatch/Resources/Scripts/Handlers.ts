class Handlers
{
    public static ContextMenuHandler()
    {
        return false;
    }

    public static MouseDownHandler(event: MouseEvent)
    {
        if(IsMouseInputEnable)
        {
            Weapons.ClientWeaponManager.OpenFire(event)
        }
    }

    public static MouseUpHandler(event: MouseEvent)
    {
        if(IsMouseInputEnable)
        {
            Weapons.ClientWeaponManager.StopFire();
        }
    }

    public static MouseWheelHandler(event: MouseWheelEvent)
    {
        if(IsMouseInputEnable)
        {
            //// +: up
            //// -: down
            //var delta: number = event.wheelDelta / 120;
            //if(delta > 0)
            //{


            //    for(var i = 0; i < delta; i++)
            //    {
            //        //if(CurrentPlayer.Weapon.ToEnum() != 8)
            //        //{
            //        //    switch (CurrentPlayer.Weapon.ToEnum())
            //        //    {
            //        //        case (Weapons.WeaponType.Hammer):
            //        //            {
            //        //                CurrentPlayer.Weapon = new Weapons.Enforcer();
            //        //                break;
            //        //            }
            //        //        case (Weapons.WeaponType.Enforcer):
            //        //            {
            //        //                CurrentPlayer.Weapon = new Weapons.Bio();
            //        //                break;
            //        //            }

            //        //    }
            //        //}
            //        WHUD.SelectNextWeapon();
            //    }
            //}
            //else
            //{
            //    for(var i = 0; i > delta; i--)
            //    {
            //        WHUD.SelectPreviousWeapon();
            //    }
            //}
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
            // Enforcer selected
            case 50:
                {
                    Weapons.ClientWeaponManager.TryChangeWeapon(Weapons.WeaponType.Enforcer);
                    break;
                }

            // ASMD selected
            case 52:
                {
                    Weapons.ClientWeaponManager.TryChangeWeapon(Weapons.WeaponType.Shockrifle);
                    break;
                }

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