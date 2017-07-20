function search(){
	
	$(".results").html("");
	
	var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
	
	var input = document.getElementById("search").value;
	if (input == "")
		$(".results").html("<h3>Search box is empty. Type something and press Submit or try a random article.</h3>");
    //alert(input);
	
	$.ajax({ 
    	url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input + "&prop=info&inprop=url&utf8=&format=json",
 
   		dataType: "jsonp",
   		success: function(response) {
       		console.log(response.query);
       		if (response.query.searchinfo.totalhits === 0) {
         		$(".results").html("<h3>No results. Try searching for something else.</h3>");
       		}
       		else {
         		showResults(response);
       		}
  		},
   		error: function () {
    		alert("Error retrieving search results, please refresh the page");
   		}
 
 	});
                
}

// Organize and display the results
function showResults(result) {
	
	// Show first 10 results
	for (var i = 0; i < 10; i++) {

		// get info
		var title = result.query.search[i].title;
		var url = title.replace(/ /g, "_");
		var timestamp = result.query.search[i].timestamp;
		var snippet = result.query.search[i].snippet;
		
		// corrent formats
		url = "https://en.wikipedia.org/wiki/" + url;
		timestamp = new Date(timestamp);
		title = "<h3>" + title + "</h3>";
		snippet = "<p>" + snippet + "</p>";
		timestamp = "<p><small>" + timestamp + "</small></p>"
		
		// add it all into 1 variable
		var article = "<div class='single-result'><a href='" + url + "' target='_blank'>" + title + "<hr class='hr-wiki'>" + snippet + "...<br>" + timestamp + "</a></div>";
		
		// append to results div
		$(".results").append(article);
	}
}

/* Bonus because it's how I do things,
  run search() when search box is in focus and
  Enter key is pressed. */

$('#search').bind('keyup', function(e) {

    if ( e.keyCode === 13 ) { // 13 is enter key

        search();
    }
});