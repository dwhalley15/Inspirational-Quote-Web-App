//All event listeners.

document.addEventListener("DOMContentLoaded", function(){
  getQuotes();
});

document.addEventListener("DOMContentLoaded", function() {
  date();
});

document.addEventListener("DOMContentLoaded", function() {
  randomQuote();
});

document.getElementById("quoteList").addEventListener('click', selectQuote);
document.getElementById("newQuoteBtn").addEventListener('click', addQuote);
document.getElementById("deleteQuoteBtn").addEventListener('click', removeQuote);
document.getElementById("updateQuoteBtn").addEventListener('click', saveQuotes);
document.getElementById("randomQuoteBtn").addEventListener('click', randomQuote);

//Function that adds todays date to the top header.

function date(){
  let date = new Date().toLocaleDateString();
  let header = document.getElementById('randomHeader');
  randomHeader.textContent = randomHeader.textContent + " " + date;
}

//Function that generates a random ID key.

function getRandomKey(){
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

//Function that sends a GET request to the api which triggers the python function get_json().
//Then populates the quote list with the response data.

function getQuotes(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      let quoteResponse = JSON.parse(this.responseText);
      let quoteList = "";
      for (let item of quoteResponse.quotes){
        quoteList = quoteList + "<li quote='" + String(item.quote) + "' author='" + String(item.author) + "' id='Quote " + quoteResponse.quotes.indexOf(item) + "'>" + String(item.quote) + " - " + String(item.author) + "</li>";
      }
      document.getElementById("quoteList").innerHTML = quoteList;
    }
    else if (this.readyState <= 3){
      console.log("Request on going");
    }
    else if (this.status >= 300 && this.status <= 500){
      alert("Error: Problem communicating with server.");
      error = "<li>" + "Error: no data retrieved!" + "</li>" + "<li>" + "Please check server files" + "</li>";
      document.getElementById("quoteList").innerHTML = error;
    }
  }
  xhttp.open("GET", "api/quotes", true);
  xhttp.send();
}

//Function to clear selected quote area.

function clearSelected(){
  document.getElementById("selectedId").value = "";
  document.getElementById("selectedQuote").value = "";
  document.getElementById("selectedAuthor").value = "";
}

//Function to populate the selected quote area with the selected quote from the list.

function selectQuote(element){
  clearSelected();
  let itemIndex = element.target.id;
  if (itemIndex == "quoteList"){
    clearSelected();
  }
  else{
    let quote = element.target.getAttribute("quote");
    let author = element.target.getAttribute("author");
    document.getElementById("selectedId").value = itemIndex;
    document.getElementById("selectedQuote").value = quote;
    document.getElementById("selectedAuthor").value = author;
  }
}

//Function to add new quotes to the current list.

function addQuote(){
  let id = getRandomKey();
  let newQuote = document.getElementById("newQuote").value;
  let newAuthor = document.getElementById("newAuthor").value;
  if (newQuote == "" || newAuthor == ""){
    alert("You must actually write something. Go on give it a go!");
  }
  else{
    let newItem = document.createElement('li');
    newItem.id = id;
    newItem.setAttribute("quote", newQuote);
    newItem.setAttribute("author", newAuthor);
    newItem.innerText = newQuote + " - " + newAuthor;
    document.getElementById("quoteList").appendChild(newItem);
    document.getElementById("newQuote").value = "";
    document.getElementById("newAuthor").value = "";
    alert("New quote added, click 'Update Quotes' to save!");
  }
}

//Function to delete existing quotes from the current list.

function removeQuote(){
  let id = document.getElementById("selectedId").value;
  if (id != ""){
    document.getElementById(id).remove();
    clearSelected();
    alert("Quote removed, click 'Update Quotes' to save!");
  }
  else{
    alert("No quote selected");
  }
}

//Function that sends a PUT request to the api which triggers the python function put_json(). Captures all the data currently in the quote list and sends it as an object.

function saveQuotes(){
  let quoteList = document.getElementById("quoteList");
  var quotesListItems = quoteList.getElementsByTagName("li");
  let jsonObject = {};
  jsonObject.quotes = [];
  for (let index = 0; index < quotesListItems.length; index++){
    let object = {};
    object.quote = quotesListItems[index].getAttribute("quote");
    object.author = quotesListItems[index].getAttribute("author");
    jsonObject.quotes.push(object);
  }
  let xhttp = new XMLHttpRequest();
  let url = "/api/quotes";
  xhttp.onreadystatechange = function(){
    let response = "Error: no response";
    if (this.readyState == 4 && this.status == 200){
      response = JSON.parse(this.responseText);
      alert(response.message);
    }
  }
  xhttp.open("PUT", url, true);
  var data = JSON.stringify(jsonObject);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(data);
}

//Function to get random quote. Sends a GET request to the server similar to getQuotes. Then picks one at random and posts it in the random quote area on the page. 
/*
function randomQuote(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      let quoteResponse = JSON.parse(this.responseText);
      var keys = Object.keys(quoteResponse.quotes);
      randomKey = quoteResponse.quotes[keys[keys.length * Math.random() << 0]];
      randomQuote = "<p quote='" + String(randomKey.quote) + "' author='" + String(randomKey.author) + "' id='Quote " + quoteResponse.quotes.indexOf(randomKey) + "'>" + String(randomKey.quote) + " - " + String(randomKey.author) + "</p>";
      document.getElementById("randomQuote").innerHTML = randomQuote;
    }
    else if (this.readyState <= 3){
      console.log("Request on going");
    }
    else if (this.status >= 300 && this.status <= 500){
      error = "<p>" + "Error: no data retrieved!" + "</p>";
      document.getElementById("randomQuote").innerHTML = error;
    }
  }
  xhttp.open("GET", "api/quotes", true);
  xhttp.send();
}
*/

//Function to get random quote. Sends a GET request to the server which triggers the python function get_random_quote(). Then puts the response in the ranodm quote area on the page.

function randomQuote(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      let quoteResponse = JSON.parse(this.responseText);
      randomQuote = "";
      randomQuote = "<p quote='" + String(quoteResponse.quote) + "' author='" + String(quoteResponse.author) + "' id='Quote " + "randomlyGeneratedQuote" + "'>" + String(quoteResponse.quote) + "</p>";
      document.getElementById("randomQuote").innerHTML = randomQuote;
    }
    else if (this.readyState <= 3){
      console.log("Request on going");
    }
    else if (this.status >= 300 && this.status <= 500){
      error = "<p>" + "Error: no data retrieved!" + "</p>";
      document.getElementById("randomQuote").innerHTML = error;
    }
  }
  xhttp.open("GET", "api/random", true);
  xhttp.send();
}