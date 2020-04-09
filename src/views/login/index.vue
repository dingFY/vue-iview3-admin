<template>
<div class="login">
  <div class="login-card">
    <Card>
        <p slot="title" class="login-header">欢迎登陆</p>
        <Form class="login-form" ref="loginForm" :model="formData" :rules="rules" @keydown.enter.native="handleSubmit">
          <FormItem prop="userName">
            <Input v-model="formData.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formData.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
          </FormItem>
        </Form>
        <p class="login-tip">输入任意用户名和密码即可</p>
      </Card>
  </div>
</div>
</template>
<script>
import { login } from "@/api/getData.js"
export default {
  data() {
    return {
      loding: false,
      formData: {
        userName: "",
        password: ""
      }
    };
  },
  computed: {
    rules() {
      return {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      };
    }
  },
  methods: {
    async handleSubmit() {
      // 先校验表单输入
      let flag = await this.$refs.loginForm.validate();
      if (!flag) return;

      try {
        this.loading = true;
        // 调用登录接口
        let { msg, data } = await login({
          userName: this.formData.userName,
          password: this.formData.password
        });
        this.$Message.success(msg);
        window.localStorage.setItem('token', data.token) // 登录成功后将后台返回的token存到localStorage
        // 跳回指的路由
        let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
        this.$router.push({path: redirectUrl})
      } catch (e) {
        this.$Message.error(e);
      } finally {
        this.loading = false;
      }

      // 无后台接口伪造数据
      // let token = "12345";
      // window.localStorage.setItem("token", token);
      // let redirectUrl = decodeURIComponent(this.$route.query.redirect || "/");
      // this.$router.push({ path: redirectUrl });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../../src/assets/images/bg.png");
  background-size: cover;
  background-position: center;
  position: relative;
  &-card {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    &-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>


