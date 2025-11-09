using Api.Init;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Sockets; 


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy  =>
        {
            policy.WithOrigins("https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod().AllowCredentials();
        });
});

builder.Services.AddSignalR();

builder.Services.AddAuthorization();

var configuration = builder.Configuration;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(jwtOptions =>
{
	jwtOptions.Authority = configuration["Token:Issuer"];
	jwtOptions.Audience = configuration["Token:Audience"];

    jwtOptions.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration["Token:Secret"]!)),
            ValidateIssuer = true,
            ValidIssuer = configuration["Token:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["Token:Audience"],
            ValidateLifetime = true
        };

    jwtOptions.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrEmpty(token))
            {
                token = context.Request.Cookies["token"]?.Substring(7);
            }

            context.Token = token;
            
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IGameSetupService, GameSetupService>();
builder.Services.AddTransient<ISaveGameService, SaveGameService>();
builder.Services.AddTransient<IGameStateService, GameStateService>();
builder.Services.AddTransient<IPlayerNotificationService, PlayerNotificationService>();
builder.Services.AddSingleton<MessageHub, MessageHub>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();
app.UseAuthorization();
app.UseAuthMiddleware();

app.MapGameInitEndpoints();
app.MapGameStateEndpoints();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<MessageHub>("/signalr");
});

app.Run();
