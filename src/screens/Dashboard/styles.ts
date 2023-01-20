import {ViewStyle, StyleSheet} from 'react-native';
import {verticalScale} from '@utils';
import {colors} from '@theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  } as ViewStyle,
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  } as ViewStyle,
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  postDetailsContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 30,
  } as ViewStyle,
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  secondoryText: {
    fontSize: verticalScale(13),
    lineHeight: verticalScale(18),
    color: colors.secondoty_text,
  },
  loadMoreWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical: verticalScale(6),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
