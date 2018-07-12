import * as React from 'react';
import RedditParser from './RedditParser';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div>
        <RedditParser />
      </div>
    );
  }
}

export default App;
