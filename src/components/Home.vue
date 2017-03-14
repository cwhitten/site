<template>
  <div>
    <h2>Chris Whitten</h2>
    <item
      class="item"
      :model="model">
    </item>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>
