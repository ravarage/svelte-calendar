<script>
	import DayPicker from '$lib/components/calendar/DayPicker.svelte';
	import ViewTransitionEffect from '$lib/components/generic/ViewTransitionEffect.svelte';
	import DatepickerControls from '$lib/components/calendar/CalendarControls.svelte';
	import { getContext } from 'svelte';
	import { storeContextKey } from '$lib/context';
	import CrossfadeProvider from '$lib/components/generic/crossfade/CrossfadeProvider.svelte';
	import MonthPicker from '$lib/components/calendar/MonthPicker.svelte';
	import YearPicker from '$lib/components/calendar/YearPicker.svelte';
	import {createEventDispatcher} from 'svelte';

	let dispatch = createEventDispatcher();
	const dayClick = () =>{
		dispatch('dayClicked',store);
	}
	const store = getContext(storeContextKey);
</script>

<CrossfadeProvider let:key let:send let:receive>
	<div in:receive|local={{ key }} out:send|local={{ key }} class="grid">
		<DatepickerControls />
		<div class="contents">
			{#if $store.activeView === 'days'}
				<ViewTransitionEffect>
					<DayPicker on:dayClicked={dayClick} />
				</ViewTransitionEffect>
			{:else if $store.activeView === 'months'}
				<ViewTransitionEffect>
					<MonthPicker />
				</ViewTransitionEffect>
			{:else if $store.activeView === 'years'}
				<ViewTransitionEffect>
					<YearPicker />
				</ViewTransitionEffect>
			{/if}
		</div>
	</div>
</CrossfadeProvider>

<style>
	.grid {
		display: grid;
		width: var(--sc-theme-calendar-width);
		max-width: var(--sc-theme-calendar-maxWidth);
		grid-template-rows: auto calc(
				min(var(--sc-theme-calendar-maxWidth), var(--sc-theme-calendar-width)) * 6 / 7 +
					var(--sc-theme-calendar-legend-height)
			);
		font-family: Rajdhani, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
			sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		box-shadow: var(--sc-theme-calendar-shadow);
		background: var(--sc-theme-calendar-colors-background-primary);
		text-align: center;
		color: var(--sc-theme-calendar-colors-text-primary);
	}
	.contents {
		display: grid;
		overflow: hidden;
	}
	.grid .contents > :global(*) {
		display: grid;
		grid-row: 1;
		grid-column: 1;
		height: 100%;
		grid-template: 1fr / 1fr;
	}
</style>
