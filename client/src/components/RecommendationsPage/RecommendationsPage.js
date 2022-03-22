import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { setIsLoading } from '../../store/reducers/LoadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingComponent, ReviewShortened } from '../index.components';
import { getNewestReviews } from '../../api/store/ReviewStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setReviews } from '../../store/reducers/ReviewSlice';

export const RecommendationsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading.isLoading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [newestReviews, setNewestReviews] = useState([]);

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
      const resultNewestReviews = [...newestReviews, ...newestReviewsFromApi];
      console.log('result rev: ', resultNewestReviews);
      setNewestReviews(resultNewestReviews);
      dispatch(setReviews(resultNewestReviews));
      setRowSelectionRate((rowSelectionRate) => rowSelectionRate + 1);
    } else {
      setHasMoreReviews(false);
    }
  };

  return (
    <div className='recommendations_page_container'>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Container className='cont'>
          <Row>
            <Col> </Col>
            <Col sm={8}>
              <InfiniteScroll
                dataLength={newestReviews.length}
                next={fetchNewestReviews}
                hasMore={hasMoreReviews}
                loader={<LoadingComponent />}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {newestReviews.map((review, id) => (
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
