<template>
  <div>
    <div id="nav">
      <router-link to="/about">About</router-link>
      <div class="username">
        {{username}}，你好
        <icon class="logout" @click="logout" icon="sign-out-alt"></icon>
      </div>
    </div>
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  computed: {
    username() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.name || '';
    },
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
  methods: {
    logout() {
      this.$axios.logout();
      localStorage.clear();
      location.reload(true);
    },
  },
};
</script>
<style scoped lang="less">
  .username {
    align-self: flex-end;
  }
  .logout {
    margin-left: 8px;
    width: 16px;
    height: 16px;
    color: var(--color-patch);
    text-decoration: underline;
    cursor: pointer;
    transition: all .2s;

    &:hover {
      opacity: .8;
    }
  }

</style>
