import * as React from 'react';
// import * as request from 'superagent';

interface IPost{
  id: number,
  title: string,
  url: string,
};
interface IState{
  posts: IPost[],
  subreddit: string
};

class RedditParser extends React.Component<{}, IState>{
  private textInput: React.RefObject<HTMLInputElement>;
  constructor(props: {}){
    super(props);
    this.state = {posts:[], subreddit: ''};
    this.textInput = React.createRef();
    this.getPosts = this.getPosts.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  public componentWillMount(){
    this.getPosts();
  }

  public submitForm = (e: any) => {
    e.preventDefault();
    this.getPosts();
  }

  public handleClick = (e: any) => {
    e.preventDefault();
   // this.setState({subreddit: this.refs.textInput.value});
   this.setState({subreddit: e.target.value}); 
  }

  public getPosts = () => {
    /* request
    .get(`https://www.reddit.com/r/${this.state.subreddit}.json`)
    .then((res) => { 
      const posts = res.data.data.children.map((item: any) => item.data);
      this.setState(posts); 
    })
    .catch((err) => {
      // Handle error
    }); */
    fetch(`https://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(response => response.json())
      .then(json => {
        const posts = json.data.children.map((p: any) => p.data);
        this.setState({ posts });
});
  }
  public render(): JSX.Element{
    return (
      <div>
        <form onSubmit = {this.submitForm}>
        <input type="text" ref={this.textInput} onChange = {this.handleClick}/>
        <button type="submit">Submit</button>
        </form>
        <div>
        {this.state.posts.map(post => (
            <p key={post.id}>
              <a href={post.url}>{post.title}</a>
            </p>
))}
      </div>
      </div>
    );
  }
}

export default RedditParser;
