"use strict";

let apiKeys = {};

let disWeather = (weather) => {
	return new Promise ((resolve, reject) => {
		$.ajax({
			method: 'GET',
			url: 'apiKeys.json'
		}).then((response) => {
			apiKeys = response;
			let auth = 'APPID=' + apiKeys.key;
		$.ajax({
			method: 'GET',
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${weather},us&units=imperial&${auth}`
		}).then((response2) =>{
			resolve(response2);
		}, (errorResponse) => {
			reject(errorResponse);
		});		
			}, (errorResponse2) => {
				console.log("errorResponse", errorResponse2);
			});
			
		});
};

$(document).ready(function() {
	console.log("jquery");
	disWeather(37216);

	$('#getWeatha').on('click', () => {
		$('#output').html("");
		let searchy = $('#weatherSearch').val();
		disWeather(searchy).then((weatherData) => {
			$('#output').append(`<h1>Temp : ${weatherData.main.temp}</h1>
				<h2>Humidity : ${weatherData.main.humidity}</h2>
				<h2>Wind Speed: ${weatherData.wind.speed}`);
			}).catch((error) => {
		
			});
		});

});


