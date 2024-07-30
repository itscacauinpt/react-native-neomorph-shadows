import React from 'react';
import PropTypes from 'prop-types';
// import { InnerShadowSvgTypes } from './Types';
import Svg, { LinearGradient, RadialGradient, Defs } from 'react-native-svg';
import {
  rectShapes,
  easeGradient,
  radialShapes,
  rectShapesBack,
  calculateEaseOpacityRange,
  calculateShadowAndBorderRadius } from './utilities';

const InnerShadowSvg = ({
  borderRadius,
  shadowRadius,
  shadowOpacity,
  shadowColor,
  shadowOffset,
  width,
  height,
}) => {
  const smallerSide = width < height ? width : height;
  const shadowOpacityRatio = 4;

  const easeOpacityRange = calculateEaseOpacityRange(shadowRadius, smallerSide, shadowOpacityRatio);

  const {
    _shadowRadius, s_r, s_w, s_h, s_o, edge, step
  } = calculateShadowAndBorderRadius(shadowRadius, shadowOpacityRatio, borderRadius, smallerSide, width, height, shadowOpacity, easeOpacityRange);

  return (
    <Svg
      width={width * 2 + s_w + s_r * 2}
      height={height * 2 + s_h + s_r * 2}
      style={{
        top: -_shadowRadius + (Math.abs(shadowOffset.height) > height ? Math.sign(shadowOffset.height) * height : shadowOffset.height) - height,
        left: -_shadowRadius + (Math.abs(shadowOffset.width) > width ? Math.sign(shadowOffset.width) * width : shadowOffset.width) - width,
        position: 'absolute',
        zIndex: 2,
        opacity: s_o,
      }}>
      <Defs>
        <LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">{easeGradient('top', easeOpacityRange, shadowColor, edge, step)}</LinearGradient>
        <LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">{easeGradient('bottom', easeOpacityRange, shadowColor, edge, step)}</LinearGradient>
        <LinearGradient id="left" x1="100%" y1="0%" x2="0%" y2="0%">{easeGradient('left', easeOpacityRange, shadowColor, edge, step)}</LinearGradient>
        <LinearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%" >{easeGradient('right', easeOpacityRange, shadowColor, edge, step)}</LinearGradient>
        <RadialGradient id="topLeft" r="100%" cx="100%" cy="100%" fx="100%" fy="100%">{easeGradient('topLeft', easeOpacityRange, shadowColor, edge, step)}</RadialGradient>
        <RadialGradient id="topRight" r="100%" cx="0%" cy="100%" fx="0%" fy="100%">{easeGradient('topRight', easeOpacityRange, shadowColor, edge, step)}</RadialGradient>
        <RadialGradient id="bottomLeft" r="100%" cx="100%" cy="0%" fx="100%" fy="0%">{easeGradient('bottomLeft', easeOpacityRange, shadowColor, edge, step)}</RadialGradient>
        <RadialGradient id="bottomRight" r="100%" cx="0%" cy="0%" fx="0%" fy="0%">{easeGradient('bottomRight', easeOpacityRange, shadowColor, edge, step)}</RadialGradient>
      </Defs>
      {rectShapes(width, height, s_w, s_r, s_h)}
      {radialShapes(width, height, s_w, s_r)}
      {rectShapesBack(width, height, s_w, s_r, s_h, shadowColor)}
    </Svg>
  );
};

InnerShadowSvg.propTypes = {
  shadowColor: PropTypes.string.isRequired,
  shadowOffset: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  shadowOpacity: PropTypes.number.isRequired,
  shadowRadius: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  borderRadius: PropTypes.number.isRequired,
};

export default InnerShadowSvg;
