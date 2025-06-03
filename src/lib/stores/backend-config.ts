import { writable, derived, type Readable } from 'svelte/store';
import { 
    PUBLIC_NODE_ENV, 
    PUBLIC_API_ENDPOINT_PRODUCTION, 
    PUBLIC_API_ENDPOINT_STAGING 
} from '$env/static/public';

// Store for custom backend URL
const createCustomBackendStore = () => {
    const key = 'custom-backend';
    const initial = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    const store = writable<string | null>(initial);

    // Subscribe to changes and update localStorage
    if (typeof localStorage !== 'undefined') {
        store.subscribe(value => {
            if (value !== null) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
        });
    }

    return store;
};

// Create the stores
export const customBackendUrl = createCustomBackendStore();

// Derived store that returns the current backend URL
export const backendConfig: Readable<{ currentUrl: string }> = derived(
    [customBackendUrl],
    ([$customBackendUrl]) => ({
        currentUrl: $customBackendUrl || (PUBLIC_NODE_ENV === 'production' 
            ? PUBLIC_API_ENDPOINT_PRODUCTION 
            : PUBLIC_API_ENDPOINT_STAGING)
    })
);

// Helper function to set custom backend URL
export const setCustomBackendUrl = (url: string | null) => {
    // Always remove existing value first
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('custom-backend');
    }
    // Then set the new value
    customBackendUrl.set(url);
}; 