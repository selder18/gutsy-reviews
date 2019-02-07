import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsList from './components/ReviewsList.jsx';
import Axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        Hello
        <div>
          <ReviewsList reviews={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    )
  }
}



ReactDOM.render(<Reviews />, document.getElementById('reviews'));

export default Reviews