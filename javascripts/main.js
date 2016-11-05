"use strict";

let apiKeys = {};
let uid = "";
let firebaseKey = {};

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
			console.log(response2);
		}, (errorResponse) => {
			reject(errorResponse);
		});		
			}, (errorResponse2) => {
				console.log("errorResponse", errorResponse2);
			});
			
		});
	};



$(document).ready(function() {
  Auth.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    firebaseKey = keys;
    firebase.initializeApp(firebaseKey);
  });

 $("#registerButton").on("click", function() {
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let userName = $("#inputUsername").val();
	let user = {
		"email": email,
		"password": password
	};
		Auth.registerUser(user).then(function(registerResponse) {
		console.log("register response",registerResponse);
		let uid = registerResponse;
		let newUser = {
			"username": userName,
			"uid": registerResponse.uid
		};
		return Auth.addUser(firebaseKey, newUser);

	}).then(function(userResponse) {
		return Auth.loginUser(user);
	});
	$("#login-container").addClass('hidden');
	$("#weather").removeClass('hidden');
});

 $("#loginButton").on("click", () => {
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let userName = $("#inputUsername").val();
	let user = {
		"email": email,
		"password": password
	};
	Auth.loginUser(user).then(() => {
	$("#login-container").addClass('hidden');
	$("#weather").removeClass('hidden');		
	});
});


	$('#getWeatha').on('click', () => {
		$('#output').html("");
		let searchy = $('#weatherSearch').val();
		disWeather(searchy).then((weatherData) => {
			$('#output').append(`<h1>Temp : ${weatherData.main.temp}</h1>
				<h2>Humidity : ${weatherData.main.humidity}</h2>
				<h2>Wind Speed: ${weatherData.wind.speed}
				<h2>Latitude : ${weatherData.coord.lat} Longitude : ${weatherData.coord.lon}</h2>
				<h2>Conditions : ${weatherData.weather.main}</h2>`);
			}).catch((error) => {

		});
	});

});

