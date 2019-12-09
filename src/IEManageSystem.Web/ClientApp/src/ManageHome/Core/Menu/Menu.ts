import AccessScope from "Core/ApiScopeAuthority/AccessScope";

export default class Menu
{
	id:string;
	text:string;
	url:string;
	default:boolean = false;
	icon:string;
	accessScope:Array<AccessScope>;
	menuItems:Array<Menu>;
	
	constructor()
	{
		this.id = "";
		this.text = "";
		this.url = "";
		this.default = false;
		this.icon = "";
		this.accessScope = [];
		this.menuItems = new Array();
	}
}