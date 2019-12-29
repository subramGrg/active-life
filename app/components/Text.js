/* libs */
import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

/* styles */
import { MEDIUM, DARK } from '@styles/colors';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'CircularStd-Book',
    fontSize: 17.5,
    color: MEDIUM
  },
  textBold: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 22,
    color: DARK
  }
});

const Text = ({ children, color, bold, style, textProps }) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[bold ? styles.textBold : styles.text, color && { color }, style]}
      {...textProps}
    >
      {children}
    </RNText>
  );
};

Text.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.number,
    PropTypes.string
  ]),
  color: PropTypes.string,
  extraStyles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  textProps: PropTypes.any
};

export default Text;
