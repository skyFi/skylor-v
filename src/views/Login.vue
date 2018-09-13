<template>
  <div class="container">
    <h1>Skylor Vue Project</h1>
    <h3>v{{version}} <span class="copy-right">contact: &lt;qq:1292736382&gt;</span></h3>
    <div class="login-form-box">
      <input type="text" v-model="account" placeholder="手机号">
      <div class="captcha-box">
        <input type="text" v-model="captcha" placeholder="验证码">
        <a
          :class="{'send-btn': true, 'no-event': captchaGap !== 0}"
          @click="sendCaptcha"
        >
          {{ captchaGap === 0 ? '发送验证码' : `${captchaGap}s` }}
        </a>
      </div>
      <button @click="login">
        登录
      </button>
    </div>
  </div>
</template>

<script>
import pkj from '../../package';

export default {
  data: () => ({
    version: pkj.version,
    account: '',
    captcha: '',
    captchaGap: 0,
  }),
  async created() {
    this.$router.push('home');
  },
  methods: {
    // 登录
    async login() {
      const res = await this.$axios.login({
        account: this.account,
        captcha: this.captcha,
      });
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('ticket', res.ticket);
        location.reload();
      }
    },
    // 发送验证码
    async sendCaptcha() {
      if (this.captchaGap === 0 && this.$le.isPhoneNum(this.account)) {
        await this.$axios.sendCaptcha(this.account);
        this.captchaGap = 10;
        this.subCaptchaGap();
      } else {
        this.$toasted.error('请输入正确的手机号');
      }
    },
    // 验证码倒计时
    subCaptchaGap() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(() => {
          this.captchaGap--;
          if (this.captchaGap === 0) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="less">
  .container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  .copy-right {
    font-size: 12px;
    color: var(--color-main);
  }
  .login-form-box {
    margin: 64px auto 0;
    width: 280px;

    .captcha-box {
      position: relative;

      input {
        padding-right: 75px;
      }

      .no-event {
        color: var(--color-minor) !important;
        pointer-events: none;
      }

      .send-btn {
        position: absolute;
        margin: auto 0;
        right: 8px;
        top: 0;
        bottom: 0;
        height: 14px;
        font-size: 12px;
        line-height: 14px;
        color: var(--color-primary);
        cursor: pointer;
        transition: all .2s;

        &:hover {
          opacity: .8;
        }
      }
    }
    input {
      display: block;
      width: 100%;
      height: 42px;
      border: none;
      outline: none;
      border-bottom: 1px var(--color-border) solid;
      transition: all .2s;

      &:focus {
        border: none;
        outline: none;
        border-bottom: 1px var(--color-primary) solid;
      }
    }

    button {
      width: 100%;
      margin-top: 32px;
      padding: 5px 16px;
      outline: none;
      border: none;
      background-color: var(--color-primary);
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
