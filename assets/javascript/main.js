var local = "28202"
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
    console.log(dayCor)
}

myFunction()
function printDom(stuff, mstuff) {
    $(stuff).html(mstuff)
}
function buttons() {
    $(".buttonSpace").html("")

    for (let j = 0; j < weather.length; j++) {

        $(".buttonSpace").append('<div class="col-sm-2 text-center" >' + dayCor[j] + ' <br><button type="button" class="m-3 btn btn-primary wthrbtn" value ="' + weather[j] + '">' + weather[j] + '</button></div>')
    }
    $(".searchSpace").html("")
    $(".searchSpace").append('<br><input type="text" id="zip" name="uname" required maxlength="5" placeholder="Enter a US zip code"> <button type="button" class="m-3 btn btn-primary srchBtn" >Search</button>')
    $(".srchBtn").on("click", function () {
        local = $("#zip").val();
        apiCall(local, "zip");
    })
    $("button").on("click", function () {
        searchT = $(this).attr('value')
        console.log(searchT)
        if (/\s/.test(searchT)) {
            searchT = searchT.replace(' ', '+');
        }
        apiCall(searchT, "giphy")
    })
}

function apiCall(one, two) {
    // We then created an AJAX call
    weather = []
    term = one

    var qURL = {
        "weather": "https://api.openweathermap.org/data/2.5/forecast?zip=" + term + ",us&appid=72d410207aa89fc738de834c645b81d4",
        "giphy": "https://api.giphy.com/v1/gifs/search?api_key=0d9L9Qq1wy1xdOWprNPTeR5P8FAK4CUh&q=" + term + "&limit=10&lang=en",
        "zip": "http://api.zippopotam.us/us/" + term
    }
    queryURL = qURL[two]
    console.log(queryURL)
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
            console.log(weather)
        }
        else if (two === "giphy") {
            $(".gifSpace").html("")
            for (let o = 0; o < 10; o++) {
                $(".gifSpace").append('<img src="' + response.data[o].images.fixed_width_still.url + '" id = "photo' + o + '" class = "m-2" value ="' + response.data[o].images.fixed_width.url + '">')
            }
            $("img").on("click", function () {
                var val = $(this).attr('value')
                var clas = $(this).attr('id')
                var ur = $(this).attr('src')
                $("#" + clas).attr('src', val)
                $("#" + clas).attr('value', ur)
            })
        }
        else {
            if (response.country === "United States") {
                $(".gifSpace").html("")
                $(".header").html("<h1>GIFify your local weather</h1><h2>" + response.places[0]["place name"] + "</h2>")


                apiCall(local, "weather");
            }
            else {

                alert("Not a valid zip code")
            }
        }
    })
}
apiCall(local, "zip");


