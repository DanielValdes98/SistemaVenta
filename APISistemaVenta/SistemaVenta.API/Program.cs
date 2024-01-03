using SistemaVenta.IOC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Referencia a la capa DAL para la inyeccion del contexto de la base de datos
builder.Services.InyectarDependencias(builder.Configuration); // Solo le pasa la configuración de la cadena de conexión a la base de datos


// Configuración de CORS: Cross-Origin Resource Sharing, para permitir el acceso a la API desde cualquier origen, cualquier header y cualquier método
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app => { 
       app.AllowAnyOrigin()
       .AllowAnyHeader()
       .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("NuevaPolitica"); // Se debe colocar antes de app.UseAuthorization() y app.MapControllers() para activar CORS

app.UseAuthorization();

app.MapControllers();

app.Run();
