import React from 'react';
import StarsRating from 'react-star-rating-component';

const tableStyle = {
  width: '100%',
  display: 'inline-table'
}

const image = {
  borderRadius: '50%',
  width: '60px',
  height: '60px'
}

export default ({ review }) => {
  return (
    <table style={tableStyle}>
      <tbody>
        <tr height="25px">
          <td rowSpan="2" width="75px">
            <img src={review.avatar} style={image} />
          </td>
          <td valign="center">
            <span>{review.username}</span>
            &nbsp;-&nbsp;
            <span>{review.timestamp}</span>
            &nbsp;&nbsp;&nbsp;
            <StarsRating value={review.stars} starColor={"#ffa534"} emptyStarColor={'grey'} editing={false} />
          </td>
        </tr>
        <tr>
          <td word-wrap="normal" colSpan="4">
            {review.review_text}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
