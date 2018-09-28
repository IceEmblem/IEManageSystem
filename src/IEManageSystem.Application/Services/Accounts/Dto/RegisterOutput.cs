using IEManageSystem.Dtos;

namespace IEManageSystem.Services.Accounts.Dto
{
    public class RegisterOutput: OutputDtoBase
    {
        public bool CanLogin { get; set; }
    }
}
