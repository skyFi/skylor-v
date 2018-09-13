<template>
  <div class="about">
    <h1>这里是一个关于页面</h1>
    <h5>需求投递：fangyongle@innobuddy.com</h5>
    <div class="setting">
      <div class="api">API： </div>
      <input type="text" v-model="api" @keyup.enter="changeApi">
      <div class="btn" @click="changeApi">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    api: localStorage.getItem('api') || CONFIG.api,
  }),
  methods: {
    changeApi() {
      localStorage.setItem('api', this.api);
      location.reload(true);
    },
  },
};
</script>
<style scoped lang="less">
  h1, h5 {
    padding: 64px;
    text-align: center;
    color: var(--color-minor);
  }
  .setting {
    display: flex;
    flex-direction: row;
    margin: 24px auto;
    height: 42px;
    width: 40%;

    .api {
      margin-right: 24px;
      height: 42px;
      line-height: 42px;
      font-weight: bold;
      user-select: none;
    }

    .btn {
      margin-left: 24px;
      padding: 0 16px;
      height: 42px;
      line-height: 42px;
      background-color: var(--color-primary);
      color: white;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all .2s;

      &:hover {
        opacity: .8;
      }
    }

    input {
      flex: 1;
      display: block;
      padding: 0 16px;
      height: 42px;
      border-radius: 6px;
      outline: none;
      border: 1px solid var(--color-border);
      transition: all .2s;

      &:hover {
        border: 1px solid var(--color-primary);
      }
    }
  }
</style>
