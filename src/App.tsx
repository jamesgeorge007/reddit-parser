import * as React from 'react';
import './App.css';
import RedditParser from './RedditParser';

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Reddit Parser</h1>
        <RedditParser />
      </div>
    );
  }
}

export default App;
