import React from 'react';
import PropTypes from 'prop-types';
import InnerShadowBox from './InnerShadowBox';
import OuterShadowBox from './OuterShadowBox';

export default class ShadowBox extends React.PureComponent {
  calculateSize = (style, parentSize) => {
    const calculateValue = (styleValue, baseValue) => {
      if (typeof styleValue === "string" && styleValue.endsWith("%")) {
        // some atributtes are multiplied by the parentSize (width and height), so it can "fit" in the parent's container
        // and others, due to their values range being from 0 to 1, are multiplied by 1, the only change is the division by 100
        return (parseFloat(styleValue)/100 * baseValue);
      };
      return styleValue;
    };

    const newStyle = {
      width: calculateValue(style.width, parentSize.width),
      height: calculateValue(style.height, parentSize.height),
      shadowOffset: {
        width: calculateValue(style.shadowOffset.width, parentSize.width),
        height: calculateValue(style.shadowOffset.height, parentSize.height),
      },
      borderRadius: calculateValue(style.borderRadius, Math.min(parentSize.width, parentSize.height)),
      shadowRadius: calculateValue(style.shadowRadius, Math.min(parentSize.width, parentSize.height)),
      shadowOpacity: calculateValue(style.shadowOpacity, 1),
      opacity: calculateValue(style.opacity, 1)
    };

    return Object.assign(style, newStyle)
  };

  render() {
    const { children, baseStyle, parentSize, ...props } = this.props;
    const calculatedStyle = this.calculateSize(baseStyle, parentSize);
    
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
  inner: PropTypes.bool,
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
