class Weburl {
    private baseUrl = ''

    setBaseUrl(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    // 对 url 进行处理，如果没有Http前缀，则使用 baseUrl 作为前缀
    handleWeburl(url){
        if(!url){
            return url;
        }
        
        if(!url.startsWith("http")){
          return this.baseUrl + url;
        }

        return url;
    }
}

const weburl = new Weburl();
export default weburl;