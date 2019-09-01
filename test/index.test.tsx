import classToComponent from '../src';
import { renderToString } from 'react-dom/server';
import * as React from 'react';

test('Basic usage', () => {
    const C1 = classToComponent('foo');
    expect(renderToString(<C1 />)).toMatchInlineSnapshot(
        `"<div class=\\"foo\\"></div>"`
    );
    expect(renderToString(<C1 className="bar" />)).toMatchInlineSnapshot(
        `"<div class=\\"foo bar\\"></div>"`
    );
    const C2 = classToComponent(['foo', 'bar']);
    expect(renderToString(<C2 />)).toMatchInlineSnapshot(
        `"<div class=\\"foo bar\\"></div>"`
    );
    expect(renderToString(<C2 className="baz" />)).toMatchInlineSnapshot(
        `"<div class=\\"foo bar baz\\"></div>"`
    );
    const C3 = classToComponent({
        displayName: 'AdminPanel',
        class: ['foo', 'bar', undefined, null],
        element: 'span',
    });
    expect(renderToString(<C3 />)).toMatchInlineSnapshot(
        `"<span class=\\"foo bar\\"></span>"`
    );
    expect(C3.displayName).toMatchInlineSnapshot(`"AdminPanel"`);
});
