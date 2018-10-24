export class CancelSaveButtons {
	view(vnode) {
		return [
			m("button.action",{onclick: () => vnode.attrs.cancel()}, "Cancel"),
			m("button.action",{onclick: () => vnode.attrs.save()},"Save")
		];
	}
}