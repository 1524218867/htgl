<template>
  <div class="login-container">
    <!-- 背景视频 -->
    <video class="login-background-video" src="@/assets/bgmp4.mp4" autoplay loop muted playsinline></video>

    <!-- 带有Logo的盒子 -->
    <div class="login-content-box">
      <div class="login-logo-box">
        <h1>Logo</h1> <!-- 这里可以替换成实际的Logo -->
      </div>

      <div class="login-form-box card">
        <div class="login-info-box">
          <p>“此系统仅限授权管理员使用。未经授权的用户无法注册或登录。如果您需要访问权限，请联系管理员获取相应的授权。”</p>
        </div>

        <!-- 登录表单 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="top">
          <h2>登录</h2>
          <p>输入你的手机号和密码来登录账户</p>

          <!-- 手机号输入框 -->
          <el-form-item prop="phone">
            <el-input ref="phone" v-model="loginForm.phone" placeholder="手机号" name="phone" type="text"
              auto-complete="on" />
          </el-form-item>

          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
              placeholder="密码" name="password" auto-complete="on" />
            <!-- 显示/隐藏密码的图标 -->
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <button type="button" class="login-pushable" @click="handleLogin">
              <span class="login-shadow"></span>
              <span class="login-edge"></span>
              <span class="login-front">
                登录
              </span>
            </button>
            <!-- <el-button type="primary" class="BtnAft" @click="handleLogin" block>Sign in</el-button> -->
          </el-form-item>

          <!-- “没有账户？去注册”链接 -->
          <el-form-item class="login-register-link">
            <p>没有账户？<a @click="goToRegister">去注册</a></p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      // 表单数据模型
      loginForm: {
        phone: '',      // 手机号
        password: '',   // 密码
      },
      // 表单验证规则
      loginRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, // 手机号字段必填
          { pattern: /^[0-9]{11}$/, message: '请输入正确的手机号', trigger: 'blur' } // 手机号格式验证
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }, // 密码字段必填
          { min: 6, message: '密码至少需要6个字符', trigger: 'blur' } // 密码长度验证
        ],
      },
      loading: false, // 登录请求的加载状态
      passwordType: "password", // 密码输入框的类型（可见或不可见）

    };
  },
  methods: {
    // 切换密码的显示/隐藏状态
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs.password.focus(); // 切换后自动聚焦到密码输入框
      });
    },
    // 处理登录逻辑
    async handleLogin(event) {
      try {

        const response = await axios.post('http://localhost:5000/api/admin/login', {
          phone: this.loginForm.phone,
          password: this.loginForm.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(response.data);
        const { token, username } = response.data;

        // // 保存 token 到本地存储或 Vuex
        localStorage.setItem('token', token);
        if (username) {
          this.$store.commit('setUsername', username); // 提交 mutation 更新用户名
          this.$router.push('/home'); // 登录成功后跳转
        } else {
          console.error('登录失败');
        }

        // 跳转到登录前页面或默认首页
        this.$router.push("/");

      } catch (error) {
        console.error('登录失败:', error.response?.data || error.message);

      }


    },

    // 跳转到注册页面
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
/* 和注册页面保持一致的样式 */
.login-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.login-content-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
}

.login-logo-box {
  margin-bottom: 20px;
  text-align: center;
}

.login-form-box {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}

.el-form {
  padding: 30px 80px 30px 80px;
  background-color: #fff;
  border-radius: 0px 8px 8px 0px;
  width: 400px;
  text-align: center;
}

.login-info-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #1B3875;
  width: 400px;
  line-height: 30px;
  flex: 1;
  border-radius: 8px 0px 0px 8px;
  padding: 60px 40px 60px 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 1px solid #eee;
}

.el-form-item .el-input__inner {
  height: 40px;
}

.el-form-item {
  margin-bottom: 30px;
}

.card {
  transition: 0.5s ease-out;
  overflow: visible;
}

.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

/* 按钮样式，与注册页面一致 */
.login-pushable {
  position: relative;
  background: transparent;
  padding: 0px;
  border: none;
  cursor: pointer;
  outline-offset: 4px;
  outline-color: deeppink;
  transition: filter 250ms;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.login-shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: hsl(226, 25%, 69%);
  border-radius: 8px;
  filter: blur(2px);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.login-edge {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(to right,
      hsl(248, 39%, 39%) 0%,
      hsl(248, 39%, 49%) 8%,
      hsl(248, 39%, 39%) 92%,
      hsl(248, 39%, 29%) 100%);
}

.login-front {
  display: block;
  position: relative;
  border-radius: 8px;
  background: hsl(248, 53%, 58%);
  padding: 16px 32px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1rem;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.login-pushable:hover {
  filter: brightness(110%);
}

.login-pushable:hover .login-front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.login-pushable:active .login-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.login-pushable:hover .login-shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.login-pushable:active .login-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.login-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>