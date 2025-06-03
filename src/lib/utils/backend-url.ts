import { setCustomBackendUrl } from '../stores/backend-config';

/**
 * Handles the backend URL parameter from the URL
 * If 'backend' parameter is present, it will overwrite any existing custom backend URL
 * If no parameter is present, it will use the environment default
 */
export function handleBackendUrlParam() {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const backendParam = urlParams.get('backend');

    // Always set the backend URL if parameter exists, overwriting any previous value
    if (backendParam) {
        setCustomBackendUrl(backendParam);

        // Remove the backend parameter from URL without refreshing the page
        urlParams.delete('backend');
        const newUrl = window.location.pathname + 
            (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
            window.location.hash;
        window.history.replaceState({}, '', newUrl);
    }
} 