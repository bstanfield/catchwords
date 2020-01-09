/** @jsx jsx */

import Tippy from '@tippy.js/react';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { scale } from '../../style/scale';
import { childrenPropType } from '../../helpers/propTypes';

const fullDefContainer = scale({
  width: 'fit-content',
  paddingRight: '0px',
  cursor: 'pointer',
  display: 'inline',
  zIndex: '999999 !important',
});

const strongStyle = scale({
  display: 'block',
  marginTop: '5px',
  marginBottom: '5px',
  fontSize: '15px',
});

const bodyStyle = scale({
  fontSize: '15px !important',
  lineHeight: '24px',
  color: '#333333',
  opacity: '.8',
});

const tippy = scale({
  textDecoration: 'none !important',
  color: '#333333',
});

const reactTippy = plain =>
  scale({
    textAlign: 'left',
    backgroundColor: 'white !important',
    fontSize: '18px',
    lineHeight: '22px',
    padding: plain ? '0px 5px' : '10px 12px 18px 18px',
    border: '1px solid #eee',
    textDecoration: 'none !important',
    marginBottom: '5px',
    boxShadow:
      '0 10px 15px rgba(0, 0, 0, 0.15), 0 0px 15px rgba(0, 0, 0, 0.05)',
  });

export default function TooltipWrapper(props) {
  const { title, children, onPageContent, plain } = props;

  return (
    <Tippy
      content={
        <div>
          <div>
            <strong css={strongStyle}>{title}</strong>
          </div>
          <div css={bodyStyle}>{children}</div>
        </div>
      }
      interactive
      css={[tippy, reactTippy(plain)]}
      hideOnClick={false}
      popperOptions={{
        modifiers: {
          addZIndex: {
            enabled: true,
            order: 810,
            fn: data => ({
              ...data,
              styles: {
                ...data.styles,
                zIndex: 99999999,
              },
            }),
          },
        },
      }}
    >
      <div css={fullDefContainer}>{onPageContent}</div>
    </Tippy>
  );
}

TooltipWrapper.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
  children: childrenPropType,
};

TooltipWrapper.defaultProps = {
  body: '',
  title: '',
  children: undefined,
};
