/** @jsx jsx */

import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';

export const tapLog = R.curry((message, x) => {
  console.log(message, x);
  return x;
});

export const createSlugFromName = name =>
  R.pipe(R.split(' '), R.join('-'))(name);

export const createNameFromSlug = slug =>
  R.pipe(R.split('-'), R.join(' '))(slug);

export const hexToRgba = (hex, opacity) => {
  const a = R.defaultTo(1, opacity);
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      ',' +
      a +
      ')'
    );
  } else console.error('Bad Hex');
};

export const capitalizeFirst = x => R.concat(R.toUpper(R.head(x)), R.tail(x));

export const createReactSelectOption = option => ({
  value: option,
  label: option,
});

export const renderWhatever = answers => {
  if (R.type(answers) === 'Array') {
    return R.append(
      `${R.last(answers)} `,
      R.map(a => `${a}, `, R.init(answers))
    );
  }
  if (R.type(answers) === 'Number') return `${answers.toFixed(0)} `;
  return `${answers} `;
};

export const sectorColor = sectorName =>
  sectorName === 'Fashion'
    ? hexToRgba('#4badd3', 0.3)
    : sectorName === 'Retail' || sectorName === 'E-commerce'
    ? hexToRgba('#fdb82c', 0.3)
    : sectorName === 'Transportation'
    ? hexToRgba('#fc2d1c', 0.3)
    : sectorName === 'Food' || sectorName === 'Agriculture'
    ? hexToRgba('#17a169', 0.3)
    : sectorName === 'Electronics'
    ? hexToRgba('#1274c1', 0.3)
    : hexToRgba('#fbe1c5', 0.3);

export const fixedDecimal = (num, dec) => {
  const decimal = R.defaultTo(0, dec);
  return Number(num).toFixed(decimal);
};

export const addCommasToBigNumber = num => {
  const numWithoutDecimals = fixedDecimal(num, 0);
  return R.pipe(
    R.reverse(),
    R.splitEvery(3),
    R.join(','),
    R.reverse()
  )(numWithoutDecimals);
};

export const dateInMilliseconds = d => {
  const date = new Date(d);
  return date.getTime();
};

export const estimateReadingTime = text => {
  const wordsPerMinute = 250;
  const wordsInText = R.pipe(R.split(' '), R.length())(text);
  const estimatedTime = fixedDecimal(wordsInText / wordsPerMinute, 0);
  return estimatedTime > 0 ? estimatedTime : 1;
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const makeMDYDateFromAnyDate = date => {
  const d = new Date(date);
  return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const sortContentByDate = R.curry((key, a, b) => {
  a = new Date(a.fields[key]);
  b = new Date(b.fields[key]);
  return a > b ? -1 : a < b ? 1 : 0;
});

export const hitAPIEndpoint = (endpoint, body) => {
  const response = fetch(`http://localhost:3333/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
};

// TODO: Why does module.exports not work :(
