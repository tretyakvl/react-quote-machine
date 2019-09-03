'use strict'
class QuoteBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      author: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        this.setState({
          text: data.content,
          author: data.author
        })
      })
  }

  render () {
    if (!this.state.text) this.handleClick()

    return (
      <div id='quote-box'>
        <Text text={this.state.text} />
        <Author author={this.state.author} />
        <div className='container'>
          <TweetQuote />
          <NewQuote onClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

class Text extends React.Component {
  render () {
    return (
      <p id='text'>{this.props.text}</p>
    )
  }
}

class Author extends React.Component {
  render () {
    return (
      <p id='author'>{'- ' + this.props.author}</p>
    )
  }
}

class TweetQuote extends React.Component {
  render () {
    return (
      <a>
        <svg width='24' height='20'>
          <use xlinkHref='sprite.svg#twitter-icon' />
        </svg>
      </a>
    )
  }
}

class NewQuote extends React.Component {
  render () {
    return (
      <button onClick={this.props.onClick}>New quote</button>
    )
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
