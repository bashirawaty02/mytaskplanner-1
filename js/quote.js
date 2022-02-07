let quoteEl = document.getElementById("quoteContent");
let authorEl = document.getElementById("quoteAuthor");
let btnEl = document.getElementById("quoteButton");

const url = "https://api.quotable.io/random";

let getQuote = () => {
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        quoteEl.innerText = item.content;
        authorEl.innerText = item.author;
      });
  };

getQuote();
btnEl.addEventListener("click", getQuote);
