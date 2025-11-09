

using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;

public class AuthMiddleware
{
    private readonly RequestDelegate _next;

    public AuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IUserService userService)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            userService.UserId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            userService.UserName = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            userService.GameCode = context.User.Claims.FirstOrDefault(c => c.Type == "gameCode")?.Value;
        }

        await _next(context);
    }
}

public static class AuthMiddlewareMiddlewareExtensions
{
    public static IApplicationBuilder UseAuthMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<AuthMiddleware>();
    }
}