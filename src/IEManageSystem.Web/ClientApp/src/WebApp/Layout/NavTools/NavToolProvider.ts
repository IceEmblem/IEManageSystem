class NavToolProvider {
    leftComponents = [];
    rightComponents = [];

    registerToolOfLeft(index, component){
        this.leftComponents.push({index, component});
        this.leftComponents.sort((l, r) => l.index - r.index);
    }

    registerToolRight(index, component){
        this.rightComponents.push({index, component});
        this.rightComponents.sort((l, r) => l.index - r.index);
    }

    getLeftComponents(){
        return this.leftComponents.map(item=>item.component);
    }

    getRightComponents(){
        return this.rightComponents.map(item=>item.component);
    }
}

const navToolProvider = new NavToolProvider();
export default navToolProvider;