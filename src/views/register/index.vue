<template>
  <div class="login-container">
    <!-- 背景视频 -->
    <video class="background-video" src="@/assets/bgmp4.mp4" autoplay loop muted playsinline></video>

    <!-- 带有Logo的盒子 -->
    <div class="content-box">
      <div class="logo-box">
        <h1>Logo</h1> <!-- 这里可以替换成实际的Logo -->
      </div>

      <div class="form-box card">
        <!-- 表单 -->
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="top">
          <h2>今天就注册吧</h2>
          <p>输入你的邮箱并选择一个密码来设置你的账户</p>
          <el-form-item>
            <el-input v-model="loginForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="loginForm.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <button type="button" class="pushable" @click="submitForm('loginForm')">
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front">
                提交
              </span>
            </button>
          </el-form-item>
          <!-- 添加“已有账号？去登录”链接 -->
          <el-form-item class="login-link">
            <p>已有账号？<a @click="goToLogin">去登录</a></p>
          </el-form-item>
        </el-form>

        <!-- 右边透明的盒子 -->
        <div class="info-box">
          <p>“此系统仅限授权管理员使用。未经授权的用户无法注册或登录。如果您需要访问权限，请联系管理员获取相应的授权。”</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      loginForm: {
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[0-9]{11}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少需要6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.loginForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const formData = {
              username: this.loginForm.name,
              phone: this.loginForm.phone,
              password: this.loginForm.password
            };

            const response = await axios.post('http://localhost:5000/api/admin/register', formData);

            alert('注册成功');
            this.$router.push('/login');
            console.log('Response:', response.data);
          } catch (error) {
            console.error('注册失败:', error.response?.data || error.message);
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    goToLogin() {
      this.$router.push('/login'); // 跳转到登录页面
    }
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content-box {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
}

.logo-box {
  margin-bottom: 20px;
  text-align: center;
}

.form-box {
  display: flex;

  /* 修改为透明白色背景 */
  border-radius: 8px;
  overflow: hidden;
}

.el-form {
  padding: 30px 80px 30px 80px;
  background-color: #fff;
  border-radius: 8px 0 0 8px;
  width: 400px;
  text-align: center;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #1B3875;
  width: 400px;
  line-height: 30px;
  flex: 1;
  border-radius: 0 8px 8px 0;
  ;
  padding: 60px 40px 60px 40px;
  background-color: rgba(255, 255, 255, 0.7);
  /* 修改为白色透明色 */
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

/* From Uiverse.io by PriyanshuGupta28 */
.pushable {
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

.shadow {
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

.edge {
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

.front {
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

.pushable:hover {
  filter: brightness(110%);
}

.pushable:hover .front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.pushable:hover .shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>
