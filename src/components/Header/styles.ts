import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native';
import {colors} from '@theme';
import {scale, verticalScale} from '@utils';

export default StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  } as ViewStyle,
  leftRightWrapper: {
    width: scale(30),
  },
  headerTextWrapper: {
    flex: 1,
  },
  headerText: {
    fontSize: verticalScale(18),
    lineHeight: verticalScale(30),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  } as TextStyle,
  backIcon: {
    height: scale(30),
    width: scale(30),
    tintColor: colors.white,
  } as ImageStyle,
});
