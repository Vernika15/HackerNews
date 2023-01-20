import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {colors} from '@theme';
import {verticalScale} from '@utils';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  } as ViewStyle,
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  } as ViewStyle,
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  errorText: {
    fontSize: verticalScale(13),
    lineHeight: verticalScale(18),
    color: colors.secondoty_text,
  } as TextStyle,
});
