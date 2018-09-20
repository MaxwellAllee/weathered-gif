var location = "28202"
var APIKey =  "72d410207aa89fc738de834c645b81d4";
var weather = []
// Here we are building the URL we need to query the database
var queryURL = "api.openweathermap.org/data/2.5/forecast?zip="+location+",us"

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
 for (let i= 0; i< 5; i++) {
     weather.push(response.list[i].weather.main)
     
 }
 console.log(weather)
})