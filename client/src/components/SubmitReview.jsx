// @flow 
import React, { useState }  from 'react';
import Axios from 'axios';
import StarsRating from 'react-star-ratings'
import faker from 'faker';
import moment from 'moment';
import { submit } from '../../style.js';
import '@babel/polyfill';

const SubmitReview = (props: Object) => {
  const [rating: number, setRating: Function] = useState(0),

    insertUser = async (body: Object): Promise<any>  => {
      let result: Object = await Axios.post('/query', body);
      return result.data[0].id;
    },

    makeUsersBody = (name: string): Object => (
      {
        table: 'users',
        payload: {
          name,
          avatar: faker.image.avatar()
        }
      }
    ),

    getPosterID = async (name: string): Promise<any> => {
      let results: Object = await Axios.get(`/query/user/${name}`);
      if (results.data.length) { //if the user exists, return the id
        return results.data[0].id;
      } else { //else if user doesn't exist, make the user
        let body: Object = makeUsersBody(name); //make the body to submit in the POST request
        let userID: Promise<mixed> = await insertUser(body); //and then return the id of the inserted user
        return userID;
      }
    },

    makeReviewBody = (name: number, review: string, date: string, stars: number): Object => (
      {
        table: 'reviews',
        payload: {
          adventure_id: props.adventure_id,
          poster_id: name,
          review_text: review,
          timestamp: date,
          stars: stars
        }
      }
    ),

    resetReviewFields = (): void => {
      (document.getElementById('submitText'): any).value = '';
      (document.getElementById('submitUsername'): any).value = '';
      props.getReviews()
      setRating(0);
    },



    postReview = async (): Promise<any> => {
      const review: string = (document.getElementById('submitText'): any).value, //grab review text
        username: string = (document.getElementById('submitUsername'): any).value, //grab username
        name: number = await getPosterID(username), //get id of user/make new user (see above function)
        stars: number = rating, //grab stars
        date: string = moment().format(), //find current date
        body: Object = makeReviewBody(name, review, date, stars); //makes the body for submitting reviews
      Axios.post('/query', body)
        .then((): void => {
          resetReviewFields();
        })
        .catch((err: Error): void => { throw err });
    },

    submitReview = (e: Object) => {
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