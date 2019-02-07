import React from 'react';
import moment from 'moment';

const reviewStyle = {
  width: "100%",
  height: "200px",
  padding: '10px',
  resize: "none"
}

class SubmitReview extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <form>
          <input type="text" name="username" placeholder="Username"></input>
          <br></br>
          <textarea placeholder="Write your review of this Gutsy adventure here!" style={reviewStyle} /> &nbsp;
          <br></br>
          <input type="Submit" defaultValue="Submit"></input>
        </form>
      </div>
    )
  }
}

export default SubmitReview;