const { scale } = require('../style/scale');
const { fontSizes, colors } = require('./theme');

const clickable = scale({
  cursor: 'pointer'
});

const fullWidth = scale({
  width: '100%'
});

const marginRight = num =>
  scale({
    marginRight: num || '10px'
  });

const noMargin = scale({
  margin: 0
});

const marginAuto = scale({
  margin: 'auto'
});

const marginHorizontalAuto = scale({
  marginLeft: 'auto',
  marginRight: 'auto'
});

const marginAutoOnWide = scale({
  margin: [0, 0, 0, 'auto']
});

const fitHeight = scale({
  height: 'fit-content',
  MozAppearanceMinHeight: 'fit-content',
  WebkitAppearanceMinHeight: 'fit-content'
});

const fitWidth = scale({
  width: 'fit-content',
  MozAppearanceMinWidth: 'fit-content',
  WebkitAppearanceMinWidth: 'fit-content'
});

const minWidth = (min, width) =>
  scale({
    minWidth: min, //px
    width //px
  });

const minHeight = (min, width) =>
  scale({
    minHeight: min, //px
    width //px
  });

const marginTop = num =>
  scale({
    marginTop: num || '10px'
  });

const marginBottom = num =>
  scale({
    marginBottom: num || '10px'
  });

const maxWidth = max =>
  scale({
    maxWidth: max //px
  });

const hideOnMobile = scale({
  display: ['none', 'block']
});

const showOnMobile = scale({
  display: ['block', 'none']
});

const hideOnSmall = scale({
  display: ['none', 'none', 'block']
});

const showOnSmall = scale({
  display: ['block', 'block', 'none']
});

const hideOnMedium = scale({
  display: ['none', 'none', 'none', 'block']
});

const showOnMedium = scale({
  display: ['block', 'block', 'block', 'none']
});

const noStyle = scale({
  backgroundColor: 'transparent',
  width: '100%',
  cursor: 'pointer',
  border: 'none',
  padding: 0
});

const noStyleButton = scale({
  backgroundColor: 'transparent',
  color: 'rgba(0,0,0,0.6)',
  cursor: 'pointer',
  border: 'none',
  width: 'fit-content',
  transition: 'background-color 200ms ease-in-out',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  '&:focus': {
    backgroundColor: 'rgba(0,0,0,0.04)'
  }
});

const hover = scale({
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  '&:focus': {
    backgroundColor: 'rgba(0,0,0,0.04)'
  }
});

const opacity = opacity => ({
  opacity
});

const clickableX = scale({
  color: colors.highlightOrange,
  fontWeight: 'bold',
  fontSize: '24px',
  cursor: 'pointer'
});

const verticalBar = scale({
  position: 'relative',
  width: '3px',
  backgroundColor: 'rgba(0,0,0,0.08)',
  minHeight: '80px'
});

module.exports = {
  clickable,
  opacity,
  marginRight,
  fullWidth,
  fitHeight,
  fitWidth,
  marginAutoOnWide,
  minWidth,
  minHeight,
  maxWidth,
  noMargin,
  marginAuto,
  marginHorizontalAuto,
  noStyle,
  noStyleButton,
  marginTop,
  marginBottom,
  hideOnMobile,
  showOnMobile,
  hideOnSmall,
  showOnSmall,
  hideOnMedium,
  showOnMedium,
  hover,
  verticalBar,
  clickableX
};
