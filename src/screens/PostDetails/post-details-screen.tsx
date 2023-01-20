import React, {FC} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@navigators';
import {Header} from '@components';
import {strings} from '@constants';
import styles from './styles';

/**
 * Post details screen to render website
 */
export const PostDetails: FC<
  NativeStackScreenProps<RootParamList, 'postDetails'>
> = ({route}) => {
  // Access navigation route params
  const {postUrl} = route.params;

  /** Dispaly message for undefined url */
  const renderErrorView = () => (
    <View style={styles.errorWrapper}>
      <Text style={styles.errorText}>{strings.noWebsite}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Header isBack />
        {postUrl ? (
          <WebView source={{uri: postUrl}} startInLoadingState />
        ) : (
          renderErrorView()
        )}
      </View>
    </SafeAreaView>
  );
};
