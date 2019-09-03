'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuoteBox = function (_React$Component) {
  _inherits(QuoteBox, _React$Component);

  function QuoteBox(props) {
    _classCallCheck(this, QuoteBox);

    var _this = _possibleConstructorReturn(this, (QuoteBox.__proto__ || Object.getPrototypeOf(QuoteBox)).call(this, props));

    _this.state = {
      text: '',
      author: '',
      twitUrl: ''
    };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(QuoteBox, [{
    key: 'handleClick',
    value: function handleClick() {
      var _this2 = this;

      setBgColor();
      fetch('https://api.quotable.io/random').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          text: data.content,
          author: data.author,
          twitUrl: getTwitUrl('"' + data.content + '" -' + data.author)
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.text) this.handleClick();

      return React.createElement(
        'div',
        { id: 'quote-box' },
        React.createElement(Text, { text: this.state.text }),
        React.createElement(Author, { author: this.state.author }),
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(TweetQuote, { href: this.state.twitUrl }),
          React.createElement(NewQuote, { onClick: this.handleClick })
        )
      );
    }
  }]);

  return QuoteBox;
}(React.Component);

var Text = function (_React$Component2) {
  _inherits(Text, _React$Component2);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'p',
        { id: 'text' },
        this.props.text
      );
    }
  }]);

  return Text;
}(React.Component);

var Author = function (_React$Component3) {
  _inherits(Author, _React$Component3);

  function Author() {
    _classCallCheck(this, Author);

    return _possibleConstructorReturn(this, (Author.__proto__ || Object.getPrototypeOf(Author)).apply(this, arguments));
  }

  _createClass(Author, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'p',
        { id: 'author' },
        '- ' + this.props.author
      );
    }
  }]);

  return Author;
}(React.Component);

var TweetQuote = function (_React$Component4) {
  _inherits(TweetQuote, _React$Component4);

  function TweetQuote() {
    _classCallCheck(this, TweetQuote);

    return _possibleConstructorReturn(this, (TweetQuote.__proto__ || Object.getPrototypeOf(TweetQuote)).apply(this, arguments));
  }

  _createClass(TweetQuote, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'a',
        { id: 'tweet-quote', href: this.props.href, target: '_blank', rel: 'noopener noreferrer' },
        React.createElement(
          'svg',
          { width: '24', height: '20' },
          React.createElement('use', { xlinkHref: 'sprite.svg#twitter-icon' })
        )
      );
    }
  }]);

  return TweetQuote;
}(React.Component);

var NewQuote = function (_React$Component5) {
  _inherits(NewQuote, _React$Component5);

  function NewQuote() {
    _classCallCheck(this, NewQuote);

    return _possibleConstructorReturn(this, (NewQuote.__proto__ || Object.getPrototypeOf(NewQuote)).apply(this, arguments));
  }

  _createClass(NewQuote, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { id: 'new-quote', onClick: this.props.onClick },
        'New quote'
      );
    }
  }]);

  return NewQuote;
}(React.Component);

ReactDOM.render(React.createElement(QuoteBox, null), document.getElementById('root'));

function setBgColor() {
  var COLORS = '#fc7a57, #69b578, #f0a202, #2e5339'.split(', ');
  var prevColor = getComputedStyle(document.documentElement).getPropertyValue('--main');
  var newColor = getRandomElement(COLORS);

  while (prevColor === newColor) {
    newColor = getRandomElement(COLORS);
  }document.documentElement.style.setProperty('--main', newColor);
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTwitUrl(string) {
  var encodedString = encodeURIComponent(string);

  return 'https://twitter.com/intent/tweet?text=' + encodedString + '&hashtags=quotes';
}