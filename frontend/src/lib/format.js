import * as R from 'ramda';

export const capitalizeFirst = (x) => R.concat(R.toUpper(R.head(x)), R.tail(x));
