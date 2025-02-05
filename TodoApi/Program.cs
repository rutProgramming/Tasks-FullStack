using Microsoft.EntityFrameworkCore;
using TodoApi;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
builder.Services.AddDbContext<ToDoDbContext>();
builder.Services.AddControllers();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("AllowAllOrigins"); 

app.UseAuthorization();
app.MapControllers();

app.MapGet("/",() => "welcome to our server");

app.MapGet("/items", async (ToDoDbContext dbContext) =>
{
    var results = await dbContext.Items.ToListAsync();
    return Results.Ok(results);
    
});



app.MapPost("/items", async (Item TaskName, ToDoDbContext db) =>
    {
    var item = new Item { Name = TaskName.Name,IsComplete=false};
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/{item.Id}", item);
});

app.MapPut("/items/{id}",async (int id,Item isComplete, ToDoDbContext db) =>{
    var item = await db.Items.FindAsync(id);
    if(item is null) return Results.NotFound();
    item.IsComplete=isComplete.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
