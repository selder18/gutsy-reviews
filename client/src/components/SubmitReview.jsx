import React from 'react';
import Axios from 'axios';
import StarsRating from 'react-star-ratings'
import faker from 'faker';
import moment from 'moment';
import { submit } from '../../style.js';
import '@babel/polyfill';

class SubmitReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }
  }

  async insertUser(body) {
    let result = await Axios.post('/query', body);
    return result.data;
  }

  makeUsersBody(name) {
    return {
      table: 'users',
      payload: {
        name,
        avatar: faker.image.avatar()
      }
    };
  }

  async getPosterID(name) {
    let result = await Axios.get(`/query/user/${name}`);
    if (result.data.length) { //if the user exists, return the id
      return result.data[0].id;
    } else { //else if user doesn't exist, make the user
      let body = this.makeUsersBody(name); //make the body to submit in the POST request
      let test = await this.insertUser(body); //and then return the id of the inserted user
      return test[0].id;
    }
  }

  makeReviewBody(name, review, date, stars) {
    return {
      table: 'reviews',
      payload: {
        adventure_id: this.props.adventure_id,
        poster_id: name,
        review_text: review,
        timestamp: date,
        stars: stars
      }
    };
  }

  resetReviewFields() {
    document.getElementById('submitText').value = '';
    document.getElementById('submitUsername').value = '';
    this.props.getReviews()
    this.setState({
      rating: 0
    });
  }

  async postReview() {
    const review = document.getElementById('submitText').value, //grab review text
      username = document.getElementById('submitUsername').value, //grab username
      name = await this.getPosterID(username), //get id of user/make new user (see above function)
      stars = this.state.rating, //grab stars
      date = moment().format(), //find current date
      body = this.makeReviewBody(name, review, date, stars); //makes the body for submitting reviews
    Axios.post('/query', body)
      .then(() => {
        this.resetReviewFields();
      })
      .catch((err) => { throw err });
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating
    });
  }

  submitReview(e) {
    e.preventDefault();
    this.postReview();
  }

  render() {
    return (
      <div style={submit.main}>
        <form id="submitReview">
          <input id="submitUsername" type="text" name="username" placeholder="Username" style={submit.username} />
          &nbsp;&nbsp;
          <StarsRating name="reviewStars" rating={this.state.rating} starRatedColor={"#ffa534"} starHoverColor={"#ffa534"} starEmptyColor={'grey'} changeRating={this.changeRating.bind(this)} starDimension={'15px'} starSpacing={'0px'} />
          <br />
          <textarea id="submitText" placeholder="Write your review of this Gutsy adventure here!" style={submit.text} />
          &nbsp;
          <input type="Submit" defaultValue="Submit" style={submit.button} onClick={(e) => {
            this.submitReview(e);
          }} />
          <br />
        </form>
      </div>
    );
  }
}

export default SubmitReview;