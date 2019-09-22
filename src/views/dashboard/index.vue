<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ userInfo() }}</div>
  </div>
</template>

<script>
    import {getUserInfo} from '@/utils/auth'

    export default {
        name: 'Dashboard',
        methods: {
            userInfo() {
                return getUserInfo().displayName;
            }
        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
