function Draw()
{
    // Frame offset control
    // seting offset for current frame in 3 case:
    // first: player position in map begin
    // second: player position not in map begin or end
    // third: player position in map end

    // first, second
    FrameOffset.X = (CurrentPlayer.Position.X < 400) ? 0 : CurrentPlayer.Position.X - 400;
    // [TODO] test Y - BUG for players hands
    FrameOffset.Y = (CurrentPlayer.Position.Y < 200) ? 0 : CurrentPlayer.Position.Y - 200;

    // third: stop camera in the end of level    
    if(CurrentPlayer.Position.X > Level.OutherSize.Width - 400) FrameOffset.X = Level.OutherSize.Width - 800;
    if(CurrentPlayer.Position.Y > Level.OutherSize.Height - 400) FrameOffset.Y = Level.OutherSize.Height - 600;

    // Test player drawing
    CurrentPlayer.Draw();

    // Background drawing
    Rendering.Render.RenderBackground();

    requestAnimationFrame(Draw);
}

function Interval50()
{
    CurrentPlayer.NextPosition();
}

function Interval100()
{
    CurrentPlayer.HandleAnimationTick();
}