// HTML Elements
let quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.querySelector(".quote-author #author");
const twitterBtn = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
let loader = document.getElementById("loader");

let apiQuotes = [];
console.log('Javascript Connected');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loader
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function newQuote() {
    // Pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author is available for quote
    if (quote.author === null || quote.author === '' || !quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        quoteText.textContent = quote.text;
    }

    // Check quote length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Assign value for author and quote
    authorText.textContent = quote.author;
}

// Get quote from API
async function getQuote() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        await fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                apiQuotes = data
            });
        newQuote();
        // Stop Loader
        complete();
    } catch (error) {
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Events
twitterBtn.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', newQuote);

// On Load
getQuote();
