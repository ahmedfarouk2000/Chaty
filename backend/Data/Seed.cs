using System.Text.Json;
using backend.Models;

namespace backend.Data
{
    public class Seed
    {

        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("Data/DataSeed.json");
                var users = JsonSerializer.Deserialize<List<User>>(userData); // Use JsonSerializer instead of JsonConverter

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordSalt, out passwordHash);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;

                    user.Name = user.Name.ToLower();
                    context.Users.Add(user);
                }

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwaordSalt, out byte[] passwordHash)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwaordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
