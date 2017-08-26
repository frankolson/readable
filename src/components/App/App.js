// Vendor Assets
import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Project Assets
import CategoryContainer from '../../containers/CategoryContainer';
import CommentsContainer from '../../containers/CommentsContainer';
import Header from '../Header';
import HomeContainer from '../../containers/HomeContainer';
import PostContainer from '../../containers/PostContainer';
import PostFormContainer from '../../containers/PostFormContainer';
import './App.css';

const propTypes = {
  getCurrentPost: PropTypes.func.isRequired,
};

class App extends PureComponent {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />

        <div className="container container-small">
          <Route exact path="/" render={() => {
            return <HomeContainer />;
          }} />

          <Route path="/categories/:category" render={({ match }) => {
            return <CategoryContainer categoryPath={match.params.category} />;
          }} />

          <Route path="/posts/new" component={PostFormContainer} />

          <Route path="/posts/edit/:postId" render={({ match }) => {
              this.props.getCurrentPost(match.params.postId);
              return <PostFormContainer postId={match.params.postId} />
          }} />

          <Route path="/posts/show/:postId" render={({ match }) => (
            <div>
              <PostContainer postId={match.params.postId} />
            </div>
          )} />
        </div>

        <Route path="/posts/show/:postId" render={({ match }) => (
          <div>
            <CommentsContainer postId={match.params.postId} />
          </div>
        )} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
