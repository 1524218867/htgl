<template>
    <div id="app">
        <div class="layout">
            <!-- 左侧菜单栏 -->
            <aside :class="{ 'sidebar-collapsed': isCollapsed }" class="sidebar">
                <div class="top-bar">
                    <!-- 折叠按钮 -->
                    <div class="collapse-button" @click="toggleCollapse">
                        <div class="icon" :class="{ 'icon-collapsed': isCollapsed, 'icon-expanded': !isCollapsed }">
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                    </div>

                    <!-- logo -->
                    <div class="logo-container" :class="{ 'hidden': isCollapsed }">
                        <img src="../../assets/logo.png" />
                        <span class="logo">后台管理</span>
                    </div>
                </div>

                <!-- 菜单 -->
                <ul class="menu" :class="{ 'collapsed': isCollapsed }">
                    <li :class="{ 'active': isActive('/user') }">
                        <router-link to="/user" @click.native="setActive('/user')">
                            <div class="menu-item">

                                <svg t="1725587979501" class="menu-icon home-icon icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2588" width="200" height="200">
                                    <path
                                        d="M727.04 931.84c-20.48 0-40.96-15.36-40.96-40.96v-87.04c0-35.84-15.36-66.56-40.96-92.16s-56.32-40.96-92.16-40.96H215.04c-35.84 0-66.56 15.36-92.16 40.96s-40.96 56.32-40.96 92.16v87.04c0 20.48-15.36 40.96-40.96 40.96s-40.96-15.36-40.96-40.96v-87.04c0-56.32 20.48-107.52 61.44-148.48 40.96-40.96 92.16-61.44 148.48-61.44h343.04c56.32 0 107.52 20.48 148.48 61.44 40.96 40.96 61.44 92.16 61.44 148.48v87.04c0 25.6-15.36 40.96-35.84 40.96zM384 506.88c-117.76 0-209.92-92.16-209.92-209.92s92.16-209.92 209.92-209.92 209.92 92.16 209.92 209.92-92.16 209.92-209.92 209.92z m0-343.04c-71.68 0-133.12 61.44-133.12 133.12s61.44 133.12 133.12 133.12 133.12-61.44 133.12-133.12-61.44-133.12-133.12-133.12zM983.04 931.84c-20.48 0-40.96-15.36-40.96-40.96v-87.04c0-30.72-10.24-56.32-25.6-81.92s-40.96-40.96-71.68-46.08c-20.48-5.12-30.72-25.6-25.6-46.08s25.6-30.72 46.08-25.6c46.08 10.24 87.04 35.84 112.64 76.8 30.72 35.84 46.08 81.92 46.08 128v87.04c-5.12 20.48-20.48 35.84-40.96 35.84zM680.96 501.76c-15.36 0-30.72-10.24-35.84-30.72-5.12-20.48 5.12-40.96 25.6-46.08 30.72-5.12 56.32-25.6 71.68-46.08 20.48-25.6 25.6-51.2 25.6-81.92s-10.24-56.32-25.6-81.92-40.96-40.96-71.68-46.08c-20.48-5.12-30.72-25.6-25.6-46.08s25.6-30.72 46.08-25.6c46.08 10.24 87.04 35.84 112.64 76.8 30.72 35.84 46.08 81.92 46.08 128s-15.36 92.16-46.08 128-66.56 61.44-112.64 76.8c0-5.12-5.12-5.12-10.24-5.12z"
                                        fill="#2c2c2c" p-id="2589"></path>
                                </svg>
                                <span class="menu-text">用户管理</span>
                            </div>
                        </router-link>
                    </li>
                    <li :class="{ 'active': isActive('/articles') }">
                        <router-link to="/articles" @click.native="setActive('/articles')">
                            <div class="menu-item">

                                <svg class="menu-icon login-icon icon" t="1725588179165" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3655" width="200" height="200">
                                    <path
                                        d="M743.168 85.333333c-24.618667-24.661333-68.010667-42.666667-102.826667-42.666666H238.933333C176.810667 42.666667 128 95.744 128 159.573333v704.853334C128 928.213333 176.896 981.333333 238.933333 981.333333h546.133334c62.08 0 110.933333-53.162667 110.933333-116.864V298.965333c0-34.986667-17.877333-78.336-42.538667-103.082666l-110.293333-110.506667z m-60.416 60.288l110.293333 110.506667c8.661333 8.746667 17.621333 30.421333 17.621334 42.837333V864.426667c0 18.090667-12.373333 31.530667-25.6 31.530666H238.933333c-13.226667 0-25.6-13.397333-25.6-31.573333V159.573333c0-18.218667 12.288-31.573333 25.6-31.573333h401.365334c12.16 0 33.834667 8.96 42.453333 17.621333z"
                                        p-id="3656"></path>
                                    <path
                                        d="M341.333333 554.666667h170.666667a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 682.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 810.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM853.333333 256h-127.786666A42.794667 42.794667 0 0 1 682.666667 213.12V85.333333a42.666667 42.666667 0 0 0-85.333334 0v127.786667A128.128 128.128 0 0 0 725.546667 341.333333H853.333333a42.666667 42.666667 0 0 0 0-85.333333z"
                                        p-id="3657"></path>
                                    <path
                                        d="M298.666667 256.426667C298.666667 232.576 317.568 213.333333 341.76 213.333333h84.48c23.808 0 43.093333 18.901333 43.093333 43.093334v84.48C469.333333 364.757333 450.432 384 426.24 384H341.76C317.909333 384 298.666667 365.098667 298.666667 340.906667V256.426667z"
                                        p-id="3658"></path>
                                </svg>
                                <span class="menu-text">文章管理</span>
                            </div>
                        </router-link>
                    </li>
                    <li :class="{ 'active': isActive('/comments') }">
                        <router-link to="/comments" @click.native="setActive('/comments')">
                            <div class="menu-item">

                                <svg t="1725589074104" class="menu-icon register-icon icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3934" width="200" height="200">
                                    <path
                                        d="M465.4 676.4c-8 0-15.8 2.1-22.7 6.1l-131.2 75.8c-17.6 10.1-39.8 1.3-45.9-18.3l-2.6-8.4c-10.2-32.9-40.2-55.2-74.1-55.2h-48.4c-7.6 0-14.4-8.1-16.9-11.6-8.4-11.4-13.1-27.9-13.1-45.3V170.3c0-17.4 4.8-33.9 13.1-45.3 2.6-3.5 9.3-11.6 16.9-11.6h743.9c7.6 0 14.4 8.1 16.9 11.6 8.4 11.4 13.2 27.9 13.2 45.3v394.5c0 11.6 9.2 20.9 20.6 20.9h4.8c11.4 0 20.6-9.4 20.6-20.9V170.3c0-57.2-34.1-103.7-76.1-103.7h-744c-42 0-76.1 46.4-76.1 103.7v449.2c0 57.2 34.1 103.7 76.1 103.7h48.4c13.8 0 26.1 9.1 30.3 22.5l19.8 63.5c6.1 19.6 28.4 28.5 45.9 18.3l173.4-100.1c4.8-2.8 10.2-4.2 15.7-4.2h81.7c11.4 0 20.6-9.4 20.6-20.9v-4.9c0-11.6-9.2-20.9-20.6-20.9h-90.2z"
                                        p-id="3935" fill="#2c2c2c"></path>
                                    <path
                                        d="M749.9 308h-575c-22.1 0-39.5-18-39.5-41s17.3-40.9 39.5-40.9h575c22.1 0 39.5 18 39.5 40.9 0 23-17.3 41-39.5 41z m-568.1-39.1zM749.9 448.8h-575c-22.1 0-39.5-18.5-39.5-42s17.3-42 39.5-42h575c22.1 0 39.5 18.4 39.5 42 0 23.5-17.3 42-39.5 42z m0-41.2zM559.6 591.3h-390c-19.8 0-34.2-17.4-34.2-41.5 0-24 14.4-41.5 34.2-41.5h390c19.8 0 34.2 17.4 34.2 41.5s-14.4 41.5-34.2 41.5z m0-40.6z"
                                        p-id="3936" fill="#2c2c2c"></path>
                                    <path
                                        d="M796.3 742.8c-29.5 0-53.5 24-53.5 53.5s24 53.5 53.5 53.5 53.5-24 53.5-53.5c0-29.6-24-53.5-53.5-53.5z m0 81c-15.2 0-27.5-12.3-27.5-27.5 0-15.1 12.3-27.5 27.5-27.5s27.5 12.3 27.5 27.5c0 15.1-12.3 27.5-27.5 27.5z"
                                        p-id="3937" fill="#2c2c2c"></path>
                                    <path
                                        d="M922.2 744.5l1.3-1.3c6.8-6.8 10.5-15.8 10.5-25.4 0-9.6-3.7-18.6-10.5-25.4l-23.1-23.1c-6.8-6.8-15.8-10.5-25.4-10.5s-18.6 3.7-25.4 10.5l-1.3 1.3c-3.2-21.2-21.5-37.6-43.6-37.6h-16.3c-22.1 0-40.5 16.3-43.6 37.6l-1.3-1.3c-6.8-6.8-15.8-10.5-25.4-10.5-9.6 0-18.6 3.7-25.4 10.5l-23.1 23.1c-6.8 6.8-10.5 15.8-10.5 25.4 0 9.6 3.7 18.7 10.5 25.4l1.3 1.3c-21.2 3.2-37.6 21.5-37.6 43.6v16.3c0 22.1 16.3 40.5 37.6 43.6l-1.3 1.3c-6.8 6.8-10.5 15.8-10.5 25.4 0 9.6 3.7 18.6 10.5 25.4l23.1 23.1c6.8 6.8 15.8 10.5 25.4 10.5 9.6 0 18.6-3.7 25.4-10.5l1.3-1.3c3.2 21.2 21.5 37.6 43.6 37.6h16.3c22.1 0 40.5-16.3 43.6-37.6l1.3 1.3c6.8 6.8 15.8 10.5 25.4 10.5 9.6 0 18.6-3.7 25.4-10.5l23.1-23.1c7.3-7.3 11-17.1 10.5-27.5-0.5-9-4.6-17.4-10.9-23.8l-0.8-0.8c21.2-3.2 37.6-21.5 37.6-43.6v-16.3c-0.1-22.1-16.5-40.5-37.7-43.6z m11.6 59.9c0 10-8.2 18.1-18.3 18.1-8.7 0-16.4 5.3-19.6 13.4-0.3 0.9-0.7 1.7-1.1 2.5-3.5 8.1-1.7 17.2 4.5 23.4l5.6 5.6c1.7 1.7 2.8 3.8 3 6.2 0.3 3.1-0.7 5.9-2.9 8l-23 23.3c-1.9 1.9-4.3 2.9-7 2.9s-5.1-1-7-2.9l-5.8-5.8c-6.2-6.2-15.5-7.9-23.6-4.4l-2.1 0.9c-8.2 3.2-13.6 10.9-13.7 19.6-0.1 10.1-8 18.3-18.1 18.3h-16.3c-10 0-18.1-8.1-18.1-18.1 0-8.8-5.4-16.6-13.6-19.8-0.7-0.3-1.4-0.6-2.2-0.9-2.8-1.2-5.8-1.8-8.7-1.8-5.5 0-10.9 2.1-14.9 6.2l-5.8 5.8c-1.9 1.9-4.3 2.9-7 2.9s-5.1-1-7-2.9L688 881.8c-1.9-1.9-2.9-4.3-2.9-7s1-5.1 2.9-7l5.8-5.8c6.2-6.2 7.9-15.5 4.4-23.6l-0.9-2.1c-3.2-8.2-10.9-13.6-19.6-13.7-10.1-0.1-18.4-8-18.4-18.1v-16.3c0-10.1 8.3-18 18.4-18.1 8.7-0.1 16.4-5.4 19.6-13.7l0.9-2.1c3.6-8.1 1.8-17.4-4.4-23.6l-5.8-5.8c-1.9-1.9-2.9-4.3-2.9-7s1-5.1 2.9-7l23.1-23.1c1.9-1.9 4.3-2.9 7-2.9s5.1 1 7 2.9l5.8 5.8c6.2 6.2 15.5 8 23.6 4.4l2.1-0.9c8.2-3.2 13.6-10.9 13.7-19.6 0.1-10.1 8-18.3 18.1-18.3h16.3c10 0 18.1 8.1 18.1 18.1 0 8.8 5.4 16.6 13.7 19.8l2.1 0.9c8.1 3.6 17.4 1.8 23.6-4.4l5.8-5.8c1.9-1.9 4.3-2.9 7-2.9s5.1 1 7 2.9l23.1 23.1c1.9 1.9 2.9 4.3 2.9 7s-1 5.1-2.9 7l-5.8 5.8c-6.2 6.2-7.9 15.5-4.4 23.6l0.9 2.1c3.2 8.3 11 13.6 19.8 13.6 10 0 18.1 8.1 18.1 18.1v16.3z"
                                        p-id="3938" fill="#2c2c2c"></path>
                                </svg>
                                <span class="menu-text">评论管理</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </aside>

            <!-- 主体内容区域 -->
            <div class="main">
                <header class="header">
                    <div class="header-content">
                        <div class="user-info" @mouseenter="showLogout = true" @mouseleave="showLogout = false">
                            <span>欢迎，用户 {{ username }}</span>
                            <!-- 当鼠标悬停时显示退出按钮 -->
                            <button class="logout-btn" @click="logout">退出</button>
                        </div>
                    </div>
                </header>

                <main>
                    <!-- 路由内容 -->
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

  
<script>
export default {
    name: 'App',
    data() {
        return {
            isCollapsed: false,
            activePath: '/', // 默认值

        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;

        },
        setActive(path) {
            this.activePath = path;
        },
        isActive(path) {
            return this.activePath === path;
        },
        logout() {
            // 清除本地存储的 token
            localStorage.removeItem('token');
            this.$store.commit('setUsername', '');  // 清空 Vuex 中的用户名
            // 重定向到登录页面
            this.$router.push('/login');
        },

    },

    created() {

        // 初始化 activePath 为当前路由路径，确保刷新时正确高亮按钮
        this.activePath = this.$route.path || '/'; // 如果 $route.path 为空，使用 '/user'
        // 如果当前路由不是 /user，强制重定向到 /user
        if (this.$route.path !== '/user') {
            console.log("页面刷新，重定向到 /user");
            this.$router.replace('/user');
        }

    },
    watch: {
        // 监听路由变化，更新 activePath，确保高亮正确
        $route(to) {
            this.activePath = to.path;
        }
    },
    computed: {
        username() {
            return this.$store.state.username; // 从 Vuex 中获取用户名
        }

    }
}
</script>



<style>
/* 通用设置 */
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.layout {
    display: flex;
}

/* ========== 左侧菜单栏 ========== */
.logo-container {
    display: inline-flex;
    /* 使用 inline-flex 来保持 inline-block 特性同时使用 flexbox */
    align-items: center;
    /* 纵向居中对齐 */
    justify-content: center;
    /* 横向居中对齐 */
    min-width: 150px;
}

.logo-container>img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
}

.sidebar {
    width: 256px;
    box-sizing: border-box;
    /* 默认宽度 */
    background-color: #FFFFFF;
    color: #000000;
    min-height: 100vh;
    padding: 20px;
    border-right: 3px solid #F2F2F2;
    transition: width 0.3s ease, padding 0.3s ease;
    position: relative;
}

.sidebar-collapsed {
    width: 60px;
    /* 折叠后的宽度 */
    padding: 10px;
}

/* 顶部工具栏 */
.top-bar {
    min-width: 213px;
    height: 54px;

    margin-bottom: 20px;

}

.collapse-button {


    cursor: pointer;
    display: inline-flex;
    /* 使用 inline-flex 来保持 inline-block 特性同时使用 flexbox */
    align-items: center;
    /* 纵向居中对齐 */
    justify-content: center;
    /* 横向居中对齐 */
    float: left;
    height: 100%;
    width: 60px;
    /* 让容器的高度继承自父元素 */
}

/* 初始状态：横向的三条杠，带圆角 */
.icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    /* 每个条的间距 */
    cursor: pointer;
}

.bar {
    width: 20px;
    height: 4px;
    background-color: black;
    border-radius: 2px;
    /* 两端圆角 */
    transition: transform 0.3s ease, top 0.3s ease;
}

/* 折叠状态：竖向的三条杠 */
.icon-collapsed .bar:nth-child(1) {
    transform: rotate(90deg) translateY(10px);
    /* 上面的杠变竖 */
}

.icon-collapsed .bar:nth-child(2) {
    transform: rotate(90deg);
    /* 中间的杠保持竖向 */
}

.icon-collapsed .bar:nth-child(3) {
    transform: rotate(90deg) translateY(-10px);
    /* 下面的杠变竖 */
}




.logo {
    font-size: 20px;
    font-weight: bold;
    transition: opacity 0.3s ease;
}

.hidden {
    z-index: -2;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.31, 0, 0, 1);

}

.user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logout-btn {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    /* 使按钮与用户名之间有间距 */
    transition: background-color 0.3s, color 0.3s;
}

.logout-btn:hover {
    background-color: #f0f0f0;
    color: #333;
}

/* ========== 菜单 ========== */
.menu {
    list-style: none;
    padding: 0;
    transition: opacity 0.3s ease;
    position: relative;
    /* 为绝对定位的子元素提供参考 */
}

.menu li {
    margin: 10px 0;
    position: relative;
    /* 为子元素提供绝对定位的参考 */
}

.menu a {
    display: flex;
    align-items: center;
    color: #000000;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.menu a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* 主图标 */
.menu-icon {
    font-size: 20px;

    transition: margin-right 0.3s ease;
}

/* 文字 */
.menu-text {
    opacity: 1;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s ease, max-width 0.3s ease;
    margin-left: 30px;
}

.menu-item {


    display: flex;
    align-items: center;
    justify-content: center;
    /* 垂直居中 */
}

/* 折叠状态 */
.menu.collapsed .menu-text {
    position: absolute;
    /* 让文本绝对定位 */
    height: 0;
    /* 高度为0 */
    opacity: 0;
    /* 完全透明 */
    max-width: 0;
    /* 最大宽度为0 */
    transition: opacity 0.3s ease, max-width 0.3s ease;
}


.menu.collapsed .menu-icon {
    margin-right: 0;
    /* 折叠时移除图标右边距 */
}

/* 折叠状态下显示的额外图标 */
.collapsed-icon {
    font-size: 20px;
    position: absolute;
    right: 10px;
    /* 调整位置根据需要 */
    opacity: 0;
    transition: opacity 0.3s ease;
}

.menu.collapsed .collapsed-icon {
    opacity: 1;
}


/* 折叠后显示的图标 */
.collapsed-icon {
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.menu.collapsed .collapsed-icon {
    opacity: 1;
}

.menu .active a {
    background-color: #F5F5F5;
}

/* ========== 主体内容 ========== */
.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
}

.header {
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.header-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}






main {
    padding: 20px;
    flex: 1;
}
</style>
