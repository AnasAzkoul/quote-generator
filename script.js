const quoteContainer = document.querySelector('#quote-container'); 
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author'); 
const twitterBtn = document.querySelector('#twitter'); 
const newQuoteBtn = document.querySelector('#new-quote'); 
const loader = document.querySelector('#loader'); 

// show loader 
function loading(){
    loader.hidden = false; 
    quoteContainer.hidden = true;
}

// hide loader 
function completeLoader(){
    loader.hidden = true; 
    quoteContainer.hidden = false; 
}

// Show New Quote
function newQuote(){
    loading(); 
    // generate a random index to show quotes randomly; 
    let rand = Math.floor(Math.random() * apiQuotes.length); 
    // show the quote from the array with the random index from above; 
    const quote = apiQuotes[rand]; 
    //   check whether the quote author is known 
    if(!quote.author){
        authorText.textContent = 'Unknown'; 
    } else {
        authorText.textContent = quote.author; 
    }
    // check if the quote text is long to determine the styling; 
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote'); 
    } else {
        quoteText.classList.remove('long-quote'); 
    }
    // set quote, hide loader 
    quoteText.textContent = quote.text; 
    completeLoader(); 
}

//Get quotes from API 
let apiQuotes = []; 

async function getQuotes(){
    loading(); 
    const apiUrl = 'https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json(); 
        newQuote(); 
    } catch (error) {
        // catch error here
    }
}

// send your as a tweet 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank'); 
}

// Event listeners 
newQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote); 

// onLoad 
getQuotes(); 
