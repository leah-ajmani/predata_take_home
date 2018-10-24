'use strict'
// To get you started
export class User {
  	constructor(data) {
		this.firstName = data.first_name;
		this.relations = data.relations;
		this.pk = data.pk;
		this.heroes = {}; // Keys: relation PKs, Values: hero objects
		for (let el of this.relations) {
			this.requestHero(el.hero, el.pk);
		}
		this.added = []; // Hero pks of added heroes
		this.removed = []; // Relation pks of removed relations
    }

  	requestHero(heroPk, pk) {
		m.request(`/heroes/${heroPk}`)
			 .then((result) => {
				let obj = {};
				obj[pk] = result;
				this.heroes = Object.assign(this.heroes, obj);
			 });
  	}

  	/*
  	* If hero to be removed is in heroes then [idx] = -1
  	* If hero to be removed is in added then [relPk] = -1
  	*/
    removeHero(relPk, idx) {
		if (this.heroes[relPk]) {
			delete this.heroes[relPk];
			this.removed.push(Number(relPk));
		} else {
			this.added.splice(idx, 1);
		}
	}

    saveSelection() {
  		const pks = this.added.map((el) => {return el.pk});
		const operations = {
			add: pks,
			remove: this.removed
		}
		m.request({
			method: 'PATCH',
			url: `/users/${this.pk}/edit/`,
			data: operations
		}).then((result) => {
			this.heroes = {};
			for (let el of result.relations) {
				this.requestHero(el.hero, el.pk);
			}

			this.added = [];
			this.removed = [];
		});
	}

	cancelSelection() {
		m.request(`/users/${this.pk}/`).then((result) => {
			this.heroes = {};
			for (let el of result.relations) {
				this.requestHero(el.hero, el.pk);
			}
			this.added = [];
			this.removed = [];
		});
	}

    requestRandom(uni, pk) {
		m.request(`/heroes/random`, {data: {universe: uni, pk: pk}})
		.then((result) => {this.added.push(result)})
	}
}
