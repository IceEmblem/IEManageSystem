using Microsoft.EntityFrameworkCore;

namespace IEManageSystem.EntityFrameworkCore
{
    public static class DbContextOptionsConfigurer
    {
        public static void Configure(
            DbContextOptionsBuilder<IEManageSystemDbContext> dbContextOptions, 
            string connectionString,
            string dbType
            )
        {
            /* This is the single point to configure DbContextOptions for IEManageSystemDbContext */
            if (dbType == "sqlserver")
            {
                dbContextOptions.UseSqlServer(connectionString);
            }
            else if (dbType == "mysql")
            {
                dbContextOptions.UseMySql(connectionString);
            }
            else {
                throw new System.Exception("无效的数据库类型");
            }
        }
    }
}
