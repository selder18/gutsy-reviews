import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import SubmitReview from './components/SubmitReview.jsx'
import ReviewsList from './components/ReviewsList.jsx';
import { indexStyling } from '../style.js';

const Reviews = (props: Object) => {
  const [id: number, setId: Function] = useState(props.id || 1),
    [reviews: Array<Object>, setReviews: Function] = useState([]);

  const getReviews = (): void => {
    Axios.get(`/query/reviews/${id}`)
      .then((data: Object): void => {
        setReviews(data.data);
      })
      .catch((err: Error): void => { throw err });
  };

  useEffect((): void => {
    getReviews();
  }, id); //only want to update if the id changes, else we invoke getReviews manually

  return (
    <div style={indexStyling}>
      <SubmitReview adventure_id={id} getReviews={getReviews.bind(this)} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};

ReactDOM.render(<Reviews />, document.getElementById('reviews'));

export default Reviews