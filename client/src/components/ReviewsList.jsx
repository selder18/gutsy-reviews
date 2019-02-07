import React from 'react';
import ReviewItem from './ReviewItem.jsx';

export default (props) => {
  return (
    <div>
      {props.reviews.map((review, index) => (
        <ReviewItem key={`${index}`} review={review} />
      )
      )}
    </div>
  )
}

