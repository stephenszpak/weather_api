"use strict";

var Auth = (function(user) {
	user.getUser = function(firebaseKey, uid) {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url:`https://weather-api-auth.firebaseio.com/users.json?orderBy="uid"&equalTo="${uid}"`
			}).then((response) => {
				let users = [];
				Object.keys(response).forEach(function(key) {
					response[key].id = key;
					users.push(response[key]);
				});
				resolve(users[0]);
			}, (error) => {
				reject(error);
			});
		});
	};

	user.addUser = function(firebaseKey, newUsers) {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url:`https://weather-api-auth.firebaseio.com/users.json`,
				data: JSON.stringify(newUsers),
				dataType:'json'
			}).then((response) => {
				console.log("response from POST", response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};

return user;

})(Auth || {});