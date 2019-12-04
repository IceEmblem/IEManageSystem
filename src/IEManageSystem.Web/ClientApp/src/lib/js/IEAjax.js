export function setToken(token) {
    $.cookie('ie_token', token, { expires: 7, path: '/' });
}

export function getToken() {
    return $.cookie('ie_token');
}

export function clearToken() {
    $.cookie('ie_token', null, { expires: 0, path: '/' });
}

export function Fetch(url, init) {
    let token = getToken();

    if (!init.headers) {
        init.headers = {
            'Content-Type': 'application/json'
        };
    }

    init.headers = {
        ...init.headers,
        ...{
            'Authorization': "Bearer " + token || ""
        }
    }

    return fetch(url, init)
}

export function FetchCommon(url, postData) {
    let init = {
        method: 'post',
        type: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    }

    return Fetch(url, init)
        .then(
            response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }

                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        ).then(
            data => {
                if (data.isSuccess == false) {
                    throw new Error(data.message);
                }

                return data.value
            }
        )
}