    function showResultPage()
    {

            document.body.innerHTML = 
            "<button id =\"reload\" onclick=\"location.reload();\"></button>\
            <canvas id=\"canvas\"></canvas>\
            <img class=\"logo\"src=\"images/logo.svg\">\
            <marquee class=\"marquee1\" behavior=\"scroll\" direction=\"left\" scrollamount=\"2\"><img class=\"cloud1\" src=\"images/cloud.svg\"></marquee>\
            <marquee class=\"marquee2\" behavior=\"scroll\" direction=\"left\" scrollamount=\"3\"><img class=\"cloud2\" src=\"images/cloud.svg\"></marquee>\
            <marquee class=\"marquee3\" behavior=\"scroll\" direction=\"right\" scrollamount=\"3\"><img class=\"cloud3\" src=\"images/cloud.svg\"></marquee>\
                <marquee class=\"marquee4\" behavior=\"scroll\" direction=\"right\" scrollamount=\"4\"><img class=\"cloud4\" src=\"images/cloud.svg\"></marquee>\
            <div class=\"temp-info\">\
            <div class=\"temp-symbol\">\
            <p id = \"date\" class=\"date\"></p>\
            <p id = \"location\" class=\"location\"></p>\
            <p id = \"temperature\" class=\"temp\"></p>\
            <p id = \"description\" class=\"weather-type\"></p>\
            </div>\
            </div>\
            <img class=\"sky-small-result\">\
            <img class=\"sky-big-result\">\
            <img class=\"mountains-result\">\
            <div class=\"block2\">\
            <img class=\"part\" src=\"images/wind-mill-part.svg\">\
            <img class=\"village\" src=\"images/houses-middle-norm.png\">\
            <div class=\"three-hour\">\
            <img class=\"shadow2\" src=\"images/shadow.png\">\
            <div id = \"Time1\" class=\"temp1\"></div>\
            <div id = \"Time2\" class=\"temp2\"></div>\
            <div id = \"Time3\" class=\"temp3\"></div>\
            <div id = \"Time4\" class=\"temp4\"></div>\
            <div id = \"Time5\" class=\"temp5\"></div>\
            <div id = \"Time6\" class=\"temp6\"></div>\
            <div id = \"Time7\" class=\"temp7\"></div>\
            <div id = \"Time8\" class=\"temp8\"></div>\
            <img class=\"shadow\" src=\"images/shadow.png\">\
            </div>\
            </div>";       
    }
function myFunction() {
    location.reload();
}
    
    function getIconName(weatherCode){

        var icon = "clear";

        if (weatherCode == 800){

            icon = "clear";
        }
        else if (weatherCode == 801 || weatherCode == 802){

            icon = "few-clouds";
        }
        else if (weatherCode == 803 || weatherCode == 804){
            icon = "clouds";
        }
        else if (weatherCode >= 300 && weatherCode < 600){
            icon = "rain";
        }
        else if(weatherCode < 300){

            icon = "thunder";
        }
        else if (weatherCode >= 600 && weatherCode < 700){
            icon = "snow";
        }
        else if (weatherCode >= 700 && weatherCode < 763){

            icon = "mist";
        }
        
        return icon;
    }
    
    function checkLocation()
    {
        var location = document.getElementById("fname").value;
        var errorMessage = "Please insert a city";
        var defaultMessage = "Search City";
        if (location == "" || location == errorMessage || location == defaultMessage )
        {
            document.getElementById("fname").value= errorMessage;
            return;
        }
            
        var tempUnit = document.getElementById("unit").value == "" ? "metric" : document.getElementById("unit").value;
        
        
        var currentWeatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + tempUnit +  "&APPID=1a5a1ec681e8fc70d6d9c21da587aa15";
        
        $.getJSON(currentWeatherQueryURL,function(json)
        {
            if (location.toLowerCase() == json.name.toLowerCase())
            {
                gettingJSON();
            }
            else
            {
                document.getElementById("fname").value= errorMessage;
            }
        });
    }
    
    function gettingJSON(){
        
        var location = document.getElementById("fname").value;
               //the array with all the radio buttons
        var tempUnit = document.getElementById("unit").value == "" ? "metric" : document.getElementById("unit").value;
        //checking the unit
        var currentWeatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + tempUnit +  "&APPID=1a5a1ec681e8fc70d6d9c21da587aa15";
        
        // ˚C and ˚F symbol — unicode
        
        var UnitSymbol = tempUnit == "metric" ? "\u00B0C" : "\u00B0F";
        
        // ˚C and ˚F symbol — unicode
        
        
//---------------------replace body with result page------------------------------------//
        
        
// month is listed from 0-11, number from system clock is taken and used to display it
        
        
        showResultPage();
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        var date = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
        document.getElementById("date").innerHTML = date;
        
        
// weather description and temp & changing background colour to weather type & rain and snow
        
        $.getJSON(currentWeatherQueryURL,function(json)
        {
            var weatherCode = json.weather[0].id;
            var Name = getIconName(weatherCode) + ".png";
            
            if(weatherCode >= 800 && weatherCode <= 802)
            {
                document.body.style.backgroundColor = "#FFF1C7";
            }
            else
            {
                document.body.style.backgroundColor = "#EFE1CE" ;
            }
            
            if (weatherCode >= 300 && weatherCode < 600)
            {
                DoRain();
                document.getElementsByClassName("marquee1")[0].style.visibility = "visible";
                document.getElementsByClassName("marquee2")[0].style.visibility = "visible";
            }
            if (weatherCode == 801 || weatherCode == 802){
                document.getElementsByClassName("marquee1")[0].style.visibility = "visible";
                document.getElementsByClassName("marquee2")[0].style.visibility = "visible";
            }
            else if(weatherCode == 803 || weatherCode == 804)
            {
                document.getElementsByClassName("marquee1")[0].style.visibility = "visible";
                document.getElementsByClassName("marquee2")[0].style.visibility = "visible";
                document.getElementsByClassName("marquee3")[0].style.visibility = "visible";
                document.getElementsByClassName("marquee4")[0].style.visibility = "visible";
            }
            else if (weatherCode >= 600 && weatherCode < 700){
                DoSnow();
            }
            
            // setting background images for weather conditions
            
            document.getElementsByClassName("sky-small-result")[0].src = "images/sky-small-" + Name;
            document.getElementsByClassName("sky-big-result")[0].src = "images/sky-" + Name;
            document.getElementsByClassName("mountains-result")[0].src = "images/mountains-" + Name;
            
            //setting the temperature and description. Also rounding the temperature value
            
            document.getElementById("temperature").innerHTML = Math.round(json.main.temp) + "<span>" + UnitSymbol + "</span>";
            
            document.getElementById("description").innerHTML = json.weather[0].description;
            
            document.getElementById("location").innerHTML = json.name + ", " + json.sys.country;
        });
        
        
//------------------- Three hour forecast ----------------------//
        
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=" + tempUnit +  "&APPID=1a5a1ec681e8fc70d6d9c21da587aa15",function(json){
            
            for (var i = 0; i < 8; i++)
            {  
                
                // setting am and pm for first 8 three-hour forecast
                
                var Time;
                
                if ( i < 3 )
                {
                    Time = ((i + 1) * 3) + "am";
                }
                else if ( i == 3)
                {
                    Time = "12pm";
                }
                else if ( i < 7 )
                {
                    Time = ((i -3) * 3) + "pm";
                }
                else
                {
                    Time = "12am";
                }
                
//--------------getting temperature and icon for three-hour forecast-------------//
                
                var Temperature = Math.round(json.list[i].main.temp);
                var WeatherId = json.list[i].weather[0].id;
                
                // getting icon
            
                var IconName = getIconName(WeatherId) + ".svg";
                var ImageHtml = "<img id = \"image" + i + "\" >";
                
                // writting html for first 8 of three-hour forecast, puts html into divs time1-8
                
                document.getElementById("Time" + (i+1)).innerHTML =                     
                    "<div class=\"time\">" + Time +"</div>\
                    <div class=\"hour-temp\">" + Temperature + UnitSymbol + "</div>\
                    <div class=\"weather-description\">" + ImageHtml + "</div>";
                
                document.getElementById("image" + i).src = "images/" + IconName;   
            }
        });
    }
    
    // -----------------------snow--------------------------------

//I have taken and modified the code for the snow from this website:

// http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect

// I have also modified this code to create the rain effect below.

function DoSnow(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H * 0.6;
	
	//snowflake particles
	var mp = 500; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random(), //x-coordinate
			y: Math.random() * H, //y-coordinate
			r: Math.random()*1.5, //radius
			d: Math.random()*mp //density
		});
	}
	
	//draw the flakes
	function draw()
	{
		
		ctx.fillStyle = "rgba(255, 255, 255, 1)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x * W, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
	}
	
	//Function to move the snowflakes

	var angle = 0;
	function update()
	{
        W = window.innerWidth;
	    H = window.innerHeight * 0.6;
	    canvas.width = W;
	    canvas.height = H;
		angle += 0.00;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];

			//random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += (Math.sin(angle) * 2) / W;
			
			//flakes back from the top when it exits
			if(p.x > 1.05 || p.x < -0.05 || p.y > H + 5)
			{
				particles[i] = {x: Math.random(), y: -10, r: p.r, d: p.d};
			}
		}
        
        draw();
	}
	
	//animation loop
	setInterval(update, 33);
}



//------------------------------------rain----------------------------------//



function DoRain(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H * 0.6;
	
	//rain particles
	var mp = 700; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random(), //x-coordinate
			y: Math.random() * H, //y-coordinate
			r: Math.random()*8.5, //radius
			d: Math.random()*mp //density
		})
	}
	
	//drawing rain
	function draw()
	{
		
		ctx.fillStyle = "rgba(000,000,000,1)";
		ctx.lineWidth = 0.2;
		for(var i = 0; i < mp; i++)
		{
            //draws each rain particle
            
			var p = particles[i];
            ctx.beginPath();
			ctx.moveTo(p.x * W, p.y);
			ctx.lineTo(p.x * W, p.y + p.r);
            ctx.stroke();
		}
		
	}
	
	//Function to move the rain drops
	var angle = 0;
	function update()
	{
        W = window.innerWidth;
	    H = window.innerHeight * 0.6;
	    canvas.width = W;
	    canvas.height = H;
		angle += 0.00;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			
			//random by adding in the radius and speed
			p.y += ((Math.cos(angle+p.d) + 2) * 5) + 4;
			
			//Sending rain back from the top when it exits
			if(p.x > 1.05 || p.x < -0.05 || p.y > H + 5)
			{
				particles[i] = {x: Math.random(), y: -10, r: p.r, d: p.d};
			}
		}
        
        draw();
	}
	
	//animation loop
	setInterval(update, 33);
}

  // -----------------------rain-------------------------------- 
    
