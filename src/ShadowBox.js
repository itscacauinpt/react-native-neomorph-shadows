import React from 'react';
import PropTypes from 'prop-types';
import CalculateSize from './utilities';
import InnerShadowBox from './InnerShadowBox';
import OuterShadowBox from './OuterShadowBox';
// import { ShadowBoxProps, ShadowBoxTypes } from './Types';

export default class ShadowBox extends React.PureComponent {
  render() {
    const { children, baseStyle, parentSize, ...props } = this.props;
    const calculatedStyle = CalculateSize(baseStyle, parentSize);
    
    return props.inner ? (
      <InnerShadowBox {...props} style={calculatedStyle}>{children}</InnerShadowBox>
    ) : (
      <OuterShadowBox {...props} style={calculatedStyle}>{children}</OuterShadowBox>
    );
  };
};

ShadowBox.defaultProps = {
  inner: false,
  useSvg: false
};
ShadowBox.propTypes = {
  inner: checkPropTypes.bool,
  useSvg: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape({
    shadowColor: PropTypes.string,
    shadowOffset: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    shadowOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shadowRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderTopRightRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderTopLeftRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderBottomRightRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderBottomLeftRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    backgroundColor: PropTypes.string,
  }),
};
// ShadowBox.defaultProps = ShadowBoxProps;
// ShadowBox.propTypes = ShadowBoxTypes;
