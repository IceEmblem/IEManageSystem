import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

let testArr = []

class ParentModule extends BaseModule{
    preInitialize(){
        testArr.push("parent");
    }
}

class ChildModule extends BaseModule {
    preInitialize(){
        testArr.push("child");
    }
}

class ChildChildModule extends BaseModule {
    preInitialize(){
        testArr.push("childchild");
    }
}

// 测试执行顺序，ChildModule依赖于ParentModule，所有ParentModule先执行
test("init_test", ()=>{
    let moduleFactory = new ModuleFactory();
    moduleFactory.register(ChildModule, [ParentModule]);
    moduleFactory.register(ChildChildModule, [ChildModule, ParentModule]);
    moduleFactory.register(ParentModule, null);

    moduleFactory.init();
    expect(testArr[0]).toEqual("parent");
    expect(testArr[1]).toEqual("child");
    expect(testArr[2]).toEqual("childchild");
})