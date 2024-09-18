<template>
  <div class="comment-management">
    <div>
      <h2>评论管理</h2>
    </div>
    <div>

      <!-- 评论列表 -->
      <div v-if="comments.length > 0">
        <table class="comment-table">
          <thead>
            <tr>
              <th>评论ID</th>
              <th>文章标题</th>
              <th>文章作者</th>
              <th>作者</th>
              <th>内容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <!-- 显示评论列表 -->
            <tr v-for="(comment, index) in comments" :key="comment._id">
              <td>{{ comment._id }}</td>
              <td>{{ comment.article.title }}</td>
              <td>{{ comment.article.author }}</td>
              <td>{{ comment.author }}</td>
              <td>{{ comment.content }}</td>
              <td>
                <button class="delete-btn" @click="deleteComment(comment._id, index)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 没有评论时显示 -->
      <div v-else>
        <el-empty description="还没有评论哦！"></el-empty>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [] // 存储评论数据
    };
  },
  mounted() {
    // 获取所有评论
    this.fetchComments();
  },
  methods: {
    // 获取所有评论的请求
    async fetchComments() {
      try {
        const response = await axios.get('http://localhost:5000/api/comments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // 假设你将 token 存储在 localStorage 中
          }
        });
        this.comments = response.data;
        console.log(this.comments);
      } catch (error) {
        console.error('获取评论失败:', error);
      }
    },
    // 删除指定评论
    async deleteComment(commentId, index) {
      try {
        await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // 假设你将 token 存储在 localStorage 中
          }
        });
        this.comments.splice(index, 1); // 删除前端列表中的评论
        this.$notify({
          title: '成功',
          message: '删除评论成功',
          type: 'success'
        });
      } catch (error) {
        console.error('删除评论失败:', error);
      }
    }
  }
};
</script>
<style scoped>
.comment-management {
  height: 100%;

}

.comment-management>div:nth-child(2) {
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



.comment-table {
  width: 100%;


  border-collapse: separate;
  border-spacing: 0px 15px;
  /* 水平方向和垂直方向的间距 */
}




.comment-table tr {
  transition: background-color 0.3s ease;
  /* 添加过渡效果，使背景颜色变化更加平滑 */
}

.comment-table tr:hover {
  background-color: #f9f8f8;
  /* 鼠标悬停时的背景颜色 */
}

.comment-table button {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease;
  margin-right: 10px;
  /* 两个按钮之间的距离 */
}

.comment-table>thead {
  background-color: #F5F5F5;

}

.comment-table>thead>tr>th {
  padding: 12px;
  font-weight: 500;
  text-align: left;
  font-size: 13px;
}

.comment-table>thead>tr>th:first-child {

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  /* 左上角圆角 */

}

.comment-table>thead>tr>th:last-child {

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  /* 左上角圆角 */

}


.comment-table>tbody>tr>td {
  padding: 10px;
  font-size: 13px;
  position: relative;
}

.comment-table>tbody>tr>td::after {
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

.comment-table>tbody>tr>td:first-child {

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  /* 左上角圆角 */

}

.comment-table>tbody>tr>td:last-child {
  width: 20%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  /* 左上角圆角 */

}

.delete-btn {
  background-color: #f56c6c;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d9534f;
}

.el-empty {
  text-align: center;
  margin: 20px 0;
}

.el-empty .el-empty__description {
  font-size: 16px;
  color: #606266;
}
</style>