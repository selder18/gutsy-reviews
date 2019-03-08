// @flow
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import SubmitReview from './components/SubmitReview';
import ReviewsList from './components/ReviewsList';
import { indexStyling } from '../style';

const server =
  'http://127.0.0.1:3000';
  // 'http://ec2-18-191-155-155.us-east-2.compute.amazonaws.com';

const Reviews = () => {
  const [
    currentAdventure: number,
    setCurrentAdventure: Function //eslint-disable-line
  ] = useState(10);
  const [reviews: Array<Object>, setReviews: Function] = useState([]);

const numberwang = Math.ceil(Math.random() * 1000000);
//   const getReviews = () => {
//     Axios.get(`${server}/query/reviews/${currentAdventure}`)
//       .then((result) => console.log(result, 'made it'))
//       .catch((err) => console.log(err))
//   };

  const getReviews = (): void => {
    Axios.get(`${server}/query/reviews/${numberwang}`)
      .then(
        (data: Object): void => {
          setReviews(data.data);
        }
      )
      .catch(
        (err: Error): void => {
          throw err;
        }
      );
  };

  useEffect(
    (): void => {
      window.addEventListener(
        'changeID',
        event => {
          setCurrentAdventure(event.detail[0]);
        },
        false
      );
    }
  );

  useEffect((): void => {
    getReviews();
  }, [currentAdventure]); // only want to update if the id changes, else we invoke getReviews manually

  return (
    <div style={indexStyling}>
      <SubmitReview adventure_id={currentAdventure} getReviews={getReviews} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};
ReactDOM.render(<Reviews />, (document.getElementById('reviews'): any));

export default Reviews;
