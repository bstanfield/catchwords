/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { colors } from '../helpers/util';

const buttonStyle = scale({
  fontWeight: 500,
  padding: '8px 18px',
  borderRadius: '3px',
  border: 'none',
  cursor: 'pointer',
  margin: '20px 20px 20px 0',
  fontSize: '20px',
  color: colors.textLight,
  backgroundColor: colors.buttonGreen,
  transition: 'all ease-in-out 100ms',
  '&:hover': {
    opacity: 0.9
  }
});

const grayStyle = scale({
  backgroundColor: colors.buttonSimple,
  color: colors.textSecondary,
})

export default function Button({onClick, text, children, className, color})  {
  const colorStyle = {
    'gray': grayStyle
  }[color] || {}

  return(
    <button
      css={[buttonStyle, colorStyle]}
      className={className}
      onClick={() => {
        if (onClick) {
          onClick()
        }}
      }
    >
      {text || children}
    </button>
  )
};
