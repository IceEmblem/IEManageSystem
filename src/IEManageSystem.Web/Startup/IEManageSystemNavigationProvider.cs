using Abp.Application.Navigation;
using Abp.Localization;

namespace IEManageSystem.Web.Startup
{
    /// <summary>
    /// This class defines menus for the application.
    /// </summary>
    public class IEManageSystemNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        PageNames.Home,
                        L("HomePage"),
                        url: "",
                        icon: "fa fa-home"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.About,
                        L("About"),
                        url: "Home/About",
                        icon: "fa fa-info"
                        )
                );

            context.Manager.Menus.Add("ManageHomeMenu", 
                new MenuDefinition(
                    "ManageHome",
                    L("ManageHome")
                ).AddItem(
                    new MenuItemDefinition(
                        "UserManage",
                        L("UserManage")
                    ).AddItem(
                        new MenuItemDefinition(
                            "NormalUser",
                            L("NormalUser"),
                            url:""
                        )
                    )
                    .AddItem(
                        new MenuItemDefinition(
                            "AdminiUser",
                            L("AdminiUser"),
                            url: ""
                        )
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        "AuthorizeManage",
                        L("AuthorizeManage")
                    ).AddItem(
                        new MenuItemDefinition(
                            "ExternalAuthorize",
                            L("ExternalAuthorize"),
                            url: ""
                        )
                    )
                )
            );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, IEManageSystemConsts.LocalizationSourceName);
        }
    }
}
