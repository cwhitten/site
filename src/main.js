import Vue from 'vue'
import App from './components/App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/' },
  ]
})

Vue.component('item', {
  template: `
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
          :model='model'>
        </item>
      </ul>
    </li>
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
    },
  }
})

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

new Vue({
  el: '#app',
  router,
  data: {
    treeData: data
  }
})
