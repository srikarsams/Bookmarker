
// EL for submit button
document.querySelector('.button').addEventListener('click', addBookmark);

function addBookmark(e) {
    var name = document.getElementById('name').value;
    var url = document.getElementById('url').value;
    var res = true;
    // Creating object using the input data
    var bookmark = {
        name: name,
        url: url
    }
    
    if(!validateForm(name, url)){
        return false;
    }
    // Adding the object to the local storage
    if (localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.forEach(function(x){
            if(x.url === bookmark.url){
                alert('Bookmark already exists. Here is the name of the bookmark: ' + x.name);
                res = false;
            }
        })
        if(!res){
            fetchBookmarks();
            bookmark = '';
            return false;
        }
        if (bookmark){
            bookmarks.push(bookmark);
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear the form inputs
    document.getElementById('name').value = '';
    document.getElementById('url').value = '';
    //Fetching the bookmarks
    fetchBookmarks();
    e.preventDefault();
}


//Fetching bookmarks and adding it to the UI

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(!bookmarks){
        return false;
    }
    var time=300;
    var html = '';
    document.querySelector('.sites').innerHTML = '';
    bookmarks.forEach(function(x) {
        time += 200
        html = '<div class="site"   ><h2>'+ x.name +'</h2><a href="' + x.url +'" class="visit act" target="_blank">Visit</a><a href="#" onclick="deleteBookmark(\''+x.url+'\')" class="delete act">Delete</a></div>';
        document.querySelector('.sites').innerHTML += html;
    })
     
}

function deleteBookmark(url) {
    // fetch bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.forEach(function(x, i){
        if (x.url === url){
            bookmarks.splice(i,1);
        }
    })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function validateForm(name, url) {
    //Check if the form is filled
    if (!name || !url) {
        alert('Please fill up the form');
        return false;
    }

    //Check if the entered url is in valid format

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!url.match(regex)) {
        alert('Please enter valid URL');
        return false;
    }
    return true;
}

// Searching for bookmarks



var searchQuery = document.getElementById('search');
var searchLabel = document.querySelector('.searchlabel');
// Reading the search query
var query = searchQuery.value.toUpperCase();
searchQuery.addEventListener('click', function() {
    if (query){
        searchLabel.classList.add('hide');
    }else{
        searchLabel.classList.remove('hide');
    }
    
})

searchQuery.addEventListener('keyup',function (){
    query = searchQuery.value.toUpperCase()
    console.log(query);
    // Get all the saved bookmarks
    var list = document.querySelectorAll('.site');
    console.log(list)
    // Loop over the bookmarks and display the relevant bookmarks
    for(var i=0;i<list.length;i++){
        var queries = list[i].getElementsByTagName('h2')[0];
        console.log(queries.innerHTML)
        if(queries.innerHTML.toUpperCase().indexOf(query) > -1){
            list[i].classList.remove('hide');
        }else{
            list[i].classList.add('hide');
        }
    }
})
