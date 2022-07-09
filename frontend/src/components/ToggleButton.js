/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { colors } from '../helpers/util';

const buttonStyle = isSelected =>
  scale({
    fontWeight: 500,
    height: 'fit-content',
    padding: '8px 18px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    margin: '20px 20px 20px 0',
    fontSize: '20px',
    color: isSelected ? colors.textPrimary : colors.textSecondary,
    backgroundColor: isSelected ? colors.buttonSimpleSelect : colors.buttonSimple,
    transition: 'all ease-in-out 100ms',
    '&:hover': {
      backgroundColor: isSelected ? colors.buttonSimpleSelect : colors.buttonSimpleHover,
      opacity: isSelected ? 0.9 : 1
    }
  });

export default function ToggleButton({isSelected, onClick, text, children})  {
  return(
    <button
      css={buttonStyle(isSelected)}
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
