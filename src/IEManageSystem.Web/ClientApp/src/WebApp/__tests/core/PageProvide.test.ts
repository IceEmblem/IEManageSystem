import {PageProvider} from 'ice-common'
import {Page} from 'ice-common';
import React from 'react';

class TestComponent extends React.Component{
}

test('PageProvide_Test', () => 
{
    PageProvider.register(new Page("home", "/", TestComponent));
    PageProvider.register(new Page("query", "/query", TestComponent));
    PageProvider.register(new Page("manage", "/manage", TestComponent));
    PageProvider.register(new Page("querypage", "/query/page", TestComponent));

    expect(PageProvider.pages.length).toEqual(4);
    expect(PageProvider.pages[0].url).toEqual("/query/page");
    expect(PageProvider.pages[1].url).toEqual("/query");
    expect(PageProvider.pages[2].url).toEqual("/manage");
    expect(PageProvider.pages[3].url).toEqual("/");
})