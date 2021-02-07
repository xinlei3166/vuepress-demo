<template>
  <component v-if="dynamicComponent" :is="dynamicComponent">
    <slot/>
    <template slot="description">
      <slot name="description"/>
    </template>
    <template slot="highlight">
      <slot name="highlight"/>
    </template>
  </component>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted () {
    import('./demo-code-block.vue').then(module => {
      this.dynamicComponent = module.default
    })
  }
}
</script>

<style scoped>

</style>
