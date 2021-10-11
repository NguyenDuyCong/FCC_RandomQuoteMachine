const QUOTES_API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function App() {

  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(QUOTES_API);
      const data = await response.json();

      let quotes_data = data['quotes'];

      setQuotes(quotes_data);
      let randIndex = Math.floor(Math.random() * quotes_data.length)
      let randQuote = quotes_data[randIndex];
      setRandomQuote(randQuote);
      // twitter quote
      document.getElementById('tweet-quote').setAttribute(
        'href',
        'https://twitter.com/intent/tweet?hashtag=quoutes&relate=freecodecamp&text=' + encodeURIComponent('"' + randQuote.quote + '" ' + randQuote.author)
      );
    }

    fetchData();
  }, [])


  const handleNewQuote = () => {
    let randIndex = Math.floor(Math.random() * quotes.length)
    let randQuote = quotes[randIndex];
    setRandomQuote(randQuote);

    document.getElementById('tweet-quote').setAttribute(
      'href',
      'https://twitter.com/intent/tweet?hashtag=quoutes&relate=freecodecamp&text=' + encodeURIComponent('"' + randQuote.quote + '" ' + randQuote.author)
    );

    // animation 
    $('.quote-text').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
    })

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
    })

    // change color
    var color = Math.floor(Math.random() * colors.length);
    console.log(color);
    $('html body').animate(
      {
        backgroundColor: colors[color],
        color: colors[color]
      },
      1000
    );

    $('.button').animate({
      backgroundColor: colors[color]
    }, 1000);

  }

  return (
    <div id="quote-box">
      <div className="quote-text">
        <i className="fa fa-quote-left"></i>
        <span id="text">{randomQuote.quote}</span>
        <i className="fa fa-quote-right"></i>
      </div>
      <div className="quote-author">
        - <span>{randomQuote.author}</span>
      </div>
      <div className="buttons">
        <a
          className="button"
          id="tweet-quote"
          title="Tweet this quote"
          target="_blank"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <button
          className="button"
          id="new-quote"
          onClick={handleNewQuote}
        >
          New Quote
        </button>
      </div>
      {/* {quotes.map((quote, i) => {
        return (
          <p key={i}>{quote.quote}</p>
        )
      })} */}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("root"))