using System.Security.Claims;

public interface ITokenService {
    public string GenerateToken(IEnumerable<Claim> claims);
}