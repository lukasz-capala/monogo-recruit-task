<script lang="ts">
	const { children } = $props();
</script>

<p class="error">
	{@render children()}
</p>

<style lang="scss">
	@use '@/scss/colors' as colors;
	@use '@/scss/typography' as typography;

	.error {
		@include typography.small;
		margin-bottom: 4px;
		margin-top: 0;
		color: colors.use-color(invalid);
	}
</style>
