function Draw()
{
    // Frame offset control
    // seting offset for current frame in 3 case:
    // first: player position in map begin
    // second: player position not in map begin or end
    // third: player position in map end

    // first, second
    FrameOffset.X = (CurrentPlayer.Position.X < 400) ? 0 : CurrentPlayer.Position.X - 400;
    // [TODO] test Y - BUG with epileptic players hands in jump
    FrameOffset.Y = (CurrentPlayer.Position.Y < 200) ? 0 : CurrentPlayer.Position.Y - 200;

    // third: stop camera in the end of level    
    if(CurrentPlayer.Position.X > Level.OutherSize.Width - 400) FrameOffset.X = Level.OutherSize.Width - 800;
    if(CurrentPlayer.Position.Y > Level.OutherSize.Height - 400) FrameOffset.Y = Level.OutherSize.Height - 600;

    // Test player drawing

    for(var i = 0; i < Game.GameInfo.MaxPlayers; i++)
    {
        if(i != CurrentPlayer.ID)
        {
            Players[i].Draw();
        }
    }

    CurrentPlayer.Draw();

    // Background drawing
    Rendering.Render.RenderBackground();

    requestAnimationFrame(Draw);
}

function Interval50()
{
    CurrentPlayer.NextPosition();
    Animation.AnimationManager.DoNextStep();

    // Decrease shot delay
    ShotDelay = (ShotDelay <= 50) ? 0 : ShotDelay - 50;
}

function Interval100()
{
    CurrentPlayer.HandleAnimationTick();
}