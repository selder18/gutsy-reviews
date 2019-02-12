import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const outerDiv = {
  padding: "5px",
  // borderRadius: "15px",
  borderTop: "1px #242121 solid",
  boxShadow: "10px 10px grey;"
}

const innerDiv = {
  height: "700px",
  overflow: "auto"
}

export default (props) => {
  const reviews = props.reviews.reverse();
  return (
    <div style={outerDiv}>
      <div style={innerDiv}>
        {reviews.map((review, index) => (
          <div>
            <ReviewItem key={`reviewItem${index}`} review={review} />
            &nbsp;
            <br></br>
          </div>
        )
        )}
      </div>
    </div>
  )
}

