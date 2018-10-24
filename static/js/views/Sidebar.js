export class Sidebar {
		view(vnode) {
			return m("div.sidebar", [
				m(".name", vnode.attrs.name),
				m("button.action.dc", {
					onclick: () => vnode.attrs.onClick('DC', 2)
				}, "+DC"), 
				m("button.action.marvel", {
					onclick: () => vnode.attrs.onClick('Marvel', 1)
				}, "+Marvel"),
				m("button.action",{onclick: () => vnode.attrs.cancel()}, "Cancel"),
				m("button.action",{onclick: () => vnode.attrs.save()},"Save")
			]);
		}
}