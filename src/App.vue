<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
#app {
  height: 100%;
}
#nav {
  display: flex;
  flex-direction: row;
  padding: 16px 32px;
  box-shadow: 0 0 2px 0 var(--color-border);
  a {
    flex: 1;
    font-weight: bold;
    color: var(--color-main);
    &.router-link-exact-active {
      color: var(--color-primary);
    }
  }
}
</style>
