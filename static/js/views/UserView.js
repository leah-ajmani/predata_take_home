import {HeroList} from './HeroList.js'
import {UniverseButtons} from './UniverseButtons.js'
import {CancelSaveButtons} from './CancelSaveButtons.js'
import {Sidebar} from './Sidebar.js'

export class UserView {
	view(vnode) {
		return ('.user-view', [
			m(Sidebar, {
				onClick: (uni, pk) => {vnode.attrs.addHero(uni, pk)},
				save: () => {vnode.attrs.saveSelection()},
				cancel: () => {vnode.attrs.cancelSelection()},
				name: vnode.attrs.name
			}),
			
			m(HeroList, {
				heroes: vnode.attrs.heroes,
				added: vnode.attrs.added,
				removed: vnode.attrs.removed,
				remove: (r, i) => {vnode.attrs.removeHero(r, i)}
			})
		]);
	}
}