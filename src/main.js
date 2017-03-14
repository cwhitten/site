import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './components/App'
import Home from './components/Home'
import Item from './components/Item'
import NotFound from './components/404'

var data = {
  name: 'about me',
  children: [
    { name: 'i build software' },
    { name: 'i live in the pacific northwest' },
    { name: 'i work in spacemacs', link: 'http://spacemacs.org/' },
    { name: 'i am for hire' },
    {
      name: 'find me',
      children: [
        { name: 'github', link: 'https://github.com/cwhitten' },
        { name: 'twitter', link: 'https://twitter.com/_chriswhitten_' },
        { name: 'linkedin', link: 'https://www.linkedin.com/in/whittenc/' },
      ]
    },
    {
      name: 'contact me',
      children: [
        { name: 'chris@whitten.co' },
      ]
    }
  ]
}

// define the item component
Vue.component('item', {
  template: `
    <ul>
      <li>
        <div
          :class='{bold: isFolder}'
          @click='toggle'>
            <div v-if='isFolder'>
              {{ model.name }}
              <span class='operator' v-if="isFolder">[{{open ? '-' : '+'}}]</span>
            </div>
            <div v-else>
              <a v-if='hasLink' v-bind:href='model.link' target='_blank'>{{ model.name }}</a>
              <div v-else>
                {{ model.name }}
              </div>
            </div>
        </div>
        <ul v-show='open' v-if='isFolder'>
          <item
            class='item'
            v-for='model in model.children'
            :key='model'
            :model='model'>
          </item>
        </ul>
      </li>
  </ul>
  `,
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    hasLink: function() {
      return this.model.link
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
})


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/chris', component: Home, props: { model: data } },
    { path: '*', component: NotFound },
  ]
})

const app = new Vue({
  el: '#app',
  router
})
