export interface FetchData {
    fecthSign: number,
    isFecthing: boolean,
    isSuccess: boolean,
    error: string,
    isAuthorize: boolean
}

export function reducer(
    state: any = {
        // 类型 FetchData，该数据由中间件赋值
        fecths: new Array<FetchData>()
    }, action: any) {
    return {
        ...state,
        ...{
            fecths: state.fecths
        }
    }
}