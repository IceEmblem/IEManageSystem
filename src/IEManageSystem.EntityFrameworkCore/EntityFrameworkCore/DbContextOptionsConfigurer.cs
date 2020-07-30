using Microsoft.EntityFrameworkCore;

namespace IEManageSystem.EntityFrameworkCore
{
    public static class DbContextOptionsConfigurer
    {
        public const string SqlServerType = "sqlserver";

        public const string MySqlType = "mysql";

        public const string SQLiteType = "sqlite";

        public static void Configure(
            DbContextOptionsBuilder<IEManageSystemDbContext> dbContextOptions, 
            string connectionString,
            string dbType
            )
        {
            /* This is the single point to configure DbContextOptions for IEManageSystemDbContext */
            if (dbType == SqlServerType)
            {
                dbContextOptions.UseSqlServer(connectionString);
            }
            else if (dbType == MySqlType)
            {
                dbContextOptions.UseMySql(connectionString);
            }
            else if (dbType == SQLiteType) 
            {
                dbContextOptions.UseSqlite(connectionString);
            }
            else
            {
                throw new System.Exception("无效的数据库类型");
            }
        }
    }
}
