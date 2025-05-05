import { WEBUI_API_BASE_URL, FUSION_AUTH_APP_ID, FUSION_AUTH_BASE_URL } from '$lib/constants';
import { BASE_ID } from '$lib/stores';
import { get } from 'svelte/store';

export const getAdminDetails = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/details`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-base-id': get(BASE_ID) ?? ''
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getAdminConfig = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-base-id': get(BASE_ID) ?? ''
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateAdminConfig = async (token: string, body: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-base-id': get(BASE_ID) ?? ''
		},
		body: JSON.stringify(body)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getSessionUser = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-base-id': get(BASE_ID) ?? ''
		},
		credentials: 'include'
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			const result = await res.json();
			if (!window.location.origin) {
				result.profile_image_url = `https://app.search.splore.st/user.png`;
			} else {
				result.profile_image_url = `${window.location.origin}/user.png`;
			}
			return result;
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// Placeholder function for getSessionUser, to be removed
export const _getSessionUser = async (token: string) => {
	return {
		id: 'bb1daf12-2ee3-4ecf-9c20-e1e913d845fd',
		email: 'vilay.k@splore.com',
		name: 'vilay',
		role: 'admin',
		profile_image_url:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABFtJREFUeF7tnNtrFGccht+ZPSSbXa2HlprSqvXCahAULaVSFXthkYgXtUogVNqCF4qFCt6J/gH6D3gTKaWk6UmCQcSLQq0V2iI9gRWLpqXQekpVarI7u+7sfmWWNMkYlZlsd3x3553r3zffO8+z7x4nsUb75hnooCFgSQiNi1oQCeHyISFkPiREQtgIkOXRa4iEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSAgZAbI4aoiEkBEgi6OGSEhAAlYCiadfDjjsHzPlu6je/gUw1Rmtf5yLaBuSXPI62l/tq4ONgXFGUL11Ae7VMyhf7AMqpTrOF83SFhZyH0DXQfHce3CHj0dDdoa7xEfIOKDiV3vgXvl0hrgav6yphBjnJsy90UdSsRJpIJWD1TbH+4u96bOmivxHy2GKfzee7gx2aCohztBrqIx8H+wykxm0rT2C1NLeafPlXz9E6dy+YOeJeKp1hYyDTL94COmVfvimeAv5/qURow62XcsL8TDk3r4KJNomiVTvYez9zmCEIp6KhZCON76BPcffiLFj8yNGHWy7WAjJdA8h0fnKFCIGY8eeDEYo4qlYCMn2/AQr99wkWtfB2AfPRow62HYtL8TKPoNsz8+AZU8Qqf4zjMLnLwUjFPFUawuxU6i1o2OBD2vp7LsoXx6IGHWw7ZpLyMktqNw8//Ars5OwZy+BPXcZkou3IrmoG7BTvnlTuIb8wIpgdB7DVFMJqZePKY+i8MlqmNLtek/VsPWxEeLJyPe/QP+Nb2yEeA/p6t3fURhcD7hOwx7h9Z64qYSY0h3ALTz8mr13Uol2WMkO/yfzKSsqIz/AGdpUL7eGrW8qIWG+XLRnP4/2zcdhz1o0DZ73ou69uDMeLSukBtt727vjvP9DIYDi2b1wL3/M6IP3H5g96CfcMA35j3aqaxfa1h72wS9fOIrSdwclJAyB/0uI90NV9s1h39bu8GcontkdJk5ks639lDWOMffOdd8HRPePUyh+sTMyyGE2ioeQt/4EkpkJLpW/voRzentYTpHNxkJIdudvsNJPTAq58S2ck1sigxxmo3gI6b0EK/PUBBfvJrrC4IYwnCKbjYWQjp4fYecWTkD17l7x7jxhPOIhZNvXsOd2TeFvat9reTc7sB2xEJLpPoFE5zof++qdiygMbgRMhcoJr5CFm9G+qd8Hy3ver91EHfJIr9qP9JoD01blB7pgCjdCnq2x47RCGnvZvGeXEDI3EiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghEkJGgCyOGiIhZATI4qghZEL+BWW/VgOLg98pAAAAAElFTkSuQmCC',
		token: token,
		token_type: 'Bearer',
		expires_at: null,
		permissions: {
			workspace: {
				models: false,
				knowledge: false,
				prompts: false,
				tools: false
			},
			sharing: {
				public_models: false,
				public_knowledge: false,
				public_prompts: false,
				public_tools: false
			},
			chat: {
				controls: true,
				file_upload: true,
				delete: true,
				edit: true,
				temporary: true,
				temporary_enforced: false
			},
			features: {
				direct_tool_servers: false,
				web_search: true,
				image_generation: true,
				code_interpreter: true
			}
		}
	};
};

export const ldapUserSignIn = async (user: string, password: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/ldap`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? ''
		},
		credentials: 'include',
		body: JSON.stringify({
			user: user,
			password: password
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);

			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getLdapConfig = async (token: string = '') => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config/ldap`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateLdapConfig = async (token: string = '', enable_ldap: boolean) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config/ldap`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			enable_ldap: enable_ldap
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getLdapServer = async (token: string = '') => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config/ldap/server`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateLdapServer = async (token: string = '', body: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/admin/config/ldap/server`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify(body)
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// TODO To Replace this later
export const userSignInWithToken = async () => {
	localStorage.setItem(
		'token',
		'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCOVNLRGVlSjFsYkRDWFZEeEozTUEtcThUOCJ9.eyJhdWQiOiI2MzZjYmQyZi0zMDEzLTRmZWEtYmNmYi0zNjJjNDg4NDEyNTIiLCJleHAiOjE3NDU2NjI3MDYsImlhdCI6MTc0NTU3NjMwNiwiaXNzIjoiYXV0aC5zcGxvcmUuc3QiLCJzdWIiOiJlMWVlNGJmZC04MWU0LTQ1ZDUtYWM0Mi05Y2M0YmEwODc2YzEiLCJqdGkiOiJmNDIwZDA5OC01MTE5LTQ5ZGItODk5Zi1hYzEzNDA0ZmY5ZTgiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoidmlsYXkua0BzcGxvcmUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFwcGxpY2F0aW9uSWQiOiI2MzZjYmQyZi0zMDEzLTRmZWEtYmNmYi0zNjJjNDg4NDEyNTIiLCJyb2xlcyI6WyJ1c2VyIl0sInNpZCI6IjkzOWZlNTg2LTYyMDEtNDk2Ny1hNzU1LWYyZWVkMmNmODRkNyIsImF1dGhfdGltZSI6MTc0NTU3NjMwNiwidGlkIjoiZjBjMmVlZDktYWMxZi0xMDZiLTAxNjUtMWFjMWU0ODExMjhhIn0.YJ6u03C-s-MK-cWLTm15lhG5nDGOAwUMjx1mPsmcwTPoAuPQXYlhEaRZ08QcMRFgz0Un8aA2C_eWy-or5_y4rXVrt8cx7bMh9Ftzh6i5GE6Xxcol2ZqqJ2A3Q8TrWJY2EH_4bfwOnKWwP93WJR7pZLSvy8NmRRV4j6wHfOFdW2XO8-SbvCOgwVSQ8n4p69GTBhR5IvNiJ936bh9friLq2cCSwLeg2guSvAuRAUl6ZW6cLyyoOmKQeRA8GSGBC90i0piIrdQX5QAH6AcEFOO167EpospdQt1HQbxqGA7uRtlfwEDCCp9HdGiU4kB10XM5j_ZVCmeoyCV4gXoDv8y7mw'
	);
	const token = localStorage.getItem('token');
	if (token) {
		return token;
	}
	return null;
};

export const setTokenAndBaseId = async (token: string, baseId: string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('baseId', baseId);
};

export const removeTokenAndBaseId = async () => {
	localStorage.removeItem('token');
	localStorage.removeItem('baseId');
};

export const userSignIn = async (email: string, password: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? ''
		},
		credentials: 'include',
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);

			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const userSignUp = async (
	name: string,
	email: string,
	password: string,
	profile_image_url: string
) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? ''
		},
		credentials: 'include',
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
			profile_image_url: profile_image_url
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const userSignOut = async () => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? ''
		},
		credentials: 'include'
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res;
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}
};

export const addUser = async (
	token: string,
	name: string,
	email: string,
	password: string,
	role: string = 'pending'
) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
			role: role
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserProfile = async (token: string, name: string, profileImageUrl: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/update/profile`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: name,
			profile_image_url: profileImageUrl
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserPassword = async (token: string, password: string, newPassword: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/update/password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			password: password,
			new_password: newPassword
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getSignUpEnabledStatus = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signup/enabled`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getDefaultUserRole = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signup/user/role`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateDefaultUserRole = async (token: string, role: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signup/user/role`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			role: role
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const toggleSignUpEnabledStatus = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/signup/enabled/toggle`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getJWTExpiresDuration = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/token/expires`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateJWTExpiresDuration = async (token: string, duration: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/token/expires/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			duration: duration
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const createAPIKey = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/api_key`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});
	if (error) {
		throw error;
	}
	return res.api_key;
};

export const getAPIKey = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/api_key`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});
	if (error) {
		throw error;
	}
	return res.api_key;
};

export const deleteAPIKey = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/auths/api_key`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'x-base-id': get(BASE_ID) ?? '',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});
	if (error) {
		throw error;
	}
	return res;
};

export const refreshAuthToken = async (token: string, refreshToken: string) => {
	let error = null;

	const res = await fetch(
		`${FUSION_AUTH_BASE_URL}/api/jwt/issue?applicationId=${FUSION_AUTH_APP_ID}&refreshToken=${refreshToken}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	)
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail ?? 'Failed to refresh token';
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
