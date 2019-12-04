using IEManageSystem.EntityFrameworkCore;

namespace IEManageSystem.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public TestDataBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            //create test data here...
        }
    }
}