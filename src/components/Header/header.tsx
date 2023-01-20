import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {strings} from '@constants';
import {icons} from '@assets';
import styles from './styles';

interface HeaderProps {
  isBack?: boolean;
}

/**
 * Header component for app
 */
export const Header = (props: HeaderProps) => {
  const {isBack = false} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.leftRightWrapper}>
        {isBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.backArrow} style={styles.backIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText}>{strings.appName}</Text>
      </View>
      <View style={styles.leftRightWrapper}></View>
    </View>
  );
};
