// @flow
// $FlowIgnoreError
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import SubmitReview from './components/SubmitReview';
import ReviewsList from './components/ReviewsList';
import { indexStyling } from '../style';

const Reviews = ({ id }: { id: number }) => {
  const [currentAdventure: number] = useState(id || 1);
  const [reviews: Array<Object>, setReviews: Function] = useState([]);

  const getReviews = (): void => {
    Axios.get(`/query/reviews/${currentAdventure}`)
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
// $FlowIgnoreError
ReactDOM.render(<Reviews />, (document.getElementById('reviews'): any));

export default Reviews;
