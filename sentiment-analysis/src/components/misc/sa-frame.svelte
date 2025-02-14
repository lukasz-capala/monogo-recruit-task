<script lang="ts">
	const { children } = $props();
</script>

<div class="frame">
	{@render children()}
</div>

<style lang="scss">
	@use '@/scss/components/frame' as frame;
	@use '@/scss/colors' as colors;

	.frame {
		width: 100%;
		max-width: 800px;
		@include frame.frame();
		box-shadow: 0 30px 50px 0 colors.use-color(shadow);
	}
</style>
