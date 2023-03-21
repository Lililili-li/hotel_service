<template>
  <div class="login-container">
    <div class="login-width">
      <div class="left-panel">
        <div class="logo"><img src="../../assets/image/logo.png" width="45"></div>
        <div class="slogan"><span>---- 酒店后台管理系统</span></div>
      </div>
      <div class="login">
        <h2>登录</h2>
        <!-- <a-form :model="" @submit="">
          <a-form-item field="username" :hide-label="true"
            :rules="[{ required: true, message:  '11'}]">
            <a-input v-model="" class="w-full" size="large"
              :placeholder="123123" allow-clear>
              <template #prefix><icon-user /></template>
            </a-input>
          </a-form-item>

          <a-form-item field="password" :hide-label="true"
            :rules="[{ required: true, message: '11' }]">
            <a-input-password v-model="" :placeholder="" size="large"
              allow-clear>
              <template #prefix><icon-lock /></template>
            </a-input-password>
          </a-form-item>

          <a-form-item field="code" :hide-label="true"
            :rules="[{ required: true, match: /^[a-zA-Z0-9]{4}$/, message: '11' }]">
            <a-input v-model="" :placeholder="" size="large"
              allow-clear>
              <template #prefix><icon-safe /></template>
              <template #append>
                <verify-code ref="Verify" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item :hide-label="true" class="mt-5">
            <a-button html-type="submit" type="primary" long size="large">
              {{  }}
            </a-button>
          </a-form-item>

          <a-divider orientation="center" class="register">{{  }}</a-divider>
          <div class="flex w-3/4 pt-2 mx-auto items-stretch justify-around">
            <a-avatar class="other-login wechat"><icon-wechat /></a-avatar>
            <a-avatar class="other-login alipay"><icon-alipay-circle /></a-avatar>
            <a-avatar class="other-login qq"><icon-qq /></a-avatar>
            <a-avatar class="other-login weibo"><icon-weibo /></a-avatar>
          </div>
        </a-form> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(@/assets/image/BingWallpaper.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-width {
    width: 950px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;

    .login {
      flex: 1;
      background-color: #fff;
      height: 491px;
      padding:0 20px 40px 20px;
      box-sizing: border-box;
      h2 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
      }
    }
  }

  .left-panel {
    height: 491px;
    background-image: url(@/assets/image/login_picture.svg);
    background-repeat: no-repeat;
    background-position: center 60px;
    background-size: contain;
    flex: 1;
    background-color: rgba(239, 246, 255, 1);
    padding: 20px;
    box-sizing: border-box;
  }

  .logo {
    display: flex;
    color: #333;

    span {
      font-size: 28px;
      margin-left: 15px;
      color: rgb(var(--primary-6));
    }
  }

  .slogan {
    font-size: 16px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
  }

}</style>
