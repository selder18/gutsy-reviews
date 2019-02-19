import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import { list } from '../../style.js';

export default (props: Object) => {
  const reviews: Array<Object> = props.reviews.reverse(); //reversing the array so newest is shown first
  return (
    <div style={list.outer}>
      <div style={list.inner}>
        {reviews.map((review, index) => (
          <div key={index}>
            <ReviewItem review={review} />
            &nbsp;
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

