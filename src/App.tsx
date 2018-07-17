import * as React from 'react';
import './App.css';
import RedditParser from './RedditParser';

class App extends React.Component {
  public render() {
    return (
      <div>
        <img src="http://onlinebusinessrealm.com/wp-content/uploads/2018/02/Reddit-300x300.png" alt="reddit"/>
        <h1>Reddit Parser</h1>
        <RedditParser />
      </div>
    );
  }
}

export default App;
