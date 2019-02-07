import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const reviewList = {
  display: 'inline-block',
  width: '900px'
}

export default (props) => {
  return (
    <div id="review-list" style={reviewList}>
      {props.reviews.map((review, index) => (
        <div>
          <ReviewItem key={`${index}`} review={review} />
          &nbsp;
          <br></br>
        </div>
      )
      )}
    </div>
  )
}

