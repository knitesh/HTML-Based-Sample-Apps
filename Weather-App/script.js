var weatherApp ={
  showError :function(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
  },
  APICode : "d26c119aa1ac414a7461545f9494efcc"
};


function getCurrrentLocation(degree,show){
  console.log(show)
 $("#location").html("");
    $("#loader").show();
                    if(degree === "fahrenite"){
                            degree = "imperial";
                        }
                        else
                        {
                            degree = "metric";
                        }

                   navigator.geolocation.getCurrentPosition(function (locationObj){   

                  //  console.log(locationObj.coords);  

                     var lon = locationObj.coords.longitude;
                     var lat = locationObj.coords.latitude;
                     
                    var latlng =lat + "," + lon;
                     var url ="http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng;
                     $.get(url).done(function(response){
                            var cityInfo =   response.results[2].formatted_address;

                            var tempUrl= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+
                                            "&APPID="+weatherApp.APICode+"&units="+degree;   


                      $.get(tempUrl).done(function(response){
                                            console.log(response);
                                            var weatherIcon = response.weather[0].icon,
                                            description = response.weather[0].description, weatherMain =response.weather[0].main;

                                            console.log(weatherIcon,description,weatherMain);

                                            var imageURl = "http://openweathermap.org/img/w/"+weatherIcon+".png"
                                         
                                             $("#location").html("<img src ="+imageURl+"></img><h2>"+cityInfo+"</h2><h3> Current Temp :"+response.main.temp+" "+show+ 
                                                "</h3><h4> Min Temp: "+response.main.temp_min+" "+show+"</h4><h4> Max Temp: "+response.main.temp_max+" "+show+"</h4>");
                                          
                                        })
                                    .fail(function(err){
                                        console.log(err);
                                    })
                                    .always(function(){
                                         $("#loader").hide();
                                    });
                    });
                  
                },weatherApp.showError);
        
     }

     

$("#getCelcius").click(function(){
    getCurrrentLocation("celcius","°C");
});
$("#getFharenhite").click(function(){
    getCurrrentLocation("fahrenite","°F");
});

getCurrrentLocation("celcius","°C");





