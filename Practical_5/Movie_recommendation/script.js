// Initial movie array
let movies = [];


// Display movies on the webpage
function displayMovies() {
    const movieList = document.getElementById("movieList");

    movieList.innerHTML = "";

    movies.forEach(function(movie, index) {

        movieList.innerHTML += `
            <div class="movie">
                <div>
                    <strong>${movie.name}</strong>
                    <p>${movie.year} | Rating: ${movie.rating}/10</p>
                </div>

                <input type="radio" name="selectedMovie" value="${index}">
            </div>
        `;
    });
}


// PUSH - Add movie at the end
function addMovie() {

    const name = document.getElementById("movieName").value;
    const rating = Number(document.getElementById("movieRating").value);
    const year = Number(document.getElementById("movieYear").value);

    if (name === "" || rating === 0 || year === 0) {
        alert("Please enter all movie details.");
        return;
    }

    movies.push({
        name: name,
        rating: rating,
        year: year
    });

    displayMovies();

    document.getElementById("movieName").value = "";
    document.getElementById("movieRating").value = "";
    document.getElementById("movieYear").value = "";
}


// POP - Remove last movie
function removeLast() {

    if (movies.length === 0) {
        alert("Watchlist is empty.");
        return;
    }

    const removedMovie = movies.pop();

    displayMovies();

    document.getElementById("result").innerHTML =
        `POP removed: <strong>${removedMovie.name}</strong>`;
}


// SHIFT - Remove first movie
function removeFirst() {

    if (movies.length === 0) {
        alert("Watchlist is empty.");
        return;
    }

    const removedMovie = movies.shift();

    displayMovies();

    document.getElementById("result").innerHTML =
        `SHIFT removed: <strong>${removedMovie.name}</strong>`;
}


// UNSHIFT - Add movie at beginning
function addFirst() {

    const name = prompt("Enter movie name:");

    if (name === null || name.trim() === "") {
        return;
    }

    const rating = Number(prompt("Enter rating (1-10):"));
    const year = Number(prompt("Enter release year:"));

    movies.unshift({
        name: name,
        rating: rating,
        year: year
    });

    displayMovies();

    document.getElementById("result").innerHTML =
        `UNSHIFT added <strong>${name}</strong> to the beginning.`;
}


// SPLICE - Remove selected movie
function removeMovie() {

    const selected = document.querySelector(
        'input[name="selectedMovie"]:checked'
    );

    if (!selected) {
        alert("Select a movie first.");
        return;
    }

    const index = Number(selected.value);

    const removedMovie = movies.splice(index, 1);

    displayMovies();

    document.getElementById("result").innerHTML =
        `SPLICE removed: <strong>${removedMovie[0].name}</strong>`;
}


// SLICE - Get first 3 movies
function showSlice() {

    const firstThree = movies.slice(0, 3);

    document.getElementById("result").innerHTML =
        `<strong>SLICE Result:</strong><br>
        ${firstThree.map(movie => movie.name).join("<br>")}`;
}


// MAP - Create array containing movie titles
function showMap() {

    const movieNames = movies.map(function(movie) {
        return movie.name;
    });

    document.getElementById("result").innerHTML =
        `<strong>MAP Result:</strong><br>
        ${movieNames.join("<br>")}`;
}


// FILTER - Find movies rated 8.5 or higher
function showFilter() {

    const highlyRated = movies.filter(function(movie) {
        return movie.rating >= 8.5;
    });

    document.getElementById("result").innerHTML =
        `<strong>FILTER Result:</strong><br>
        ${highlyRated.map(movie =>
            `${movie.name} - ${movie.rating}/10`
        ).join("<br>")}`;
}


// REDUCE - Calculate average rating
function showReduce() {

    if (movies.length === 0) {
        document.getElementById("result").innerHTML =
            "No movies available.";
        return;
    }

    const totalRating = movies.reduce(function(total, movie) {
        return total + movie.rating;
    }, 0);

    const average = totalRating / movies.length;

    document.getElementById("result").innerHTML =
        `<strong>REDUCE Result:</strong><br>
        Average Movie Rating: ${average.toFixed(2)}/10`;
}


// FOREACH - Display every movie
function showForEach() {

    let output = "<strong>forEach Result:</strong><br>";

    movies.forEach(function(movie, index) {

        output += `
            ${index + 1}. ${movie.name}
            (${movie.year}) - ${movie.rating}/10<br>
        `;
    });

    document.getElementById("result").innerHTML = output;
}


// Display initial array
displayMovies();