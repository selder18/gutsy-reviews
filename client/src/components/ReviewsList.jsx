import React from 'react';
import ReviewItem from './ReviewItem.jsx';

export default (props) => {
  const reviews = props.reviews.reverse();
  return (
    <div>
      {reviews.map((review, index) => (
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

