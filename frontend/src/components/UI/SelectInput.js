/** @jsx jsx */

import PropTypes from 'prop-types';
import * as R from 'ramda';
import { css, jsx } from '@emotion/core';
import Select from 'react-select';
import { fonts, fontSizes, colors } from '../../style/theme';
import { createReactSelectOption } from '../../helpers/util';
import { scale } from '../../style/scale';

const inline = css`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const selectContainer = minWidth =>
  scale({
    width: '100%',
    minWidth: minWidth || '80px',
    maxWidth: '400px',
    margin: 0,
  });

const labelStyle = css`
  font-family: ${fonts.Sans};
  font-weight: 600;
  font-size: ${fontSizes.body};
  margin-bottom: 8px;
  margin-left: 5px;
`;

function SelectInput(props) {
  const {
    isMulti,
    options,
    answer,
    name,
    placeholder,
    handleInputChange,
    label,
    width,
    minWidth,
  } = props;
  const optionsAsSelectOption = R.map(createReactSelectOption, options);
  const answerAsSelectOption = answer
    ? R.map(createReactSelectOption, answer)
    : null;
  return (
    <div key={name}>
      {!R.isEmpty(label) && <h4 css={labelStyle}>{label}</h4>}
      <div css={inline}>
        <div
          css={css`
            ${selectContainer(minWidth)};
            width: ${width} !important;
          `}
        >
          <Select
            isMulti={isMulti}
            options={optionsAsSelectOption}
            defaultValue={answerAsSelectOption}
            placeholder={placeholder}
            onChange={newValue => {
              if (R.isNil(newValue)) return handleInputChange([]);
              if (isMulti) {
                const newAnswers = R.map(valueObj => valueObj.value, newValue);
                handleInputChange(newAnswers);
              } else {
                handleInputChange(newValue.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

SelectInput.defaultProps = {
  options: [],
  isMulti: false,
  label: '',
  width: '',
  error: '',
  errorWidth: '',
  answer: undefined,
  handleInputChange: undefined,
  unit: '',
};

SelectInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ),
  width: PropTypes.string,
  isMulti: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  answer: PropTypes.string,
  error: PropTypes.string,
  errorWidth: PropTypes.string,
  handleInputChange: PropTypes.func,
  unit: PropTypes.string,
};

export default SelectInput;
