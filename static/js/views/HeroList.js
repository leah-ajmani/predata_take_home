export class HeroList {
	view(vnode) {
		const heroItems = [];

		for (let key in vnode.attrs.heroes) {
			const el = vnode.attrs.heroes[key];
			const item = m(HeroListItem, {
		      	universe: el.universe.name,
		      	name: el.name,
		      	remove: (r, i) => {vnode.attrs.remove(r, i)},
		      	relPk: key,
		      	idx: -1
	      	});
	      	heroItems.push(item);
		}

		const addedHeroes = vnode.attrs.added.map((el, idx) => {
			return m(HeroListItem, {
		      	universe: el.universe.name,
		      	name: el.name,
		      	remove: (r, i) => {vnode.attrs.remove(r, i)},
		      	relPk: -1, //relation pk will be added if save is applied
		      	index: idx
	      	});
		});

		return m(".hero-list", heroItems.concat(addedHeroes));
	}
}

class HeroListItem {
	view(vnode) {
		return m(`a.hero-list-item.${vnode.attrs.universe}`, vnode.attrs.name, [
			m('button.remove', 
				{onclick: () => {vnode.attrs.remove(vnode.attrs.relPk, vnode.attrs.index)}})
		]);
	}
}

