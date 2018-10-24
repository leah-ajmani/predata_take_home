/* Buttons for adding heroes */
export class UniverseButtons {
	view(vnode) {
		return [
			m("button.action.dc", {
				onclick: () => vnode.attrs.onClick('DC', 2)
			}, "DC"), 
			m("button.action.marvel", {
				onclick: () => vnode.attrs.onClick('Marvel', 1)
			}, "Marvel")
		];
	}
}