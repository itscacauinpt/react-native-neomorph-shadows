import { ViewPropTypes } from 'react-native';
import { number, shape, string, node, bool } from 'prop-types';

export const ShadowBoxProps = {
  inner: false,
  useSvg: false
};

export const ShadowBoxTypes = {
  ...ViewPropTypes,
  inner: bool,
  useSvg: bool,
  children: node,
  style: shape({
    shadowColor: string,
    shadowOffset: shape({
      width: oneOfType([string, number]),
      height: oneOfType([string, number]),
    }),
    shadowOpacity: oneOfType([string, number]),
    shadowRadius: oneOfType([string, number]),
    width: oneOfType([string, number]).isRequired,
    height: oneOfType([string, number]).isRequired,
    borderRadius: oneOfType([string, number]),
    borderTopRightRadius: oneOfType([string, number]),
    borderTopLeftRadius: oneOfType([string, number]),
    borderBottomRightRadius: oneOfType([string, number]),
    borderBottomLeftRadius: oneOfType([string, number]),
    backgroundColor: string,
  }),
};

export const InnerShadowSvgTypes = {
  shadowColor: string.isRequired,
  shadowOffset: shape({
    width: number,
    height: number,
  }).isRequired,
  shadowOpacity: number.isRequired,
  shadowRadius: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  borderRadius: number.isRequired,
};

export const InnerShadowProps = {
  style: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    width: 0,
    height: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
};

export const InnerShadowTypes = {
  children: node,
  style: shape({
    shadowColor: string,
    shadowOffset: shape({
      width: oneOfType([string, number]),
      height: oneOfType([string, number]),
    }),
    shadowOpacity: oneOfType([string, number]),
    shadowRadius: oneOfType([string, number]),
    width: oneOfType([string, number]),
    height: oneOfType([string, number]),
    borderRadius: oneOfType([string, number]),
    backgroundColor: oneOfType([string, number]),
  }),
};


