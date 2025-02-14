import { server } from '@/test/mocks/server';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should make request and display proper result', async () => {
		render(Page);
		const textarea = screen.getByTestId('page-form-textarea');
		await userEvent.type(textarea, 'Test text');

		const button = screen.getByTestId('page-form-submitButton');
		await userEvent.click(button);

		const modal: HTMLDialogElement = screen.getByTestId('page-resultModal');
		const postivieResult: HTMLParagraphElement | null = modal.querySelector(
			'[data-testid="analysis-result-modal:positive"]'
		);
		const negativeResult: HTMLParagraphElement | null = modal.querySelector(
			'[data-testid="analysis-result-modal:negative"]'
		);

		expect(
			postivieResult?.innerHTML
				.trim()
				.startsWith('Twoja wiadomość została oceniona pozytywnie w 70.00%')
		);
		expect(
			negativeResult?.innerHTML
				.trim()
				.startsWith('Twoja wiadomość została oceniona negatywnie w 30.00%')
		);
	});

	test('should validate form and prevent empty message to be sent', async () => {
		const requestInterception = vi.fn();
		server.events.on('request:start', requestInterception);

		render(Page);

		const button = screen.getByTestId('page-form-submitButton');
		await userEvent.click(button);

		expect(requestInterception).not.toHaveBeenCalled();
	});
});
