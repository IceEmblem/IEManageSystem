const Middlewares:Array<any> = []

export default class MiddlewareFactory
{
    register(middleware:any){
        Middlewares.push(middleware);
    }

    getMiddlewares(){
        return Middlewares;
    }
}