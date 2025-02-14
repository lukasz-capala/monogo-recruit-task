<p class="loading">Proszę czekać</p>

<style lang="scss">
	@use '@/scss/typography' as typography;
	@use '@/scss/colors' as colors;

	.loading {
		color: colors.use-color(accent);
		@include typography.paragraph;
	}
</style>
