<script lang="ts">
	import DOMPurify from 'dompurify';
	import type { Token } from 'marked';

	import { WEBUI_BASE_URL } from '$lib/constants';
	import Source from './Source.svelte';
	import { settings } from '$lib/stores';
	import { getHtmlContent } from '$lib/apis/custom';

	export let id: string;
	export let token: Token;

	export let onSourceClick: Function = () => {};

	let html: string | null = null;

	$: if (token.type === 'html' && token?.text) {
		html = DOMPurify.sanitize(token.text);
	} else {
		html = null;
	}

	async function loadHtmlContent(fileId: string): Promise<string> {
		const authToken = localStorage.getItem('token');
		if (!authToken) {
			throw new Error('Authentication required');
		}
		const content = await getHtmlContent(authToken, fileId);
		if (!content) {
			throw new Error('Failed to load HTML content');
		}
		return content;
	}
</script>

{#if token.type === 'html'}
	{#if html && html.includes('<video')}
		{@const video = html.match(/<video[^>]*>([\s\S]*?)<\/video>/)}
		{@const videoSrc = video && video[1]}
		{#if videoSrc}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video
				class="w-full my-2"
				src={videoSrc.replaceAll('&amp;', '&')}
				title="Video player"
				frameborder="0"
				referrerpolicy="strict-origin-when-cross-origin"
				controls
				allowfullscreen
			></video>
		{:else}
			{token.text}
		{/if}
	{:else if html && html.includes('<audio')}
		{@const audio = html.match(/<audio[^>]*>([\s\S]*?)<\/audio>/)}
		{@const audioSrc = audio && audio[1]}
		{#if audioSrc}
			<!-- svelte-ignore a11y-media-has-caption -->
			<audio
				class="w-full my-2"
				src={audioSrc.replaceAll('&amp;', '&')}
				title="Audio player"
				controls
			></audio>
		{:else}
			{token.text}
		{/if}
	{:else if token.text && token.text.match(/<iframe\s+[^>]*src="https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?[^"]*)?"[^>]*><\/iframe>/)}
		{@const match = token.text.match(
			/<iframe\s+[^>]*src="https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?[^"]*)?"[^>]*><\/iframe>/
		)}
		{@const ytId = match && match[1]}
		{#if ytId}
			<iframe
				class="w-full aspect-video my-2"
				src={`https://www.youtube.com/embed/${ytId}`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			>
			</iframe>
		{/if}
	{:else if token.text && token.text.includes('<iframe')}
		{@const match = token.text.match(/<iframe\s+[^>]*src="([^"]+)"[^>]*><\/iframe>/)}
		{@const iframeSrc = match && match[1]}
		{#if iframeSrc}
			<iframe
				class="w-full my-2"
				src={iframeSrc}
				title="Embedded content"
				frameborder="0"
				sandbox
				onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"
			></iframe>
		{:else}
			{token.text}
		{/if}
	{:else if token.text.includes(`<file type="html"`)}
		{@const match = token.text.match(/<file type="html" id="([^"]+)"/)}
		{@const fileId = match && match[1]}
		{#if fileId}
			{#await loadHtmlContent(fileId)}
				<div class="w-full my-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
					Loading content...
				</div>
			{:then content}
				<iframe
					class="w-full my-2"
					srcdoc={content}
					title="Content"
					frameborder="0"
					sandbox="allow-scripts{($settings?.iframeSandboxAllowForms ?? false)
						? ' allow-forms'
						: ''}{($settings?.iframeSandboxAllowSameOrigin ?? false) ? ' allow-same-origin' : ''}"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					height="550px"
					width="100%"
					onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"
				></iframe>
			{:catch error}
				<div class="w-full my-2 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
					Error loading content: {error.message}
				</div>
			{/await}
		{/if}
	{:else if token.text.includes(`<source_id`)}
		<Source {id} {token} onClick={onSourceClick} />
	{:else}
		{token.text}
	{/if}
{/if}
