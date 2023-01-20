import React, {FC, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@navigators';
import {useAppDispatch, useAppSelector} from '@hooks';
import {
  fetchPostDetails,
  fetchPostIds,
  PostDetailsType,
  resetPostDetails,
} from '@store/slices';
import {useState} from 'react';
import {Header, PostItem} from '@components';
import {strings} from '@constants';
import {colors} from '@theme';
import styles from './styles';

// Number of post per page
const POST_PER_PAGE = 15;

/**
 * Dashboard screen
 * Display post list
 */
export const Dashboard: FC<
  NativeStackScreenProps<RootParamList, 'dashboard'>
> = ({navigation}) => {
  // Redux hooks to dispach and retrive data
  const dispatch = useAppDispatch();
  const {postIdList, postDetails} = useAppSelector(state => state.posts);

  // Post details states..
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingFirstPage, setIsFetchingFirstPage] = useState(false);

  useEffect(() => {
    getPostIds();
  }, []);

  useEffect(() => {
    loadFirstPage();
  }, [postIdList.length]);

  /** Get post id list for server */
  const getPostIds = async () => {
    await dispatch(fetchPostIds());
  };

  /** Load first page of posts */
  const loadFirstPage = () => {
    setIsLastPage(false);
    setCurrentPage(1);
    dispatch(resetPostDetails());
    loadPostDetails(1);
  };

  /** Load next page on scroll to end */
  const onLoadMoreProducts = () => {
    if (!isLastPage) {
      const page = currentPage;
      const nextPage = page + 1;
      setIsFetching(true);
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
    page_number: number,
  ) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  /** Load posts for current  */
  const loadPostDetails = async (page: number) => {
    // Handle fetching indicator
    if (page == 1) setIsFetchingFirstPage(true);
    else setIsFetching(true);

    // Paginate post id list and get number of items defined in POST_PER_PAGE
    const paginatedProductDetails = paginate(postIdList, POST_PER_PAGE, page);
    if (paginatedProductDetails.length < POST_PER_PAGE) {
      setIsLastPage(true);
    }

    // Fetch post details for paginated ids
    const newPeoductDetails = paginatedProductDetails.map(element => {
      return dispatch(fetchPostDetails(element));
    });

    // Handle fetching indicator
    Promise.all(newPeoductDetails).then(() => {
      setIsFetching(false);
      setIsFetchingFirstPage(false);
    });
  };

  /** Render post item */
  const renderPostItem = ({
    item,
    index,
  }: {
    item: PostDetailsType;
    index: number;
  }) => (
    <PostItem item={item} index={index} onPostItemPresses={onPostItemPresses} />
  );

  /** Render message for empty list */
  const renderEmptyPostItem = () => (
    <View style={styles.errorWrapper}>
      <Text style={styles.secondoryText}>{strings.noPostFound}</Text>
    </View>
  );

  /** Render loading indicator in center */
  const renderActivityIndicator = () => (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  );

  /** Render loading indicator in bottom for pagination */
  const renderLoadMore = () => (
    <View style={styles.loadMoreWrapper}>
      <Text style={styles.secondoryText}>{strings.loadingPost}</Text>
      <ActivityIndicator size={'small'} color={colors.black} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Header />
        {postDetails && postDetails.length > 0 ? (
          <FlatList
            data={postDetails}
            keyExtractor={item => item.id.toString()}
            extraData={postDetails}
            contentContainerStyle={styles.postDetailsContainer}
            renderItem={renderPostItem}
            refreshing={isFetchingFirstPage}
            onRefresh={loadFirstPage}
            onEndReached={onLoadMoreProducts}
            onEndReachedThreshold={0.01}
          />
        ) : isFetchingFirstPage ? (
          renderActivityIndicator()
        ) : (
          renderEmptyPostItem()
        )}
        {isFetching && renderLoadMore()}
      </View>
    </SafeAreaView>
  );
};
