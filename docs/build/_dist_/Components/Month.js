import './Month.css.proxy.js';
/* src/Components/Month.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	attr,
	bubble,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	outro_and_destroy_block,
	safe_not_equal,
	transition_in,
	transition_out,
	update_keyed_each
} from "../../web_modules/svelte/internal.js";

import Week from "./Week.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (20:2) {#each visibleMonth.weeks as week (week.id) }
function create_each_block(key_1, ctx) {
	let first;
	let week;
	let current;

	week = new Week({
			props: {
				days: /*week*/ ctx[8].days,
				selected: /*selected*/ ctx[1],
				highlighted: /*highlighted*/ ctx[2],
				shouldShakeDate: /*shouldShakeDate*/ ctx[3],
				direction: /*direction*/ ctx[4]
			}
		});

	week.$on("dateSelected", /*dateSelected_handler*/ ctx[6]);

	return {
		key: key_1,
		first: null,
		c() {
			first = empty();
			create_component(week.$$.fragment);
			this.first = first;
		},
		m(target, anchor) {
			insert(target, first, anchor);
			mount_component(week, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty & /*visibleMonth*/ 1) week_changes.days = /*week*/ ctx[8].days;
			if (dirty & /*selected*/ 2) week_changes.selected = /*selected*/ ctx[1];
			if (dirty & /*highlighted*/ 4) week_changes.highlighted = /*highlighted*/ ctx[2];
			if (dirty & /*shouldShakeDate*/ 8) week_changes.shouldShakeDate = /*shouldShakeDate*/ ctx[3];
			if (dirty & /*direction*/ 16) week_changes.direction = /*direction*/ ctx[4];
			week.$set(week_changes);
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(first);
			destroy_component(week, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let current;
	let each_value = /*visibleMonth*/ ctx[0].weeks;
	const get_key = ctx => /*week*/ ctx[8].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "month-container svelte-ny3kda");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*visibleMonth, selected, highlighted, shouldShakeDate, direction*/ 31) {
				const each_value = /*visibleMonth*/ ctx[0].weeks;
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, null, get_each_context);
				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { id } = $$props;
	let { visibleMonth } = $$props;
	let { selected } = $$props;
	let { highlighted } = $$props;
	let { shouldShakeDate } = $$props;
	let lastId = id;
	let direction;

	function dateSelected_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(5, id = $$props.id);
		if ("visibleMonth" in $$props) $$invalidate(0, visibleMonth = $$props.visibleMonth);
		if ("selected" in $$props) $$invalidate(1, selected = $$props.selected);
		if ("highlighted" in $$props) $$invalidate(2, highlighted = $$props.highlighted);
		if ("shouldShakeDate" in $$props) $$invalidate(3, shouldShakeDate = $$props.shouldShakeDate);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lastId, id*/ 160) {
			$: {
				$$invalidate(4, direction = lastId < id ? 1 : -1);
				$$invalidate(7, lastId = id);
			}
		}
	};

	return [
		visibleMonth,
		selected,
		highlighted,
		shouldShakeDate,
		direction,
		id,
		dateSelected_handler
	];
}

class Month extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 5,
			visibleMonth: 0,
			selected: 1,
			highlighted: 2,
			shouldShakeDate: 3
		});
	}
}

export default Month;