const { scale } = require('../style/scale');
const { fonts, colors, fontSizes } = require('./theme');

const textContainer = scale({
  maxWidth: '650px',
});

const smallCaps = scale({
  fontSize: ['11.5px', '14px'],
  color: 'rgba(0,0,0,0.5)',
  textTransform: 'uppercase',
  letterSpacing: ['0.5px', '1px'],
  fontWeight: [600, 700],
  fontFamily: fonts.Sans,
  marginBottom: '5px',
});

const title = scale({
  fontSize: ['25px', '30px'],
  lineHeight: ['30px', '40px'],
  fontFamily: fonts.Publico,
  marginBottom: '10px',
  color: '#252729',
});

const titleDescription = scale({
  fontSize: ['17px', '18px'],
  lineHeight: ['22px', '24px'],
  marginBottom: '8px',
  color: 'rgba(0,0,0,0.6)',
  fontWeight: 700,
});

const header = scale({
  fontSize: ['23px', '30px', '30px', '35px'],
  lineHeight: ['30px', '35px', '35px', '45px'],
  fontFamily: fonts.Sans,
  marginBottom: '5px',
});

const capsHeader = scale({
  fontSize: ['15px', '18px', '18px', '18px'],
  lineHeight: ['18px', '20px', '20px', '20px'],
  letterSpacing: ['0px', '0px'],
  fontWeight: [600, 700],
  fontFamily: fonts.Sans,
  marginBottom: '3px',
});

const capsHeaderWithUnderline = scale({
  fontSize: ['17px', '20px', '20px', '20px'],
  lineHeight: ['15px', '15px', '15px', '15px'],
  fontWeight: [600, 700],
  fontFamily: fonts.Sans,
  marginBottom: '16px',
  borderBottom: '2px solid #e2e2e2',
  textIndent: '2px',
});

const thinHeader = scale({
  fontSize: ['23px', '30px', '30px', '35px'],
  lineHeight: ['30px', '35px', '35px', '45px'],
  fontFamily: fonts.Sans,
  fontWeight: 600,
  marginBottom: '5px',
});

const subHeader = scale({
  fontSize: ['20px', '25px'],
  lineHeight: ['25px', '30px', '30px', '30px'],
  margin: '30px 0px 10px 0px',
  fontFamily: fonts.Sans,
});

const smallHeader = scale({
  fontSize: ['18px', '20px', '20px', '20px'],
  lineHeight: ['22px', '25px', '25px', '25px'],
  marginBottom: '8px',
  fontFamily: fonts.Sans,
  fontWeight: 700,
});

const medium = scale({
  fontWeight: 500,
});

const semibold = scale({
  fontWeight: 600,
});

const uppercase = scale({
  textTransform: 'uppercase',
});

const paragraph = scale({
  fontFamily: fonts.Sans,
  fontSize: ['15px', '18px'],
  lineHeight: ['25px', '30px'],
  color: '#34393b',
  marginBottom: '10px',
  li: {
    marginBottom: '10px',
  },
});

const smallParagraph = scale({
  fontFamily: fonts.Sans,
  opacity: 0.9,
  color: '#333333',
  lineHeight: ['16pt', '18pt'],
  fontSize: ['11pt !important', '12pt !important'],
});

const boldSup = scale({
  color: '#2f6d5b',
  fontWeight: '800',
  margin: 0,
});

const footnote = scale({
  fontSize: ['13px', '15px'],
  lineHeight: '20px',
  color: '#4e565e',
  marginBottom: '10px',
});

const caption = scale({
  fontSize: ['12px', '14px'],
  lineHeight: '18px',
  color: '#566369',
  margin: '10px auto',
});

const tinyText = scale({
  fontSize: ['11px', '12px'],
  lineHeight: '14px',
  color: '#444444',
});

const orange = scale({
  color: colors.highlightOrange,
});

const green = scale({
  color: colors.greenButton,
});

const light = scale({
  opacity: 0.7,
});

const center = scale({
  textAlign: 'center',
});

const alignRight = scale({
  textAlign: 'right',
});

const alignLeft = scale({
  textAlign: 'left',
});

const noLineHeight = scale({
  lineHeight: 0,
});

const navLink = scale({
  marginLeft: '2px',
  marginRight: '2px',
  fontSize: '15px',
  padding: '4px 8px',
  borderRadius: '3px',
  fontWeight: 600,
});

const textColor = color => ({
  color,
});

const noStyleLink = {
  textDecoration: 'none',
  fontWeight: 400,
  borderBottom: 'none',
  lineHeight: 'inherit',
  '&:hover': {
    borderBottom: 'none',
    backgroundColor: 'transparent',
  },
};

const markdown = scale({
  fontFamily: fonts.Sans,
  fontWeight: 400,
  margin: 'auto',
  color: '#333333',
  h3: {
    marginTop: '30px',
  },
  img: {
    margin: '15px 0 15px 0',
    maxWidth: '100%',
    borderRadius: '2px',
    border: '1px solid #666666',
  },
  code: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    color: 'rgba(0,0,0,1)',
    borderRadius: '0.3em',
    padding: '2px 6px 4px',
    whiteSpace: 'nowrap',
  },
  li: {
    marginBottom: '10px !important',
    fontSize: ['15px', '18px'],
    lineHeight: ['25px', '30px'],
    color: '#34393b',
    position: 'relative',
  },
});

const highlight = color =>
  scale({
    backgroundColor: color || '#FFFF00',
    width: 'fit-content',
    padding: '0px 5px',
  });

const simpleListStyle = scale({
  li: {
    marginBottom: '10px !important',
    fontSize: `${fontSizes.bodyLarge} !important`,
    lineHeight: '20pt !important',
    position: 'relative',
  },
  a: {
    color: '#333333',
    textDecoration: 'underline',
    ':hover': {
      color: 'black',
    },
  },
});
module.exports = {
  textColor,
  textContainer,
  smallCaps,
  subHeader,
  footnote,
  smallHeader,
  title,
  titleDescription,
  header,
  thinHeader,
  capsHeader,
  capsHeaderWithUnderline,
  paragraph,
  smallParagraph,
  caption,
  light,
  orange,
  green,
  noLineHeight,
  center,
  boldSup,
  navLink,
  tinyText,
  alignRight,
  medium,
  semibold,
  uppercase,
  alignLeft,
  markdown,
  noStyleLink,
  highlight,
  simpleListStyle,
};
