<template>
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
</template>
