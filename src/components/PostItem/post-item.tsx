import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PostDetailsType} from '@store/slices';
import styles from './styles';
import moment from 'moment';
import {strings} from '@constants';

interface PostItemProps {
  item: PostDetailsType;
  index: number;
  onPostItemPresses: (url: string) => void;
}

/**
 * Post item component for display post details
 */
export const PostItem = (props: PostItemProps) => {
  const {item, index, onPostItemPresses} = props;
  const navigation = useNavigation();
  var utcTime = new Date(item.time);
  return (
    <TouchableOpacity
      onPress={() => onPostItemPresses(item.url)}
      key={index}
      style={styles.itemWrapper}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.itemText}>{`${item.score} ${
          item.score > 1 ? strings.points : strings.point
        } ${strings.by}`}</Text>
        <Text style={styles.itemText}>{` ${item.by} `}</Text>
        <Text style={styles.itemText}>{`| ${moment
          .unix(item.time)
          .fromNow()}`}</Text>
      </View>
    </TouchableOpacity>
  );
};
