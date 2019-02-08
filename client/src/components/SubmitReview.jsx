import React from 'react';
import moment from 'moment';
import StarsRating from 'react-star-rating-component'
import Axios from 'axios';
import faker from 'faker';
import '@babel/polyfill';

const reviewStyle = {
  width: "100%",
  height: "200px",
  padding: '5px',
  resize: "none",
  borderRadius: "15px",
  border: "1px #bababa solid"
}

class SubmitReview extends React.Component {
  constructor(props) {
    super(props);
  }

  getStars() {
    const stars = document.getElementById('submitReview').getElementsByClassName('dv-star-rating-full-star');
    return stars.length;
  }

  async insertUser(body) {
    let result = await Axios.post('/query', body);
    return result.data;
  }

  async getPosterID(name) {
    let result = await Axios.get(`/query/user/${name}`);
    if (result.data.length) {
      return result.data[0].id;
    } else {
      let avatar = faker.image.avatar();
      let body = {
        table: 'users',
        payload: {
          name,
          avatar
        }
      };
      let test = await this.insertUser(body);
      return test[0].id;
    }
  }

  async postReview() {
    const review = document.getElementById('submitText').value,
      username = document.getElementById('submitUsername').value,
      name = await this.getPosterID(username),
      stars = this.getStars(),
      date = moment().format();
    const body = {
      table: 'reviews',
      payload: {
        adventure_id: this.props.adventure_id,
        poster_id: name,
        review_text: review,
        timestamp: date,
        stars: stars
      }
    };
    Axios.post('/query', body)
      .then(() => {
        document.getElementById('submitText').value = '';
        document.getElementById('submitUsername').value = '';
        this.props.getReviews()
      })
      .catch((err) => { throw err });
  }

  render() {
    return (
      <div>
        <form id="submitReview">
          <input id="submitUsername" type="text" name="username" placeholder="Username" style={{ paddingLeft: "5px" }}></input> &nbsp;
          <br></br>
          &nbsp;<StarsRating name="enterRating" starColor={"#ffa534"} emptyStarColor={'grey'} editing={true} />
          <br></br>
          <textarea id="submitText" placeholder="Write your review of this Gutsy adventure here!" style={reviewStyle} /> &nbsp;
          <input type="Submit" defaultValue="Submit" onClick={(e) => {
            e.preventDefault();
            this.postReview();
          }}></input>
          <br></br>
        </form>
      </div>
    )
  }
}

export default SubmitReview;