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
  const C3 = classToComponent<{ name: string }>(p => ({
    foo: p.name === 'foo',
  }));
  expect(renderToString(<C3 name="foo" />)).toMatchInlineSnapshot(
    `"<div class=\\"foo\\"></div>"`
  );
  expect(renderToString(<C3 name="bar" />)).toMatchInlineSnapshot(
    `"<div class=\\"\\"></div>"`
  );
  expect(
    renderToString(<C3 name="foo" className="baz" />)
  ).toMatchInlineSnapshot(`"<div class=\\"foo\\"></div>"`);
  expect(
    renderToString(<C3 name="bar" className="baz" />)
  ).toMatchInlineSnapshot(`"<div class=\\"\\"></div>"`);
});

test('Advanced usage', () => {
  const C1 = classToComponent<{ designation: string }>({
    displayName: 'AdminPanel',
    class: p => {
      if (p.designation === 'admin') return 'elaborate-view';
      return 'compact-view';
    },
  });
  expect(renderToString(<C1 designation="admin" />)).toMatchInlineSnapshot(
    `"<div class=\\"elaborate-view\\"></div>"`
  );
  expect(renderToString(<C1 designation="staff" />)).toMatchInlineSnapshot(
    `"<div class=\\"compact-view\\"></div>"`
  );
  expect(C1.displayName).toMatchInlineSnapshot(`"AdminPanel"`);
  const C2 = classToComponent({
    displayName: 'AdminPanel',
    class: () => ['foo', 'bar', undefined, null],
    element: 'span',
  });
  expect(renderToString(<C2 />)).toMatchInlineSnapshot(
    `"<span class=\\"foo bar\\"></span>"`
  );
  expect(C2.displayName).toMatchInlineSnapshot(`"AdminPanel"`);
});
