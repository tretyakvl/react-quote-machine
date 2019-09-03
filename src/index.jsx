'use strict'
class QuoteBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      author: '',
      twitUrl: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    setBgColor()
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        this.setState({
          text: data.content,
          author: data.author,
          twitUrl: getTwitUrl(`"${data.content}" -${data.author}`)
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
          <TweetQuote href={this.state.twitUrl} />
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
      <a href={this.props.href} target='_blank' rel='noopener noreferrer'>
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

function setBgColor () {
  const COLORS = '#fc7a57, #69b578, #f0a202, #2e5339'.split(', ')
  const prevColor = getComputedStyle(document.documentElement).getPropertyValue('--main')
  let newColor = getRandomElement(COLORS)

  while (prevColor === newColor) newColor = getRandomElement(COLORS)

  document.documentElement.style.setProperty('--main', newColor)
}

function getRandomElement (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getTwitUrl (string) {
  const encodedString = encodeURIComponent(string)

  return `https://twitter.com/intent/tweet?text=${encodedString}&hashtags=quotes`
}
