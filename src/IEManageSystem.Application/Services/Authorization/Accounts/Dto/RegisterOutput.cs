using IEManageSystem.Dtos;

namespace IEManageSystem.Services.Authorization.Accounts.Dto
{
    public class RegisterOutput: OutputDtoBase
    {
        public bool CanLogin { get; set; }
    }
}
