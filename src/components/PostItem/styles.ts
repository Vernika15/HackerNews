import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native';
import {colors} from '@theme';
import {scale, verticalScale} from '@utils';

export default StyleSheet.create({
  itemWrapper: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(10),
    marginBottom: verticalScale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.primary80,
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
});
