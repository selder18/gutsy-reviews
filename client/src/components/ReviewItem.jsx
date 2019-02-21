// @flow

import React from 'react';
import StarsRating from 'react-star-ratings';
import { item } from '../../style';

const ReviewItem = ({ review }: { review: Object }) => {
  return (
    <table style={item.table}>
      <tbody>
        <tr style={item.userInfo}>
          <td rowSpan="2" style={item.imageContainer}>
            <img
              src={review.avatar}
              style={item.image}
              alt="The user's avatar"
            />
          </td>
          <td style={item.userInfo}>
            <span style={item.username}>{review.username}</span>
            &nbsp;-&nbsp;
            <span style={item.timestamp}>{review.timestamp.slice(0, 10)}</span>
            {/* The slice is to only get the date and not time */}
            &nbsp;&nbsp;&nbsp;
            <StarsRating
              name="reviewStars"
              rating={review.stars}
              starRatedColor="#ffa534"
              starEmptyColor="grey"
              starDimension="15px"
              starSpacing="0px"
            />
          </td>
        </tr>
        <tr>
          <td style={item.review}>{review.review_text}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReviewItem;
