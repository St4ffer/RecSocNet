import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { setIsLoading } from '../../store/reducers/LoadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  LoadingComponent,
  ReviewShortened,
  ToolsContainer,
} from '../../components/index.components';
import { getMostLikedReviews, getNewestReviews } from '../../api/store/ReviewStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setReviews } from '../../store/reducers/ReviewSlice';

export const RecommendationsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading.isLoading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [currentReviews, setCurrentReviews] = useState([]);
  const [infiniteScrollKey, setInfiniteScrollKey] = useState(0);
  const [fetchFunction, setFetchFunction] = useState('fetchNewestReviews');

  const [rowSelectionRate, setRowSelectionRate] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);

  useEffect(async () => {
    await fetchNewestReviews();
    dispatch(setIsLoading(false));
  }, []);

  const fetchNewestReviews = async () => {
    console.log('current user: ', currentUser);
    const newestReviewsFromApi = await getNewestReviews(10, rowSelectionRate * 10, currentUser.id);
    console.log('newest rev: ', newestReviewsFromApi);
    if (newestReviewsFromApi.length !== 0) {
      const resultNewestReviews = [...currentReviews, ...newestReviewsFromApi];
      console.log('result rev: ', resultNewestReviews);
      setCurrentReviews(resultNewestReviews);
      dispatch(setReviews(resultNewestReviews));
      setRowSelectionRate((rowSelectionRate) => rowSelectionRate + 1);
    } else {
      setHasMoreReviews(false);
    }
  };

  const fetchMostLikedReviews = async () => {
    console.log('rate: ', rowSelectionRate);
    const mostLikedReviewsFromApi = await getMostLikedReviews(
      10,
      rowSelectionRate * 10,
      currentUser.id
    );
    console.log('mostLikedReviewsFromApi rev: ', mostLikedReviewsFromApi);
    if (mostLikedReviewsFromApi.length !== 0) {
      const resultMostLikedReviews = [...currentReviews, ...mostLikedReviewsFromApi];
      console.log('result rev: ', resultMostLikedReviews);
      setCurrentReviews(resultMostLikedReviews);
      dispatch(setReviews(resultMostLikedReviews));
      setRowSelectionRate((rowSelectionRate) => rowSelectionRate + 1);
    } else {
      setHasMoreReviews(false);
    }
  };

  const refreshNewestReviews = async () => {
    dispatch(setIsLoading(true));
    setFetchFunction((fetchFunction) => 'fetchNewestReviews');
    setRowSelectionRate((rate) => 0);
    const newestReviewsFromApi = await getNewestReviews(10, 0, currentUser.id);
    setCurrentReviews(newestReviewsFromApi);
    dispatch(setReviews(newestReviewsFromApi));
    setInfiniteScrollKey(Math.random());
    dispatch(setIsLoading(false));
  };

  const refreshMostLikedReviews = async () => {
    dispatch(setIsLoading(true));
    setFetchFunction((fetchFunction) => 'fetchMostLikedReviews');
    setRowSelectionRate((rate) => 1);
    const mostLikedReviewsFromApi = await getMostLikedReviews(10, 0, currentUser.id);
    setCurrentReviews(mostLikedReviewsFromApi);
    dispatch(setReviews(mostLikedReviewsFromApi));
    setInfiniteScrollKey(Math.random());
    dispatch(setIsLoading(false));
  };

  const fetchReviews = () => {
    switch (fetchFunction) {
      case 'fetchNewestReviews':
        fetchNewestReviews();
        break;
      case 'fetchMostLikedReviews':
        fetchMostLikedReviews();
        break;
    }
  };

  return (
    <div className='recommendations_page_container'>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Container>
          <Row>
            <Col> </Col>
            <Col sm={8}>
              <ToolsContainer
                refreshNewestReviews={refreshNewestReviews}
                refreshMostLikedReviews={refreshMostLikedReviews}
              />
              <InfiniteScroll
                key={infiniteScrollKey}
                dataLength={currentReviews.length}
                next={fetchReviews}
                hasMore={hasMoreReviews}
                loader={<LoadingComponent />}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {currentReviews.map((review, id) => (
                  <div key={id} className='review_shortened_container'>
                    <ReviewShortened key={id} currentReview={review} reviewId={id} />
                  </div>
                ))}
              </InfiniteScroll>
            </Col>
            <Col> </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
