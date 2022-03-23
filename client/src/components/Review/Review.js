import React from 'react';
import '../../App.css';
import { Container, Image } from 'react-bootstrap';
import StarRatings from 'react-star-ratings/build/star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { changeSingleDateToUserTimezone } from '../../utils/Utils';

export const Review = (props) => {
  const { editedReview } = useSelector((state) => state.review);

  const closeModal = () => {
    props.closeModal();
  };

  return (
    <div>
      <FontAwesomeIcon size='lg' icon={faArrowLeft} onClick={closeModal} />
      <Container fluid>
        <div className='review_container'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {editedReview.user?.name && (
              <div style={{ display: 'flex', flexShrink: '0' }}>
                <label style={{ fontSize: '33px', fontStyle: 'italic' }}>
                  by {editedReview.user?.name}
                </label>
              </div>
            )}
            <div style={{ display: 'flex', flex: '1' }}> </div>
            <div style={{ display: 'flex', flexShrink: '0' }}>
              <label style={{ fontSize: '23px' }}>
                {changeSingleDateToUserTimezone(editedReview?.createdAt)}
              </label>
            </div>
          </div>
          <h1>{editedReview.title}</h1>

          <div
            style={{
              paddingTop: '10px',
              paddingBottom: '20px',
            }}
          >
            <label className='review_category'>{editedReview.category}</label>
            <label className='review_tags'>{editedReview.tags}</label>
            <div className='review_rating_container'>
              <StarRatings
                rating={editedReview.authorScore}
                starRatedColor='#ffd700'
                numberOfStars={5}
                starDimension='30px'
                name='rating'
              />
            </div>
          </div>

          <div>
            <ReactQuill theme={null} readOnly={true} defaultValue={editedReview.text} />
          </div>

          {editedReview.images?.map((image, index) => (
            <div className='thumb' key={index}>
              <div className='thumbInner'>
                <Image src={image.imageLink} className='review_img' />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};