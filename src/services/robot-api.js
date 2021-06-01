import axios from 'axios';

const BASE_URL = 'https://robot-art-api.herokuapp.com/';

class RobotAPIService {
	static async login(email, password) {
		const config = {
			method: 'POST',
			url: `${BASE_URL}login`,
			data: {
				email,
				password
			}
		};

		const response = await axios(config);
		return response.data;
	}

	static async register(fullName, email, password) {
		const config = {
			method: 'POST',
			url: `${BASE_URL}register`,
			data: {
				fullName,
				email,
				password
			}
		};

		const response = await axios(config);
		return response.data;
	}

	static async logout(authToken) {
		const config = {
			method: 'GET',
			url: `${BASE_URL}logout`,
			headers: {
				'Authentication': `Bearer ${authToken}`
			}
		};

		const response = await axios(config);
		return response.data;
	}

	static async getRobots(authToken) {
		const config = {
			method: 'GET',
			url: `${BASE_URL}robot`,
			headers: {
				'Authentication': `Bearer ${authToken}`
			}
		};

		const response = await axios(config);
		return response.data;
	}

	static async createRobot(authToken, name, file) {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('file', file);

		const config = {
			method: 'POST',
			url: `${BASE_URL}robot`,
			headers: {
				'Authentication': `Bearer ${authToken}`,
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		};

		const response = await axios(config);
		return response.data;
	}
	
	static async castVote(authToken, robotId) {
		const config = {
			method: 'PUT',
			url: `${BASE_URL}robot/${robotId}`,
			headers: {
				'Authentication': `Bearer ${authToken}`
			}
		};

		const response = await axios(config);
		return response.data;
	}
	
	static async deleteRobot(authToken, robotId) {
		const config = {
			method: 'DELETE',
			url: `${BASE_URL}robot/${robotId}`,
			headers: {
				'Authentication': `Bearer ${authToken}`
			}
		};

		const response = await axios(config);
		return response.data;
	}
}

export default RobotAPIService;