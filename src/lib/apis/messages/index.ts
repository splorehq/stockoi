import { WEBUI_API_BASE_URL, BASE_ID } from '$lib/constants';

export const createMessage = async (token: string = '', message: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		},
		body: JSON.stringify(message)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getMessages = async (token: string = '') => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getMessageById = async (token: string = '', message_id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/${message_id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateMessageById = async (
	token: string = '',
	message_id: string,
	message: object
) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/${message_id}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		},
		body: JSON.stringify(message)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteMessageById = async (token: string = '', message_id: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/${message_id}/delete`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateMessageSettings = async (token: string = '', settings: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/messages/settings/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		},
		body: JSON.stringify(settings)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const chatCompletion = async (
	token: string = '',
	body: object
): Promise<[Response | null, AbortController]> => {
	const controller = new AbortController();
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chat/completions`, {
		signal: controller.signal,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		},
		body: JSON.stringify(body)
	}).catch((err) => {
		console.log(err);
		error = err;
		return null;
	});

	if (error) {
		throw error;
	}

	return [res, controller];
};

export const generateChatCompletion = async (token: string = '', body: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` }),
			'x-base-id': BASE_ID,
		},
		body: JSON.stringify(body)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = `${err?.detail ?? err}`;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
