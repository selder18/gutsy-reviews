import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsList from './components/ReviewsList.jsx';
import Axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      reviews: []
    }
  }

  getReviews() {
    Axios.get(`/query/${this.state.id}`)
      .then((data) => {
        this.setState({
          reviews: data.data
        })
      })
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <div>
        <ReviewsList reviews={this.state.reviews} />
      </div>
    )
  }
}



ReactDOM.render(<Reviews />, document.getElementById('reviews'));

export default Reviews