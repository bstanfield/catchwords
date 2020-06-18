/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { fonts, fontSizes } from '../../style/theme';
import { scale } from '../../style/scale';

const inputBox = scale({
  height: 'auto',
  padding: '12px',
  position: 'relative',
  backgroundColor: 'rgba(255,255,255,0.95)',
  fontFamily: fonts.Sans,
  fontSize: fontSizes.bodyLarge,
  fontWeight: 500,
  borderRadius: '3px',
  border: '1px solid #d4d4d4',
  transition: 'border 300ms ease-in-out',
  width: 'calc(100% - 26px)',
  color: 'rgb(27, 60, 52)',
  '&::placeholder': {
    color: 'rgba(27, 60, 52, 0.5)',
  },
});
function TextInput(props) {
  const {
    type,
    name,
    placeholder,
    value,
    handleInputChange,
    autoComplete,
  } = props;
  return (
    <input
      type={type}
      key={name}
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      css={inputBox}
      value={value}
      onChange={(event) => handleInputChange(event.target.value)}
    />
  );
}

TextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  error: '',
  errorWidth: '',
  height: undefined,
  errorBorder: false,
  width: '',
  marginRight: '',
  paddingRight: '',
  value: undefined,
  handleInputChange: undefined,
  unit: '',
  maxWidth: '',
  autoComplete: 'on',
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  marginRight: PropTypes.string,
  paddingRight: PropTypes.string,
  height: PropTypes.string,
  error: PropTypes.string,
  errorWidth: PropTypes.string,
  errorBorder: PropTypes.bool,
  width: PropTypes.string,
  handleInputChange: PropTypes.func,
  unit: PropTypes.string,
  maxWidth: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default TextInput;
