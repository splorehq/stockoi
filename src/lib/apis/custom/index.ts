import { WEBUI_BASE_URL } from '$lib/constants';
import { BASE_ID } from '$lib/stores';
import { get } from 'svelte/store';

export const getHtmlContent = async (token: string, fileId: string): Promise<string | null> => {
    let error = null;

    const res = await fetch(`${WEBUI_BASE_URL}/api/v1/files/${fileId}/content/html`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            'x-base-id': get(BASE_ID) ?? ''
        }
    })
    .then(async (res) => {
        if (!res.ok) throw await res.json();
        return res.text();
    })
    .catch((err) => {
        error = err.detail;
        console.error(err);
        return null;
    });

    if (error) {
        throw error;
    }

    return res;
}; 

export const getBaseId = async (slug: string): Promise<string | null> => {
    let error = null;

    const res = await fetch(`${WEBUI_BASE_URL}/api/v1/tenants/slug/${slug}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(async (res) => {
        if (!res.ok) throw await res.json();
        return res.text();
    })
    .catch((err) => {
        error = err.detail;
        console.error(err);
        return null;
    });

    if (error) {
        throw error;
    }

    return res;
}