namespace Chat.API.Utils
{
    public class Utils
    {
        public static int GetUserIdFromHttpContext(IHttpContextAccessor httpContextAccessor)
        {
            var userIdFromHttpContext = httpContextAccessor.HttpContext?.User?.Identity?.Name;
            return Convert.ToInt32(userIdFromHttpContext);
        }
    }
}
