import * as React from 'react';
// import * as request from 'superagent';

interface IPost{
  id: number,
  title: string,
  url: string,
};
interface IState{
  posts: IPost[],
  subreddit: string,
  error: string
};

class RedditParser extends React.Component<{}, IState>{
  private textInput: React.RefObject<HTMLInputElement>;
  private displayError: string;
  constructor(props: {}){
    super(props);
    this.state = {posts:[], subreddit: '', error: ''};
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
        this.displayError = 'none';
        const posts = json.data.children.map((p: any) => p.data);
        this.setState({ posts, error: ''});
    })
    .catch(err => {
      this.displayError = 'block';
      this.setState({error: 'Provide a valid subreddit name!', posts: []});
    })
  }
  public render(): JSX.Element{
    return (
      <div>
        <form onSubmit = {this.submitForm}>
        <input type="text" ref={this.textInput} onChange = {this.handleClick}/>
        <br />
        <button className="slide" type="submit">submit</button>
        </form>
        <p className='errors' style={{display: this.displayError}}>{this.state.error}</p>
        <div className="posts">
        {this.state.posts.map(post => (
            <p key={post.id}>
            <i className="fas fa-angle-double-right" />
              <a href={post.url} target="_blank">{post.title}</a>
            </p>
))}
      </div>
      </div>
    );
  }
}

export default RedditParser;
