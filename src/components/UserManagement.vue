<template>
    <div class="user-management">
        <div>
            <h2>用户管理</h2>
        </div>
        <div>

            <!-- 用户列表 -->
            <table class="user-table" v-if="users.length > 0">
                <thead>
                    <tr>
                        <th>用户编号</th>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <button class="edit-btn" @click="openEditDialog(user)">编辑</button>
                            <button class="delete-btn" @click="deleteUser(index)">删除</button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <!-- 提示信息 -->
            <div v-else class="no-users-message">
                <el-empty description="什么都没有呀！"></el-empty>
            </div>
            <!-- 分页 -->
            <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize"
                :total="totalUsers" layout="total, prev, pager, next" class="pagination" v-if="users.length > 0">
            </el-pagination>

            <!-- 编辑弹出框 -->
            <div v-if="isEditDialogVisible" class="edit-dialog-overlay" @click.self="closeEditDialog">
                <transition name="fade">
                    <div class="dialog-content">
                        <h3>编辑用户</h3>
                        <label for="name">用户名</label>
                        <input v-model="editedUser.username" id="name" type="text" />

                        <label for="email">邮箱</label>
                        <input v-model="editedUser.email" id="email" type="email" />

                        <label for="password">密码</label>
                        <input v-model="editedUser.password" id="password" type="password" />

                        <div class="dialog-buttons">
                            <button class="save-btn" @click="saveEdit">保存</button>
                            <button class="cancel-btn" @click="closeEditDialog">取消</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
export default {
    name: 'UserManagement',
    data() {
        return {
            users: [],  // 存储用户数据的数组，初始时为空
            isEditDialogVisible: false,  // 控制编辑对话框是否可见
            editedUser: { username: '', email: '', password: '' }, // 用于存储正在编辑的用户信息
            editingIndex: null, // 当前编辑用户在 `users` 数组中的索引
            currentPage: 1, // 当前页码
            pageSize: 5, // 每页显示的用户数量

        };
    },
    computed: {
        // 计算总用户数
        totalUsers() {
            return this.users.length;
        },
        // 计算当前页显示的用户
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.pageSize; // 当前页开始的索引
            const end = start + this.pageSize; // 当前页结束的索引
            return this.users.slice(start, end); // 返回当前页的用户数据
        }
    },
    methods: {
        // 获取用户数据的方法
        async fetchUsers() {
            try {
                // 发送 GET 请求获取用户数据，使用 token 进行认证
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                // 处理数据，将 _id 转换为 id，生成编号
                this.users = response.data.map((user, index) => ({
                    id: index + 1, // 用户编号
                    _id: user._id,          // 真实的用户标识符
                    username: user.username,
                    email: user.email,
                }));

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Token 过期，可能需要刷新 token 或重定向到登录页
                    console.error('Token 过期或无效，请重新登录');
                    // 例如，清除本地 token 并重定向到登录页面
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } else {
                    console.error('请求失败:', error);
                }
            }

        },
        // 打开编辑对话框
        openEditDialog(user) {
            this.isEditDialogVisible = true;
            this.editedUser = { ...user, _id: user._id }; // 确保 _id 被正确传递
            this.editingIndex = this.users.findIndex(u => u._id === user._id);
        },

        // 关闭编辑对话框

        // 保存编辑后的用户信息
        async saveEdit() {
            console.log(this.editedUser);
            try {
                // 使用真实的 _id 进行用户更新
                const response = await axios.put(`http://localhost:5000/api/users/${this.editedUser._id}`, this.editedUser, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }  // 传递 token
                });
                const updatedUser = response.data;
                // 更新用户列表
                const userIndex = this.users.findIndex(user => user._id === updatedUser._id);
                if (userIndex !== -1) {
                    Vue.set(this.users, userIndex, {
                        id: this.users[userIndex].id, // 保持原来的用户编号
                        _id: updatedUser._id,
                        username: updatedUser.username,
                        email: updatedUser.email
                    });
                }
                // 清除编辑对话框中的数据
                this.closeEditDialog();
                this.$message({
                    message: '修改成功!',
                    type: 'success'
                });
            } catch (error) {
                console.error('保存用户数据失败:', error); // 处理错误
            }
        },
        closeEditDialog() {
            this.isEditDialogVisible = false; // 隐藏编辑对话框
            this.editedUser = { username: '', email: '', password: '' }; // 重置 `editedUser` 中的信息
        },
        async deleteUser(index) {
            try {
                // 获取用户的真实标识符 `_id`
                const userId = this.users[index]._id;

                // 发送 DELETE 请求删除用户
                await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                // 从 `users` 数组中移除已删除的用户
                this.users.splice(index, 1);
                this.$message({
                    message: '删除成功!',
                    type: 'success'
                });
            } catch (error) {
                console.error('删除用户失败:', error);
            }
        },

        // 处理分页的页码变化
        handlePageChange(page) {
            this.currentPage = page; // 更新当前页码
        }
    },
    mounted() {
        this.fetchUsers(); // 组件挂载时获取用户数据
    }
};
</script>


<style scoped>
.user-management {
    height: 100%;

}

.user-management>div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
}

.user-table {
    width: 100%;


    border-collapse: separate;
    border-spacing: 0px 15px;
    /* 水平方向和垂直方向的间距 */
}




.user-table tr {
    transition: background-color 0.3s ease;
    /* 添加过渡效果，使背景颜色变化更加平滑 */
}

.user-table tr:hover {
    background-color: #f9f8f8;
    /* 鼠标悬停时的背景颜色 */
}

.user-table button {
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.2s ease;
    margin-right: 10px;
    /* 两个按钮之间的距离 */
}

.user-table>thead {
    background-color: #F5F5F5;

}

.user-table>thead>tr>th {
    padding: 12px;
    font-weight: 500;
    text-align: left;
    font-size: 13px;
}

.user-table>thead>tr>th:first-child {

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    /* 左上角圆角 */

}

.user-table>thead>tr>th:last-child {

    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    /* 左上角圆角 */

}


.user-table>tbody>tr>td {
    padding: 10px;
    font-size: 13px;
    position: relative;
}

.user-table>tbody>tr>td::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #ddd;
    /* 分割线颜色 */
    position: absolute;
    bottom: -8px;
    left: 0;
}

.user-table>tbody>tr>td:first-child {

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    /* 左上角圆角 */

}

.user-table>tbody>tr>td:last-child {
    width: 20%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    /* 左上角圆角 */

}

.edit-btn {
    background-color: white;
    color: black;
    border: 1px solid #dcdfe6;
    /* 添加边框，使按钮更显眼 */
}

.edit-btn:hover {
    background-color: #f5f5f5;
    /* 悬停时的背景颜色 */
}

.delete-btn {
    background-color: #f56c6c;
    color: white;
    border: 1px solid #f56c6c;
}

.delete-btn:hover {
    background-color: #e74c3c;
    /* 悬停时的背景颜色 */
}

.edit-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    /* 增加宽度 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dialog-content h3 {
    margin-bottom: 15px;
}

.dialog-content label {
    display: block;
    margin-top: 10px;
}

.dialog-content input {
    width: calc(100% - 20px);
    /* 减去左右 padding 的宽度 */
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 14px;
}

.dialog-buttons {
    display: flex;
    justify-content: flex-end;
}

.dialog-buttons button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 10px;
    /* 增加按钮之间的距离 */
}

.save-btn {
    background-color: #42b983;
    color: white;
}

.cancel-btn {
    background-color: #e74c3c;
    color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.pagination {
    margin-top: 20px;
    text-align: center;
}
</style>
