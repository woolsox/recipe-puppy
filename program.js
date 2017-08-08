// var decs for base url and the submit input itself
let submitInput = document.getElementById('submit_button');
let proxyURL = 'http://recipepuppyproxy.herokuapp.com/api/?q=';

// an event listener to see when the search is input and appends
// the proxy url to add the search term
submitInput.addEventListener('click', function() {
    let searchInput = document.getElementById('search').value; 
    let searchURL = proxyURL + searchInput;
   
// fetch the appended url to search the keywords    
fetch(searchURL)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Error: ' + response.status);
                return;
            }
        
        // runs after the server returns a 200
        response.json().then(function(data) {
            
            //for loop iterating through the results of the data.
            for (let i = 0; i < data.results.length; i++) {
                let title = data.results[i].title;
                let href = data.results[i].href;
                let ingredients = data.results[i].ingredients;
                let thumbnail = data.results[i].thumbnail;
                let newContent = document.createElement('div');
                let contentWrap = document.getElementById('content_wrap');
                let searchContent = `
                <h3>${title}:</h3>
                <img src="${thumbnail}">
                <a href="${href}">Click here for recipe</a>
                <ul>
                    <h4>Ingredients:</h4>
                    <li>${ingredients}</li>
                </ul>
                `
                // adds all the content to the dynamic divs
                newContent.innerHTML = searchContent;
                newContent.setAttribute('class', 'content');
                contentWrap.appendChild(newContent);
                } 
            });    
        }    
    )
});

