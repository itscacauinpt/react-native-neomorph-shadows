import React from 'react';
import { Stop, Rect } from 'react-native-svg';

const CalculateSize = (style, parentSize) => {
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

  return Object.assign(style, newStyle);
};

export const calculateEaseOpacityRange = (shadowRadius, smallerSide, shadowOpacityRatio) => {
  let easeOpacityRange = [0, 0.02, 0.1, 0.26, 0.49, 0.75];

  if (shadowRadius * (shadowOpacityRatio - 1) >= smallerSide / 2) {
    if (smallerSide * 2 >= shadowRadius) {
      easeOpacityRange = easeOpacityRange.map(item => {
        let result = item + (1 - item) / ((smallerSide * 2) / shadowRadius);
        return result >= 1 ? 1 : result;
      });
    } else {
      easeOpacityRange = [1];
    };
  };

  return easeOpacityRange;
};

export const calculateShadowAndBorderRadius = (shadowRadius, shadowOpacityRatio, borderRadius, smallerSide, width, height, shadowOpacity, easeOpacityRange) => {
  let _shadowRadius = shadowRadius;
  let _borderRadius;

  if (_shadowRadius * (shadowOpacityRatio - 1) >= smallerSide / 2) {
    _shadowRadius = _shadowRadius && smallerSide / (2 * (shadowOpacityRatio - 1));
  };

  if (borderRadius >= smallerSide / 2) {
    _borderRadius = smallerSide / 2 - _shadowRadius * (shadowOpacityRatio - 1);
  } else {
    _borderRadius = borderRadius - _shadowRadius * (shadowOpacityRatio - 1);
  };

  if (_borderRadius < 0) {
    _borderRadius = 0;
  };

  const s_r = _shadowRadius * shadowOpacityRatio + _borderRadius;
  const s_w = width - (s_r - _shadowRadius) * 2;
  const s_h = height - (s_r - _shadowRadius) * 2;
  const s_o = shadowOpacity * 0.9;

  let edge = _borderRadius / s_r || 0;
  if (edge < 0) {
    edge = 0;
  };
  if (edge === 1) {
    edge = 0.999;
  };
  const step = (1 - edge) / easeOpacityRange.length;

  return { _shadowRadius, s_r, s_w, s_h, s_o, edge, step };
};

export const easeGradient = (key, easeOpacityRange, shadowColor, edge, step) => {
  return [...[0, ...easeOpacityRange, 1].map((rangeValue, i) =>
    <Stop
      offset={`${ i === 0 ? 0 : i === (easeOpacityRange.length + 1) ? 1 : (edge + step * (i - 1)) }`}
      stopColor={shadowColor}
      stopOpacity={`${rangeValue}`}
      key={key + i}
    />
  )];
};

export const radialShapes = (width, height, s_w, s_r, s_h) => {
  const coord_1 = width + s_w + s_r;
  const coord_3 = height + s_h + s_r;
  return [
    <Rect width={s_r} height={s_r} key={'radial_shape_0'} fill="url(#topLeft)" x={width} y={height}/>,
    <Rect width={s_r} height={s_r} key={'radial_shape_1'} fill="url(#topRight)" x={coord_1} y={height}/>,
    <Rect width={s_r} height={s_r} key={'radial_shape_2'} fill="url(#bottomLeft)" x={width} y={coord_3}/>,
    <Rect width={s_r} height={s_r} key={'radial_shape_3'} fill="url(#bottomRight)" x={coord_1} y={coord_3}/>,
  ];
};

export const rectShapes = (width, height, s_w, s_r, s_h) => {
  const wsr = width + s_r;
  const hsr = height + s_r;
  return [
    <Rect x={wsr} width={s_w} height={s_r} key={'rect_shape_0'} fill="url(#top)" y={height}/>,
    <Rect x={wsr} width={s_w} height={s_r} key={'rect_shape_1'} fill="url(#bottom)" y={hsr + s_h}/>,
    <Rect y={hsr} width={s_r} height={s_h} key={'rect_shape_2'} fill="url(#left)" x={width}/>,
    <Rect y={hsr} width={s_r} height={s_h} key={'rect_shape_3'} fill="url(#right)" x={wsr + s_w}/>,
  ];
};

export const rectShapesBack = (width, height, s_w, s_r, s_h, shadowColor, ) => {
  const sr2 = s_r * 2;
  const shsr2 = s_h + sr2;
  const swsr2 = s_w + sr2;
  return [
    <Rect key={'rect_shape_back_3'} fill={shadowColor} width={width * 2 + swsr2} height={height} x={0} y={height + shsr2}/>,
    <Rect key={'rect_shape_back_0'} fill={shadowColor} width={width * 2 + swsr2} height={height} x={0} y={0}/>,
    <Rect key={'rect_shape_back_1'} fill={shadowColor} width={width} height={shsr2} y={height} x={width + swsr2}/>,
    <Rect key={'rect_shape_back_2'} fill={shadowColor} width={width} height={shsr2} y={height} x={0}/>,
  ];
};

export default CalculateSize;
