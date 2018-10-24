'use strict'
import './mithril.js'
import {User} from './models.js'
import {UserView} from './views/UserView.js'

let page = {
    oninit: function(vnode) {
      vnode.state.users = [];
      vnode.state.chosenUser = null;

      m.request('/users/').then((result) => {
        vnode.state.users = result.map(u => new User(u));

        console.warn("Choosing to be the first available user");
        vnode.state.chosenUser = vnode.state.users[0];
      });
    },

    view: function(vnode) {
      return m('.app', !vnode.state.chosenUser ? null : [
        m(UserView, {
          name: vnode.state.chosenUser.firstName,
          heroes: vnode.state.chosenUser.heroes,
          added: vnode.state.chosenUser.added,
          removed: vnode.state.chosenUser.removed,
          removeHero: (relPk, idx) => {vnode.state.chosenUser.removeHero(relPk, idx)},
          addHero: (uni, pk) => {vnode.state.chosenUser.requestRandom(uni, pk)},
          saveSelection: (ops) => {vnode.state.chosenUser.saveSelection(ops)},
          cancelSelection: () => {vnode.state.chosenUser.cancelSelection()}
        })
      ]);
    }
}

m.mount(document.body, page)
