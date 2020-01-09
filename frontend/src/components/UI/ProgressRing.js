/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { scale } from '../../util/scale';
import { fonts, colors, fontSizes } from '../../style/theme';

const circleStyle = scale({
  transition: 'stroke-dashoffset 2s, stroke 1s',
  transform: 'rotate(-90deg)',
  transformOrigin: '50% 50%',
  zIndex: '2',
});

const lowIndex = scale({
  zIndex: '1',
});

const lowerIndex = scale({
  zIndex: '0',
});

const progressRingContainer = scale({
  width: 'fit-content',
  height: 'fit-content',
  margin: 'auto',
  position: 'relative',
});

const progressRingText = radius =>
  scale({
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
    justifyContent: 'center',
    width: `${radius}px`,
    height: 'fit-content',
    textAlign: 'center',
    h2: {
      fontFamily: fonts.Sans,
      fontSize: fontSizes.header,
    },
    p: {
      fontSize: '15px',
    },
  });

export default function ProgressRing(props) {
  const { radius, stroke, current, total, add, text } = props;

  const [progress, setProgress] = useState();
  const [additionalProgress, setAdditionalProgress] = useState();
  const [initialProgress, setInitialProgress] = useState();
  const [initialAdditionalProgress, setInitialAdditionalProgress] = useState();

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    setProgress(((current / total) * 100).toFixed(0));
  }, [current, total]);

  useEffect(() => {
    setInitialProgress(circumference - (progress / 100) * circumference);
  }, [circumference, progress]);

  useEffect(() => {
    const additionalProgressToSet =
      current + add <= total ? ((current + add) / total) * 100 : 100;
    setAdditionalProgress(additionalProgressToSet);
  }, [add, current, total]);

  useEffect(() => {
    setInitialAdditionalProgress(
      circumference - (additionalProgress / 100) * circumference
    );
  }, [additionalProgress, circumference]);

  return (
    <div css={progressRingContainer}>
      <div css={progressRingText(radius)}>
        <h2>{`${progress} %`}</h2>
        <p>{text}</p>
      </div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          css={[circleStyle, lowerIndex]}
          stroke={colors.veryLightGray}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          css={[circleStyle, lowIndex]}
          stroke={
            additionalProgress >= 100 ? colors.greenButton : colors.hoverOrange
          }
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={initialAdditionalProgress}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          css={circleStyle}
          stroke={
            additionalProgress >= 100 ? colors.greenButton : colors.progressBar
          }
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={initialProgress}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
}

ProgressRing.propTypes = {
  radius: PropTypes.string,
  stroke: PropTypes.string,
  text: PropTypes.string,
  add: PropTypes.number,
  current: PropTypes.number,
  total: PropTypes.number,
};

ProgressRing.defaultProps = {
  radius: '',
  stroke: '',
  add: 0,
  current: 0,
  total: 0,
  text: '',
};
