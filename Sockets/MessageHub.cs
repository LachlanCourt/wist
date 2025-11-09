using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Sockets
{
    public class MessageHub : Hub
    {

        public async Task SendMessageAsync(string userId, string message) {
            await Clients?.User(userId)?.SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}