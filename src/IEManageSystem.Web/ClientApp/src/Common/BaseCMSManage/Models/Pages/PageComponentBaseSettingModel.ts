export default class PageComponentBaseSettingModel{
    public id: number;
    public sortIndex: number;
    public width: string | undefined;
    public height: string | undefined;

    public padding: string | undefined;
    public paddingLeft: number | undefined;
    public paddingRight: number | undefined;
    public paddingTop: number | undefined;
    public paddingBottom: number | undefined;

    public margin: string | undefined;
    public marginLeft: number | undefined;
    public marginRight: number | undefined;
    public marginTop: number | undefined;
    public marginBottom: number | undefined;

    public border: string | undefined;
    public borderRadius: string | undefined;
    public position: string | undefined;
    public left: string | undefined;
    public right: string | undefined;
    public top: string | undefined;
    public bottom: string | undefined;

    public backgroundColor: string | undefined;
    public backgroundImage: string | undefined;
    public className: string | undefined;
    public style: string | undefined;
}