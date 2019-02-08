import React from 'react';
import StarsRating from 'react-star-ratings';

const tableStyle = {
  width: '100%',
  display: 'inline-table'
}

const image = {
  borderRadius: '50%',
  width: '60px',
  height: '60px'
}

const user = {
  fontSize: '20px',
  color: '#023750'
}

const timestamp = {
  color: 'grey'
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
            <span style={user} >{review.username}</span>
            &nbsp;-&nbsp;
            <span style={timestamp}>{review.timestamp.slice(0, 10)}</span>
            &nbsp;&nbsp;&nbsp;
            <StarsRating name="reviewStars" rating={review.stars} starRatedColor={"#ffa534"} starEmptyColor={'grey'} starDimension={'15px'} starSpacing={'0px'} />
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
