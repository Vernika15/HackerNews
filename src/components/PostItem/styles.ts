import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from 'react-native';
import { colors } from '@theme';
import { scale, verticalScale } from '@utils';

export default StyleSheet.create({
  itemWrapper: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(2),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  itemTitle: {
    fontSize: verticalScale(14),
    lineHeight: verticalScale(18),
    fontWeight: '600',
    color: colors.black,
  } as TextStyle,
  itemText: {
    fontSize: verticalScale(13),
    lineHeight: verticalScale(18),
    color: colors.secondoty_text,
  } as TextStyle,
  backIcon: {
    height: scale(30),
    width: scale(30),
    tintColor: colors.white,
  } as ImageStyle,
  rightIcon: {
    height: scale(10),
    width: scale(10),
    tintColor: colors.black,
  } as ImageStyle,
  rightIconView: {
    flex: 0.1,
    alignSelf: 'center',
    alignItems: 'flex-end',
  } as ViewStyle,
});
