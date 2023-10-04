import { useState, useEffect } from "react";
import './styles.css'


function Quote({ text, author }) {
  return (
    <div>
      <h3>
        <span>“</span>
        {text}
        <span>”</span>
      </h3>
      <i> - {author}</i>
    </div>
  );
}


export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);


useEffect(() => {
  fetch("https://type.fit/api/quotes")
  .then((res) => res.json())
  .then((json) => {
    setQuotes(json);
    setQuote(json[0]);
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
  });
}, [])


function getRandomQoute(){
  return quotes[Math.floor(Math.random() * quotes.length)]
}


function getNewQuote(){
  setQuote(getRandomQoute())
}

return (
  <main>
    <h1>
      Quote of the Day
    </h1>
    <section>
      <button onClick={getNewQuote}>New Quote</button>
      {quote && <Quote text={quote.text} author={quote.author} />}
    </section>
  </main>
)
}



