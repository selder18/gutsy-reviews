// @flow

import React from 'react';
import ReviewItem from './ReviewItem';
import { list } from '../../style';

const ReviewsList = ({ reviews }: { reviews: Array<Object> }) => {
  const reviewsOrdered: Array<Object> = reviews.sort((a: Object, b: Object) =>
    b.timestamp < a.timestamp ? -1 : 1
  ); // sorting array by time
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
