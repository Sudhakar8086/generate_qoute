import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GlobalStyles = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  // background-color: #f0f0f0; /* Light gray background */
  margin: 0;
  padding: 0;
`;

const Container = styled.main`
  max-width: 600px;
  margin: 100px auto; /* Add spacing around the entire container */
  padding: 20px;
  background-color: #fff; /* White container background */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Box shadow for container */
`;

const Section = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #444; /* Dark gray border */
  border-radius: 8px;
  background-color: goldenrod; /* Light gray section background */
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333; /* Dark gray heading color */
`;

const Button = styled.button`
  background-color: #007bff; /* Blue button background */
  color: #fff; /* White button text color */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const QuoteText = styled.h3`
  font-size: 1.5rem;
  color: #333; /* Dark gray text color */
  margin-top: 20px;
`;

const Author = styled.i`
  font-size: 1.2rem;
  color: #9e2277; /* Light gray author color */
`;

function Quote({ text, author }) {
  return (
    <div>
      <QuoteText>
        <span>“</span>
        {text}
        <span>”</span>
      </QuoteText>
      <Author> - {author}</Author>
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
  }, []);

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function getNewQuote() {
    setQuote(getRandomQuote());
  }

  return (
    <GlobalStyles>
      <Container>
        <Heading>Quote of the Day</Heading>
        <Section>
          <Button onClick={getNewQuote}>New Quote</Button>
          {quote && <Quote text={quote.text} author={quote.author} />}
        </Section>
      </Container>
    </GlobalStyles>
  );
}
