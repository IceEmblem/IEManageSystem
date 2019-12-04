const Middlewares = []

export default class MiddlewareFactory
{
    register(middleware){
        Middlewares.push(middleware);
    }

    getMiddlewares(){
        return Middlewares;
    }
}