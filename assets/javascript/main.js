var local;
var weather = []
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var dayCor = []
var searchT
var movie;
var term;

function myFunction() {
    var d = new Date();
    var n = d.getDay();
    dayCor.push("Now")
    dayCor.push("Tomorrow")
    for (let h = 2; h < 5; h++) {
        var t = n + h
        if (t >= 7) {
            t = t - 7
            dayCor.push(days[t])
        }
        else {
            dayCor.push(days[t])
        }
    }
}

myFunction()
function printDom(stuff, mstuff) {
    $(stuff).html(mstuff)
}
function buttons() {
    $(".buttonSpace").html("")

    for (let j = 0; j < weather.length; j++) {

        $(".buttonSpace").append('<div class="col-sm-2 text-center" >' + dayCor[j] + ' <br><button type="button" class="m-3 btn btn-primary wthrBtn" value ="' + weather[j] + '">' + weather[j] + '</button></div>')
    }
    $(".searchSpace").html("")
    $(".searchSpace").append('<form id ="srchinput"><br><input type="text" id="zip" name="uname" required maxlength="5" placeholder="Enter a US zip code"> <input type="submit" class="m-3 btn btn-primary srchBtn" value="search" ></form>')


}

function apiCall(one, two) {
    // We then created an AJAX call
    weather = []
    term = one

    var qURL = {
        "weather": "https://api.openweathermap.org/data/2.5/forecast?zip=" + term + ",us&appid=72d410207aa89fc738de834c645b81d4",
        "giphy": "https://api.giphy.com/v1/gifs/search?api_key=0d9L9Qq1wy1xdOWprNPTeR5P8FAK4CUh&q=" + term + "&limit=10&lang=en",
        "zip": "https://api.zippopotam.us/us/" + term,
        "geo": "https://api.ipgeolocation.io/ipgeo?apiKey=dacd7d606fcd4609a50e99daa7bb3699"
    }
    queryURL = qURL[two]
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        if (two === "weather") {
            weather.push(response.list[0].weather[0].description)
            for (let i = 0; i < 4; i++) {
                var m = i * 8
                weather.push(response.list[m].weather[0].main)
            }
            buttons()
        }
        else if (two === "giphy") {
           
            $(".gifSpace").html("")
            for (let o = 0; o < 10; o++) {
                $(".gifSpace").append(' <div class="col-sm-3"><div class="container mb-3 "><div class="row"><img src="' + response.data[o].images.fixed_width_still.url + '" id = "photo' + o + '" value ="' + response.data[o].images.fixed_width.url + '"></div><div class="row"><a href="https://i.giphy.com/'+response.data[o].id+'.gif" class="my-3 btn btn-primary" download ="gif" class="mr-3">Download</a><h5 class ="mt-3 ml-3">Rating: '+response.data[o].rating +'</h5></div></div></div>' )
            }
        }
        else if (two === "zip") {
            if (response.country === "United States") {
                $(".gifSpace").html("")
                $(".header").html("<h1>GIFify your local weather</h1><h2>" + response.places[0]["place name"] + "</h2>")
                apiCall(local, "weather");
            }
        }
        else {
            local = response.zipcode
            apiCall(local, "zip")
        }
    })
}
apiCall("", "geo");
$(document).on("click", ".srchBtn", srch);
function srch() {
    event.preventDefault()
    local = $("#zip").val();
    apiCall(local, "zip");
}
$(document).on("click", ".wthrBtn", gip);
function gip() {
    searchT = $(this).attr('value')
    if (/\s/.test(searchT)) {
        searchT = searchT.replace(' ', '+');
    }
    apiCall(searchT, "giphy")
}

$(document).on("click", "img", theImage);
function theImage() {
    var val = $(this).attr('value')
    var clas = $(this).attr('id')
    var ur = $(this).attr('src')
    $("#" + clas).attr('src', val)
    $("#" + clas).attr('value', ur)
}