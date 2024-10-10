import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useGetPostQuery} from '@api';
import styles from './styles';
import moment from 'moment';
import {strings} from '@constants';

interface PostItemProps {
  item: number;
  index: number;
  onPostItemPresses: (url: string) => void;
}

/**
 * Post item component for display post details
 */
export const PostItem = (props: PostItemProps) => {
  const {item, index, onPostItemPresses} = props;

  /** Load post item data */
  const {data: postDetails} = useGetPostQuery(item, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return postDetails ? (
    <TouchableOpacity
      onPress={() => onPostItemPresses(postDetails.url)}
      key={index}
      style={styles.itemWrapper}>
      <Text style={styles.itemTitle}>{postDetails.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.itemText}>{`${postDetails.score} ${
          postDetails.score > 1 ? strings.points : strings.point
        } ${strings.by}`}</Text>
        <Text style={styles.itemText}>{` ${postDetails.by} `}</Text>
        <Text style={styles.itemText}>{`| ${moment
          .unix(postDetails.time)
          .fromNow()}`}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};
