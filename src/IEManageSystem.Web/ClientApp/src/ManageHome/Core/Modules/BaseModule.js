class BaseModule
{
    constructor(){
        this.reducer = (state, action)=>state;
    }

    preInitialize(){
    }

    initialize(){
    }

    postInitialize(){
    }
}

export default BaseModule;