// @flow

import React from 'react';
import ReviewItem from './ReviewItem';
import { list } from '../../style';

const ReviewsList = ({ reviews }: { reviews: Array<Object> }) => {
  const reviewsOrdered: Array<Object> = reviews.reverse(); // reversing the array so newest is shown first
  return (
    <div style={list.outer}>
      <div style={list.inner}>
        {reviewsOrdered.map(review => (
          <div key={review.id}>
            <ReviewItem review={review} />
            &nbsp;
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
