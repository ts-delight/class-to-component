import classToComponent, { ITargetProps } from '../src';
import { renderToString } from 'react-dom/server';
import * as React from 'react';

test('Basic usage', () => {
  const C1 = classToComponent('foo');
  expect(renderToString(<C1 />)).toMatchInlineSnapshot(
    `"<div class=\\"foo\\" data-reactroot=\\"\\"></div>"`
  );
  const C2 = classToComponent(['foo', 'bar']);
  expect(renderToString(<C2 />)).toMatchInlineSnapshot(
    `"<div class=\\"foo bar\\" data-reactroot=\\"\\"></div>"`
  );
});

test('Advanced usage', () => {
  const C1 = classToComponent<{ designation: string } & ITargetProps>({
    displayName: 'AdminPanel',
    class: p => {
      if (p.designation === 'admin') return 'elaborate-view';
      return 'compact-view';
    },
  });
  expect(renderToString(<C1 designation="admin" />)).toMatchInlineSnapshot(
    `"<div class=\\"elaborate-view\\" data-reactroot=\\"\\"></div>"`
  );
  expect(renderToString(<C1 designation="staff" />)).toMatchInlineSnapshot(
    `"<div class=\\"compact-view\\" data-reactroot=\\"\\"></div>"`
  );
  expect(C1.displayName).toMatchInlineSnapshot(`"AdminPanel"`);
  const C2 = classToComponent({
    displayName: 'AdminPanel',
    class: () => ['foo', 'bar', undefined, null],
    element: 'span',
  });
  expect(renderToString(<C2 />)).toMatchInlineSnapshot(
    `"<span class=\\"foo bar\\" data-reactroot=\\"\\"></span>"`
  );
  expect(C2.displayName).toMatchInlineSnapshot(`"AdminPanel"`);
});
