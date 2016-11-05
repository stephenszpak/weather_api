"use strict";

var Auth = (function() {
	return {
		firebaseCredentials: function() {
			return new Promise((resolve, reject) => {
				$.ajax({
					method: 'GET',
					url: 'firebaseKey.json'
				}).then((response) => {
					resolve(response);
				}, (error) => {
					reject(error);
				});
			});
		}
	};


})();