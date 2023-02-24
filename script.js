const qoute = document.querySelector("#quote");
const author = document.querySelector("#author");
const newQuoteBtn = document.querySelector(".btn-new-quote");
const twitterBtn = document.querySelector(".btn-twit");
const loader = document.querySelector("#loader");
const container = document.querySelector(".container");
let data = [];

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

async function getQuote() {
  const config = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  loading();
  try {
    const response = await fetch(config);
    if (response.ok) {
      data = await response.json();
      const quoteData = data[Math.floor(Math.random() * 8261)];

      if (quoteData.text.length > 65) {
        quote.classList.add(".long-quote");
      } else {
        quote.classList.remove(".long-quote");
      }
      if (!quoteData.author) {
        author.textContent = "Unknown";
      } else {
        author.textContent = quoteData.author;
      }
      quote.textContent = quoteData.text;
      completedLoading();
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
}

completedLoading();

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;

  window.open(twitterUrl, "_blank");
}

function loading() {
  loader.hidden = false;
  container.hidden = true;
}

function completedLoading() {
  loader.hidden = true;
  container.hidden = false;
}
