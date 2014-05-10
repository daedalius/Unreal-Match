class Handlers
{
    public static MouseWheelHandler(event: MouseWheelEvent)
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

    public static MouseMoveHandler(event: MouseEvent)
    {
        // The simplest way set the values to prevent the occurrence unnecessary garbage (premature optimization, yes)
        Mouse.X = event.pageX - ContentElement.offsetLeft;
        Mouse.Y = event.pageY - ContentElement.offsetTop;

        CurrentPlayer.ReactOnPlayerInput();
    }

    public static KeyPressHandler(eventArg)
    {

        switch(eventArg.charCode)
        {
            // right
            case 100:
                {
                    CurrentPlayer.StartStrafeRight()
                    //CurrentPlayer.UpdateInnerOriginRectangle();
                    CurrentPlayer.ReactOnPlayerInput();
                    break;
                }

            // left
            case 97:
                {
                    CurrentPlayer.StartStrafeLeft()
                    //CurrentPlayer.UpdateInnerOriginRectangle();
                    CurrentPlayer.ReactOnPlayerInput();
                    break;
                }
            case 32:
                {
                    CurrentPlayer.TryJump();
                    //CurrentPlayer.UpdateInnerOriginRectangle();
                    CurrentPlayer.ReactOnPlayerInput();
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
                    CurrentPlayer.StopStrafeRight();
                    break;
                }

            // left
            case 65:
                {
                    CurrentPlayer.StopStrafeLeft();
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