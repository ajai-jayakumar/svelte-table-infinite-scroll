import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

const API_PATH = 'https://cms-api.doinstruct-test.com';

interface Send {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	data?: any;
	token?: string;
}

export async function send({ method, path, data, token }: Send) {
	const headers: Record<string, string> = {};

	if (data) {
		headers['Content-Type'] = 'application/json';
	}

	if (token) {
		headers['Authorization'] = `Token ${token}`;
		headers['x-api-key'] = API_KEY;
	}

	const opts: RequestInit = {
		method,
		headers,
		...(data ? { body: JSON.stringify(data) } : {})
	};

	const res = await fetch(`${API_PATH}/${path}`, opts);

	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}
