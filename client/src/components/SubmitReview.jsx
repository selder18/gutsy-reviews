import React, { useState } from 'react';
import Axios from 'axios';
import StarsRating from 'react-star-ratings'
import faker from 'faker';
import moment from 'moment';
import { submit } from '../../style.js';
import '@babel/polyfill';

const SubmitReview = (props) => {
  const [rating, setRating] = useState(0),

    insertUser = async (body) => {
      let result = await Axios.post('/query', body);
      return result.data;
    },

    makeUsersBody = (name) => (
      {
        table: 'users',
        payload: {
          name,
          avatar: faker.image.avatar()
        }
      }
    ),

    getPosterID = async (name) => {
      let result = await Axios.get(`/query/user/${name}`);
      if (result.data.length) { //if the user exists, return the id
        return result.data[0].id;
      } else { //else if user doesn't exist, make the user
        let body = makeUsersBody(name); //make the body to submit in the POST request
        let test = await insertUser(body); //and then return the id of the inserted user
        return test[0].id;
      }
    },

    makeReviewBody = (name, review, date, stars) => {
      return {
        table: 'reviews',
        payload: {
          adventure_id: props.adventure_id,
          poster_id: name,
          review_text: review,
          timestamp: date,
          stars: stars
        }
      };
    },

    resetReviewFields = () => {
      document.getElementById('submitText').value = '';
      document.getElementById('submitUsername').value = '';
      props.getReviews()
      setRating(0);
    },



    postReview = async () => {
      const review = document.getElementById('submitText').value, //grab review text
        username = document.getElementById('submitUsername').value, //grab username
        name = await getPosterID(username), //get id of user/make new user (see above function)
        stars = rating, //grab stars
        date = moment().format(), //find current date
        body = makeReviewBody(name, review, date, stars); //makes the body for submitting reviews
      Axios.post('/query', body)
        .then(() => {
          resetReviewFields();
        })
        .catch((err) => { throw err });
    },

    submitReview = (e) => {
      e.preventDefault();
      postReview();
    };

  return (
    <div style={submit.main}>
      <form id="submitReview">
        <input id="submitUsername" type="text" name="username" placeholder="Username" style={submit.username} />
        &nbsp;&nbsp;
        <StarsRating name="reviewStars" rating={rating} starRatedColor={"#ffa534"} starHoverColor={"#ffa534"} starEmptyColor={'grey'} changeRating={setRating.bind(this)} starDimension={'15px'} starSpacing={'0px'} />
        <br />
        <textarea id="submitText" placeholder="Write your review of this Gutsy adventure here!" style={submit.text} />
        &nbsp;
        <input type="Submit" defaultValue="Submit" style={submit.button} onClick={(e) => {
          submitReview(e);
        }} />
        <br />
      </form>
    </div>
  );

}

export default SubmitReview;