/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '@navigators';
import { useAppDispatch } from '@hooks';
import { apiSlice, useGetPostIDsQuery } from '@api';
import { useState } from 'react';
import { Header, PostItem } from '@components';
import { strings } from '@constants';
import styles from './styles';

// Number of post per page
const POST_PER_PAGE = 15;

/**
 * Dashboard screen
 * Display post list
 */
export const Dashboard: FC<
  NativeStackScreenProps<RootParamList, 'dashboard'>
> = ({ navigation }) => {
  // Redux hooks to dispach and retrive data
  const dispatch = useAppDispatch();

  // Load post id list
  const {
    data: postIdList = [],
    isLoading,
    refetch,
  } = useGetPostIDsQuery(undefined);

  // Post details states..
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [paginatedList, setPaginatedList] = useState<number[]>([]);

  useEffect(() => {
    loadFirstPage();
  }, [postIdList.length]);

  /** Handle pull to referesh post */
  const handlePullToRefresh = () => {
    dispatch(apiSlice.util.invalidateTags(['PostIds']));
    Promise.all([refetch()]).then(() => {
      loadFirstPage();
    });
  };

  /** Load first page of posts */
  const loadFirstPage = () => {
    setIsLastPage(false);
    setCurrentPage(1);
    loadPostDetails(1);
  };

  /** Load next page on scroll to end */
  const onLoadMoreProducts = () => {
    if (!isLastPage) {
      const page = currentPage;
      const nextPage = page + 1;
      loadPostDetails(nextPage);
      setCurrentPage(nextPage);
    }
  };

  /** Handle post item click */
  const onPostItemPresses = useCallback((postUrl: string) => {
    navigation.navigate('postDetails', {
      postUrl,
    });
  }, []);

  /** Paginate post id list array */
  const paginate = (
    array: number[],
    page_size: number,
    page_number: number
  ) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  /** Load posts for current  */
  const loadPostDetails = async (page: number) => {
    // Paginate post id list and get number of items defined in POST_PER_PAGE
    const paginatedProductDetails = paginate(postIdList, POST_PER_PAGE, page);
    if (paginatedProductDetails.length < POST_PER_PAGE) {
      setIsLastPage(true);
    }
    // Set paginated list
    setPaginatedList(currentValue => {
      if (page === 1) {
        return paginatedProductDetails;
      } else {
        return [...currentValue, ...paginatedProductDetails];
      }
    });
  };

  /** Render message for empty list */
  const renderEmptyPostItem = () => (
    <View style={styles.errorWrapper}>
      <Text style={styles.secondoryText}>{strings.noPostFound}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Header />
        <FlatList
          data={paginatedList}
          extraData={paginatedList || isLoading}
          contentContainerStyle={styles.postDetailsContainer}
          renderItem={({ item, index }: { item: number; index: number }) => (
            <PostItem
              item={item}
              index={index}
              onPostItemPresses={onPostItemPresses}
            />
          )}
          refreshing={isLoading}
          onRefresh={handlePullToRefresh}
          onEndReached={onLoadMoreProducts}
          onEndReachedThreshold={0.01}
          ListEmptyComponent={renderEmptyPostItem}
        />
      </View>
    </SafeAreaView>
  );
};
