import {BaseIERedux} from 'ice-common'

class TestIERedux extends BaseIERedux{
    getStateType(): string {
        return "test";
    }
}

const testReducer = (state:any, action:any)=>{
    return {
        testReducer: "testReducerState"
    }
};

class TestChildIERedux extends BaseIERedux{
    getStateType(): string {
        return "testchild";
    }
}

const testChildReducer = (state:any, action:any)=>{
    return {
        testChildReducer: "testChildReducerState"
    }
};

test("BaseIERedux_test", ()=>{
    let testIERedux = new TestIERedux();
    testIERedux.setReducer(testReducer);
    
    let testChildIERedux = new TestChildIERedux();
    testChildIERedux.setReducer(testChildReducer);

    testIERedux.register(testChildIERedux);

    let reducer = testIERedux.getReducer();
    let state = reducer({}, {}) as any;

    expect(state.testReducer).toEqual("testReducerState");
    expect(state.testchild.testChildReducer).toEqual("testChildReducerState");
})