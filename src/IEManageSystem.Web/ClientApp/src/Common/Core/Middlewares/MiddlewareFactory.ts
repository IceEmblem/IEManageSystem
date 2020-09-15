const Middlewares:Array<any> = []

class MiddlewareFactory
{
    register(middleware:any){
        Middlewares.push(middleware);
    }

    getMiddlewares(){
        return Middlewares;
    }
}

export default new MiddlewareFactory();