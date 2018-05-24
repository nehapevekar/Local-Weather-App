$(document).ready(function() {
  var city;
  var country;
  var lat;
  var lon;
  var url;
  var ctemp;
  var ftemp;
  var humidity;
  var wind;
  var pressure;
  var icon_src;
  var desc;
  var bool = true;
  // background changes  acc to weather ************
  
  let haze="http://d2ouvy59p0dg6k.cloudfront.net/img/haze_gradient_2_517049.jpg";
  let clouds="https://ak2.picdn.net/shutterstock/videos/10494092/thumb/10.jpg";
  let clear="https://goodstock.photos/wp-content/uploads/dead-tree-clear-blue-sky.jpg";
  let rain="https://wallpaper.wiki/wp-content/uploads/2017/06/Rain-drop-leaf-wallpaper-HD-download.jpg";
  let thunderstorm="https://www.sciencenewsforstudents.org/sites/default/files/main/articles/lightning_free.jpg";
  let defaultimg="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Heat_Lightning_-_100613.jpg/1200px-Heat_Lightning_-_100613.jpg";
 let drizzle="http://ak4.picdn.net/shutterstock/videos/8235424/thumb/1.jpg";
 let smoke="https://galeria.cdn.index.hu/nagykep/2015/04/22/over/8144510_5396f5b7c84409e9f97c0d8a60374dc2_y.jpg"; 

  //****************************
  
  getlocation();
  
  // function to get location of user **************************
  function getlocation() {
    console.log("getting location...");
    $.getJSON("https://freegeoip.net/json/", function(data) {
      console.log(data);
      lat = data.latitude;
      lon = data.longitude;
      city = data.city;
      country = data.country_name;
      console.log("append latitude and longitude to weather api.......");
      url =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        data.latitude +
        "&lon=" +
        data.longitude;
      console.log(url);

      $(".city").text(city + "," + country);
      $(".lat").html(lat);
      $(".lon").html(lon);

      getweather();
    });
  }
  //  function to get weather info based on location ************
  function getweather() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
          var wet = JSON.parse(xhr.responseText);
          console.log(wet);
          ctemp = wet.main.temp.toFixed(1);
          ftemp = (ctemp * 9 / 5 + 32).toFixed(1);
          humidity = wet.main.humidity;
          wind = (wet.wind.speed * 3.6).toFixed(2);
          pressure = wet.main.pressure;
          icon_src=wet.weather[0].icon;
          desc=wet.weather[0].main;
          
          console.log(desc);
          
          $(".deg").html(ctemp + " &#8451");
          $("#humidity").html(humidity + "%");
          $("#wind").html(wind + "km/h");
          $("#pressure").html(pressure + " &#x2193;" + "mb");
          $("#icn").attr("src",icon_src);
          $("#desc").html(desc);
          
          changebg(desc);
          
          
    };
    xhr.send();
  }
  //*******************************************************************
 function changebg(desc) {
   console.log("change background image to "+desc);
   
    switch(desc){
        case "Haze":
                      $("#showcase").css("background-image",'url('+haze+')');
                      $("#a1").attr("src",haze);
                     $(".card").css("background-color","rgba(76, 82, 44, 0.41)");   
                     break;
        case "Smoke":
                      $("#showcase").css("background-image",'url('+smoke+')');
                      $("#a1").attr("src",smoke);
                     $(".card").css("background-color","rgba(156, 135, 108, 0.12)");   
                     break;
       
       case 'Clear':
                       $("#showcase").css("background-image",'url('+clear+')');
                       $("#a1").attr("src",clear);
                       $(".card").css("background-color","rgba(63, 127, 40, 0.79)");   
                       break;
                       
      case  'Clouds':
                       $("#showcase").css("background-image",'url('+clouds+')');
                       $("#a1").attr("src",clouds);
                       $(".card").css("background-color","rgba(0, 0, 0, 0.45)");   
                       break;
                
      case 'Rain':     $("#showcase").css("background-image",'url('+rain+')');
                       $("#a1").attr("src",rain);
                       $(".card").css("background-color","rgba(3, 7, 1, 0.64)");   
                       break;
        
      case 'Thunderstorm':$("#showcase").css("background-image",'url('+thunderstorm+')');
                          $("#a1").attr("src",thunderstorm);
                          $(".card").css("background-color","rgba(0, 13, 71, 0.64)");   
                          break;
        
        case 'Drizzle':$("#showcase").css("background-image",'url('+drizzle+')');
                          $("#a1").attr("src",drizzle);
                          $(".card").css("background-color","rgba(61, 68, 87, 0.39)");   
                          break;

        
      default:        $("#showcase").css("background-image",'url('+defaultimg+')');
                       $("#a1").attr("src",defaultimg);
                       $(".card").css("background-color","rgba(0, 0, 0, 0.45)");   
                       break;         
   
               }
    
  }
  
  //toggle temperature **************
  
  $(".btn").click(function() {
    if (bool === true) {
                        $(".deg").html(ctemp + " &#8451");
                        bool = false;
                       } 
    else {
                $(".deg").html(ftemp + " &#8457;");
                bool = true;
         }
  });
  //****************************************
});