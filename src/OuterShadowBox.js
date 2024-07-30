import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform} from 'react-native';
import OuterShadowSvg from './OuterShadowSvg';

export default class OuterShadowBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.useSvg = this.props.useSvg;
    this.state = {
      width: null,
      height: null,
    };
  }

  onLayout = e => {
    const data = e.nativeEvent.layout;
    this.setState({width: data.width, height: data.height});
  };

  renderNative() {
    const {
      shadowOffset = {width: 0, height: 0},
      ...otherStyles
    } = this.props.style;
    return (
      <View style={{shadowOffset: shadowOffset, ...otherStyles}}>
        {this.props.children}
      </View>
    );
  }

  renderSvg() {
    const {style, children} = this.props;
    const {
      width = this.state.width,
      height = this.state.height,
      shadowRadius = 0,
      shadowColor = 'black',
      shadowOpacity = 0,
      shadowOffset = {width: 0, height: 0},
      backgroundColor = 'transparent',
      borderRadius = 0,
      borderTopRightRadius = 0,
      borderTopLeftRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
      ...otherStyles
    } = style;

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...otherStyles,
          width: width,
          height: height,
          borderWidth: 0,
          flex: 0,
        }}
        onLayout={width && height ? null : this.onLayout}
        ref={ref => (this.shadowBox = ref)}>
        <OuterShadowSvg
          {...{
            width,
            height,
            borderRadius,
            shadowRadius,
            shadowOpacity,
            shadowColor,
            shadowOffset,
          }}
        />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            zIndex: 2,
            width,
            height,
            backgroundColor,
            borderRadius,
            borderTopRightRadius: borderTopRightRadius || borderRadius,
            borderTopLeftRadius: borderTopLeftRadius || borderRadius,
            borderBottomRightRadius: borderBottomRightRadius || borderRadius,
            borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
            position: 'absolute',
            top: 0,
            left: 0,
            ...otherStyles
          }}>
          {children}
        </View>
      </View>
    );
  }

  render() {
    if (this.useSvg || Platform.OS === 'android') {
      return this.renderSvg();
    } else {
      return this.renderNative();
    }
  }
}

OuterShadowBox.defaultProps = {
  useSvg: false,
  style: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'white',
  },
};
OuterShadowBox.propTypes = {
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
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderTopRightRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderTopLeftRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderBottomRightRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderBottomLeftRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    backgroundColor: PropTypes.string,
  }),
};
