import IEToken from 'Core/IEToken'

test('IEToken_Test', () => 
{
    IEToken.setToken("abc");
    expect(IEToken.getToken()).toEqual("abc");

    IEToken.clearToken();
    expect(IEToken.getToken()).toEqual(null);
})