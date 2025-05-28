import {
	PUBLIC_NODE_ENV,
	PUBLIC_API_ENDPOINT_PRODUCTION,
	PUBLIC_FUSION_AUTH_API_KEY_PRODUCTION,
	PUBLIC_FUSION_AUTH_APP_ID_PRODUCTION,
	PUBLIC_FUSION_AUTH_BASE_URL_PRODUCTION,
	PUBLIC_API_ENDPOINT_STAGING,
	PUBLIC_FUSION_AUTH_API_KEY_STAGING,
	PUBLIC_FUSION_AUTH_APP_ID_STAGING,
	PUBLIC_FUSION_AUTH_BASE_URL_STAGING
} from '$env/static/public';

export const APP_NAME = 'Splore';
export const ENVIRONMENT = PUBLIC_NODE_ENV;

export const WEBUI_HOSTNAME =
	PUBLIC_NODE_ENV === 'production' ? PUBLIC_API_ENDPOINT_PRODUCTION : PUBLIC_API_ENDPOINT_STAGING;
export const WEBUI_BASE_URL = `https://${WEBUI_HOSTNAME}`;
export const WEBUI_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1`;

export const OLLAMA_API_BASE_URL = `${WEBUI_BASE_URL}/ollama`;
export const OPENAI_API_BASE_URL = `${WEBUI_BASE_URL}/openai`;
export const AUDIO_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/audio`;
export const IMAGES_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/images`;
export const RETRIEVAL_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/retrieval`;

export const WEBUI_VERSION = APP_VERSION;
export const WEBUI_BUILD_HASH = APP_BUILD_HASH;
export const REQUIRED_OLLAMA_VERSION = '0.1.16';

export const SUPPORTED_FILE_TYPE = [
	'application/epub+zip',
	'application/pdf',
	'text/plain',
	'text/csv',
	'text/xml',
	'text/html',
	'text/x-python',
	'text/css',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/octet-stream',
	'application/x-javascript',
	'text/markdown',
	'audio/mpeg',
	'audio/wav',
	'audio/ogg',
	'audio/x-m4a'
];

export const SUPPORTED_FILE_EXTENSIONS = [
	'md',
	'rst',
	'go',
	'py',
	'java',
	'sh',
	'bat',
	'ps1',
	'cmd',
	'js',
	'ts',
	'css',
	'cpp',
	'hpp',
	'h',
	'c',
	'cs',
	'htm',
	'html',
	'sql',
	'log',
	'ini',
	'pl',
	'pm',
	'r',
	'dart',
	'dockerfile',
	'env',
	'php',
	'hs',
	'hsc',
	'lua',
	'nginxconf',
	'conf',
	'm',
	'mm',
	'plsql',
	'perl',
	'rb',
	'rs',
	'db2',
	'scala',
	'bash',
	'swift',
	'vue',
	'svelte',
	'doc',
	'docx',
	'pdf',
	'csv',
	'txt',
	'xls',
	'xlsx',
	'pptx',
	'ppt',
	'msg'
];

export const PASTED_TEXT_CHARACTER_LIMIT = 1000;

// Fusion Auth
export const FUSION_AUTH_BASE_URL =
	PUBLIC_NODE_ENV === 'production'
		? PUBLIC_FUSION_AUTH_BASE_URL_PRODUCTION
		: PUBLIC_FUSION_AUTH_BASE_URL_STAGING;
export const FUSION_AUTH_APP_ID =
	PUBLIC_NODE_ENV === 'production'
		? PUBLIC_FUSION_AUTH_APP_ID_PRODUCTION
		: PUBLIC_FUSION_AUTH_APP_ID_STAGING;
export const FUSION_AUTH_API_KEY =
	PUBLIC_NODE_ENV === 'production'
		? PUBLIC_FUSION_AUTH_API_KEY_PRODUCTION
		: PUBLIC_FUSION_AUTH_API_KEY_STAGING;

// Source: https://kit.svelte.dev/docs/modules#$env-static-public
// This feature, akin to $env/static/private, exclusively incorporates environment variables
// that are prefixed with config.kit.env.publicPrefix (usually set to PUBLIC_).
// Consequently, these variables can be securely exposed to client-side code.
