/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useEffect } from 'react';
import { colors } from '../helpers/util';

const possibleThemes = [
  {
    name: 'light',
    color: 'white',
   },
   {
    name: 'purple',
    color: 'lavender',
   },
   {
    name: 'dark',
    color: '#333333',
   },
   {
    name: 'neon',
    color: 'yellow',
   },
]

const radioParent = {
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  textAlign: 'center',
  flexShrink: 0,
  marginRight: 8,
  input: {
    opacity: 0,
    width: 0,
    height: 0,
  },
};

export default function ThemeSelector(props) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

  function handleOnSelect(e) {
    const targetTheme = e.target.value;
    document.documentElement.setAttribute('data-theme', targetTheme);
  }

  console.log('currentTheme', { currentTheme });
  return (
    <div
      onChange={(event) => handleOnSelect(event)}
    >
      {possibleThemes.map(theme => (
        <label>
          <div css={radioParent}>
            <input
              name={theme.name}
              id={theme.name}
              type="radio"
              value={theme.name}
              checked={currentTheme === theme.name}
            />
            <div css={{
              width: 40,
              height: 40,
              backgroundColor: theme.color,
              border: currentTheme === theme.name ? '2px solid' : '1px solid',
              borderColor: currentTheme === theme.name ? colors.buttonGreen: colors.border,
              borderRadius: 2, 
              marginBottom: 2,
            }}/>
            <p 
              css={{
                fontSize: 10, 
                color: currentTheme === theme.name ? colors.buttonGreen : colors.textSecondary,
              }}
            >
              {theme.name}
            </p>
          </div>
        </label>
        )
      )}

    </div>
  )
}