import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '@navigators';
import { Header } from '@components';
import { strings } from '@constants';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';

/**
 * Post details screen to render website
 */
export const PostDetails: FC<
  NativeStackScreenProps<RootParamList, 'postDetails'>
> = ({ route }) => {
  // Access navigation route params
  const { postUrl } = route.params;
  const [hasError, setHasError] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // State to track internet connection

  /** Check for internet connectivity */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true); // Update connection state
    });

    return () => {
      unsubscribe(); // Clean up when component unmounts
    };
  }, []);

  /** Dispaly message for undefined url */
  const renderErrorView = () => (
    <View style={styles.errorWrapper}>
      <Text style={styles.errorText}>
        {!isConnected ? strings.noWebsite : strings.noInternet}
      </Text>
    </View>
  );

  /** Handle general WebView errors */
  const handleError = () => {
    setHasError(true);
  };

  /** Handle HTTP errors like 404 or 500 */
  const handleHttpError = (syntheticEvent: any) => {
    const { statusCode } = syntheticEvent.nativeEvent;
    // If the status code is in the 400 or 500 range, set error state
    if (statusCode >= 400) {
      setHasError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Header isBack />
        {postUrl && !hasError ? (
          <WebView
            source={{ uri: postUrl }}
            startInLoadingState
            mediaPlaybackRequiresUserAction={true} // disables autoplay for media elements like videos and audio
            onError={handleError} // Handling network errors
            onHttpError={handleHttpError} // Handling HTTP errors
          />
        ) : (
          renderErrorView()
        )}
      </View>
    </SafeAreaView>
  );
};
