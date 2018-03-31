import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
//var HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)

import DeckList from '@/components/DeckList'
import DeckPlayer from '@/components/DeckPlayer'
// import AbstractCard from '@/components/AbstractCard'

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    }, {
      path: '/decks/',
      name: 'deck_list',
      component: DeckList,
    }, {
      path: '/decks/:deck_id',
      name: 'single_deck',
      component: DeckPlayer
    }]
})
