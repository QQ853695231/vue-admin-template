<template>
  <div class="preview-container">
    <ul class="infinite-list" v-infinite-scroll="load">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>

</template>

<script>
    export default {
        data () {
            return {
                count: 0
            }
        },
        methods: {
            load () {
                this.count += 2
            }
        }
    }
</script>

<style lang="scss" scoped>
  .preview-container {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: auto;

  }
</style>
