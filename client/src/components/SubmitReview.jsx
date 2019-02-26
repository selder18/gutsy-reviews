// @flow
import React, { useState } from 'react';
import Axios from 'axios';
import StarsRating from 'react-star-ratings';
import { submit } from '../../style';
import '@babel/polyfill';

const server =
  process.env.AXIOS_LOCATION ||
  'http://ec2-18-191-155-155.us-east-2.compute.amazonaws.com';

const SubmitReview = (props: Object) => {
  const [rating: number, setRating: Function] = useState(0);
  const insertUser = async (body: Object): Promise<any> => {
    const result: Object = await Axios.post(`${server}/query`, body);
    return result.data[0].id;
  };
  const getAvatar = async (): any => {
    const result: Object = await Axios.get('https://randomuser.me/api/');
    return result.data.results[0].picture.thumbnail;
  };
  const makeUsersBody = async (name: string): Object => {
    const avatar: any = await getAvatar();
    return {
      table: 'users',
      payload: {
        name,
        avatar
      }
    };
  };
  const getPosterID = async (name: string): Promise<any> => {
    const results: Object = await Axios.get(`${server}/query/user/${name}`);
    if (results.data.length) {
      // if the user exists, return the id
      return results.data[0].id;
    }
    // else if user doesn't exist, make the user
    const body: Object = await makeUsersBody(name); // make the body to submit in the POST request
    const userID: Promise<mixed> = await insertUser(body); // and then return the id of the inserted user
    return userID;
  };
  const makeReviewBody = (
    name: number,
    review: string,
    date: string,
    stars: number
  ): Object => ({
    table: 'reviews',
    payload: {
      adventure_id: props.adventure_id,
      poster_id: name,
      review_text: review,
      timestamp: date,
      stars
    }
  });
  const resetReviewFields = (): void => {
    (document.getElementById('submitText'): any).value = '';
    (document.getElementById('submitUsername'): any).value = '';
    props.getReviews();
    setRating(0);
  };
  const postReview = async (): Promise<any> => {
    const review: string = (document.getElementById('submitText'): any).value; // grab review text
    const username: string = (document.getElementById('submitUsername'): any)
      .value; // grab username
    const name: number = await getPosterID(username); // get id of user/make new user (see above function)
    const stars: number = rating; // grab stars
    const date: string = new Date().toISOString(); // find current date
    const body: Object = makeReviewBody(name, review, date, stars); // makes the body for submitting reviews
    Axios.post(`${server}/query`, body)
      .then(
        (): void => {
          resetReviewFields();
        }
      )
      .catch(
        (err: Error): void => {
          throw err;
        }
      );
  };
  const submitReview = (e: Object) => {
    e.preventDefault();
    postReview();
  };

  return (
    <div style={submit.main}>
      <form id="submitReview" style={submit.form}>
        <input
          id="submitUsername"
          type="text"
          name="username"
          placeholder="Username"
          style={submit.username}
        />
        &nbsp;&nbsp;
        <StarsRating
          name="reviewStars"
          rating={rating}
          starRatedColor="#ffa534"
          starHoverColor="#ffa534"
          starEmptyColor="grey"
          changeRating={setRating}
          starDimension="15px"
          starSpacing="0px"
        />
        <br />
        <textarea
          id="submitText"
          placeholder="Write your review of this Gutsy adventure here!"
          style={submit.text}
        />
        &nbsp;
        <input
          type="Submit"
          defaultValue="Submit"
          style={submit.button}
          onClick={e => {
            submitReview(e);
          }}
        />
        <br />
      </form>
    </div>
  );
};

export default SubmitReview;
