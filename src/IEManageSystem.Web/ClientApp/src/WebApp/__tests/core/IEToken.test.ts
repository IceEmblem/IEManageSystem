import IEToken from 'Core/IEToken'

test('IEToken_Test', () => 
{
    IEToken.setToken("abc").then(value=>{
        IEToken.getToken().then(cookie=>{
            expect(cookie).toEqual("abc");
        })
    })

    IEToken.clearToken().then(value=>{
        IEToken.getToken().then(cookie=>{
            expect(cookie).toEqual(null);
        })
    })
})