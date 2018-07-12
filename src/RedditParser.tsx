import * as React from 'react';
import * as request from 'superagent';

interface defaultProps{
  props: string
};
interface defaultState{
  posts: <Array>string,
  subreddit: string
};

class RedditParser extends React.Component<defaultProps, defaultState>{
  constructor(props: any){
    super(props);
    this.state = {posts:[], subreddit: 'space'};
    this.textInput = React.createRef();
    this.getPosts = this.getPosts.bind(this);
  }
  public componentWillMount(){
    this.getPosts();
  }
  public getPosts(){
    request
    .get(`https://www.reddit.com/r/#{this.state.subreddit}.json`)
    .end((res, err) => {
      if(err) {
         // Handle error
      }
      const posts = res.data.data.children.map((item: any) => item.data);
      this.setState(posts);
    });
  }
  public render(){
    return (
      <div>
        <input type="text" ref={this.textInput}/>
        <ul>
          {this.state.posts.map((post) => {
          <li key={post.id}>{post.title}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default RedditParser;
