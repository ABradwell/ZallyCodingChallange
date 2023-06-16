  function generate_movie_cubes() {

    $('#movie_cubes').empty()      // Clear previous movie information cubes
    $('#all_btn').click();         // reset filter

    for (var i = 0; i < localStorage.length; i++){

        if (localStorage.key(i).trim() == "" || localStorage.key(i) == "undefined") { continue; }   // If an error cube is added by mistake

        var movieData = JSON.parse(localStorage.getItem(localStorage.key(i)));  // Get stored information
        
        // Generate information cube through JQuery object creation
        var newCubeElement = $('<div class="me-5 border border-dark border-1 movie mb-4" style="width:225px; height:350px; overflow:hidden">');
        newCubeElement.append('<div class=" w-100"  style="background-color:rgb(159,207,120)"> <span class="movie_title">' + movieData.Title + '</span></div>');
        newCubeElement.append('<div class="img_wrapper">');
        newCubeElement.append('    <img class="mx-auto d-block bg-secondary mt-1" src="' + movieData.Poster + '" style="min-width:100px; max-width:75px">');
        newCubeElement.append('</div>');

        var starDiv = $('<div class="start_counter mt-2 text-center" style="font-size:25px"></div>');
        starDiv.append('&#10029;'.repeat(Math.round(movieData.imdbRating/2)));
        starDiv.append('&#10025;'.repeat((5-Math.round(movieData.imdbRating/2))));
        newCubeElement.append(starDiv);

        newCubeElement.append('<b class="ms-1">Year:</b> <span class="year">' + movieData.Year + '</span><br>');
        newCubeElement.append('<b class="ms-1">Genre:</b> <span class="genre">' + movieData.Genre + '</span><br>');
        newCubeElement.append('<b class="ms-1">Director:</b> <span class="director">' + movieData.Director + '</span><br>');
        newCubeElement.append('<b class="ms-1">Plot:</b> <span class="plot">' + movieData.Plot + '</span><br>');
        newCubeElement.append('<span class="imdbID d-none">' + movieData.imdbID + '</span>');
        newCubeElement.append('</div>');

        $('#movie_cubes').append(newCubeElement);
    }
}

function filter_by_genre(genre) {
    
    // All cubes are generated and the filter then hides ones which do not apply
    if (genre == "ALL") {
        $(".movie").removeClass("d-none");
    } else {
        // A filter has been selected. Hide all cubes and then reveal the ones which match a substring check on their genre attribute    
        $(".movie").addClass("d-none");
        var all_genre_spans = $(".genre");
        var matching_cubes = all_genre_spans.filter(v =>all_genre_spans[v].innerText.toLowerCase().includes(genre.toLowerCase()));
        $(matching_cubes).parent().removeClass("d-none");
    }
}

function show_popup_information(data) {

    // Update modal content and show user information
    $("#modal_title").text(data.Title);
    $("#modal_image").attr("src", data.Poster);
    $("#modal_year").text(data.Year);
    $("#modal_genre").text(data.Genre);
    $("#modal_director").text(data.Director);
    $("#modal_actors").text(data.Actors);
    $("#modal_plot").text(data.Plot);
    $("#modal_star_div").empty().append('&#10029;'.repeat(Math.round(data.imdbRating/2))).append('&#10025;'.repeat((5-Math.round(data.imdbRating/2))));

    $('#information_modal').modal('toggle');


}

// Checks localStorage for movie and if it isn't found it calls the API
async function get_from_storage_or_fetch(id) {


    var localItem = localStorage.getItem(id); // Attempt to retrieve information
    if (localItem == null) {
        var apiURLVal = 'https://omdbapi.com/?i=' + id + '&apikey=9a518f8c'

        // 3 steps for API call
            // Get response
            // process into json object
            // Store into localStorage, display new movie, update movie cubes
        await fetch(apiURLVal)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem(id, JSON.stringify(data));
            generate_movie_cubes()
            show_popup_information(data)
        })
        .catch((err) => {
            console.log(err)
        });
    } else {
        // Display information to user
        show_popup_information(JSON.parse(localItem))
    }
}