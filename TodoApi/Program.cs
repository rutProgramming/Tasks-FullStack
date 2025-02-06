using Microsoft.EntityFrameworkCore;
using TodoApi;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services for OpenAPI (Swagger)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});

// Configure CORS
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

// Add database context and controllers
builder.Services.AddDbContext<ToDoDbContext>();
builder.Services.AddControllers();

var app = builder.Build();


// Enable Swagger in development mode
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
    c.RoutePrefix = string.Empty; // Swagger UI will open at the root URL
});


// Middleware pipeline
app.UseCors("AllowAllOrigins");
app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => "Welcome to our server");

app.MapGet("/items", async (ToDoDbContext dbContext) =>
{
    var results = await dbContext.Items.ToListAsync();
    return Results.Ok(results);
});

app.MapPost("/items", async (Item TaskName, ToDoDbContext db) =>
{
    var item = new Item { Name = TaskName.Name, IsComplete = false };
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/{item.Id}", item);
});

app.MapPut("/items/{id}", async (int id, Item isComplete, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();
    item.IsComplete = isComplete.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
