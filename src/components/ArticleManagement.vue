<template>
    <div class="article-management">
        <h2>文章管理</h2>
        <!-- 文章列表 -->
        <table class="article-table" v-if="articles.length">
            <thead>
                <tr>
                    <th>文章编号</th>
                    <th>标题</th>
                    <th>内容摘要</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(article, index) in paginatedArticles" :key="article._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ article.title }}</td>
                    <td>{{ article.content.substring(0, 50) }}...</td>
                    <td>
                        <button class="edit-btn" @click="openEditDialog(article)">编辑</button>
                        <button class="delete-btn" @click="deleteArticle(article._id, index)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 无文章时的提示 -->
        <div v-else>
            <el-empty description="还没有文章哦！"></el-empty>
        </div>

        <!-- 分页 -->
        <el-pagination v-if="articles.length" @current-change="handlePageChange" :current-page="currentPage"
            :page-size="pageSize" :total="totalArticles" layout="total, prev, pager, next" class="pagination">
        </el-pagination>

        <!-- 编辑弹出框 -->
        <div v-if="isEditDialogVisible" class="edit-dialog-overlay" @click.self="closeEditDialog">
            <transition name="fade">
                <div class="dialog-content">
                    <h3>编辑文章</h3>
                    <label for="title">标题</label>
                    <input v-model="editedArticle.title" id="title" type="text" />

                    <label for="content">内容</label>
                    <div class="editor-container">
                        <quill-editor v-model="editedArticle.content" ref="quillEditor"
                            :options="editorOptions"></quill-editor>
                    </div>

                    <div class="dialog-buttons">
                        <button class="save-btn" @click="saveEdit">保存</button>
                        <button class="cancel-btn" @click="closeEditDialog">取消</button>
                    </div>
                </div>

            </transition>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            articles: [],
            currentPage: 1,
            pageSize: 10,
            totalArticles: 0,
            isEditDialogVisible: false,
            editedArticle: {},
            editorOptions: {
                theme: 'snow',
                placeholder: '请在这里输入文章内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // 加粗、斜体、下划线、删除线
                        ['blockquote', 'code-block'],
                        [{ header: 1 }, { header: 2 }], // 标题
                        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                        [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        [{ direction: 'rtl' }], // 文本方向
                        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }], // 字体颜色、背景颜色
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'] // 清除格式
                    ]
                }
            }
        };
    },
    computed: {
        paginatedArticles() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.articles.slice(start, end);
        }
    },
    methods: {
        async fetchArticles() {
            try {
                const response = await axios.get('http://localhost:5000/api/articles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // 假设你将 token 存储在 localStorage 中
                    }
                });
                this.articles = response.data; // 接收到的文章列表
                this.totalArticles = this.articles.length;
            } catch (error) {
                console.error('获取文章失败:', error);
            }
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        openEditDialog(article) {
            this.editedArticle = { ...article }; // 克隆文章对象
            this.isEditDialogVisible = true;
        },
        closeEditDialog() {
            this.isEditDialogVisible = false;
        },
        async saveEdit() {
            try {
                const response = await axios.put(`http://localhost:5000/api/articles/${this.editedArticle._id}`, this.editedArticle,

                    {

                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}` // 假设你将 token 存储在 localStorage 中
                        }
                    }
                );
                const updatedArticle = response.data;

                // 更新本地 articles 数组
                const index = this.articles.findIndex(article => article._id === updatedArticle._id);
                if (index !== -1) {
                    this.$set(this.articles, index, updatedArticle);
                }

                this.closeEditDialog();
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                });
            } catch (error) {
                console.error('保存文章失败:', error);
            }
        },
        async deleteArticle(articleId, index) {
            try {
                await axios.delete(`http://localhost:5000/api/articles/${articleId}`, {

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // 假设你将 token 存储在 localStorage 中
                    }
                });
                this.articles.splice(index, 1); // 从本地数组中移除文章
                this.totalArticles = this.articles.length;
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                });
            } catch (error) {
                console.error('删除文章失败:', error);
            }
        }
    },
    created() {
        this.fetchArticles();
    }
};
</script>
  
  
<style scoped>
.article-management {
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.article-management h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.article-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.article-table th,
.article-table td {
    text-align: center;
    padding: 12px;

    border-bottom: 1px solid #ddd;
}

.article-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.edit-btn,
.delete-btn {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
}

.edit-btn {
    background-color: #5cabe1;
    color: white;
    border-radius: 4px;
    margin-right: 8px;
}

.delete-btn {
    background-color: #f56c6c;
    color: white;
    border-radius: 4px;
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
}

.dialog-content {
    height: 80vh;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    overflow: hidden;
    /* 隐藏超出部分 */
    position: relative;
    /* 使侧边栏能够绝对定位 */
}

.editor-container {
    position: relative;
    height: 500px;
    /* 设置一个固定的高度以便内容超出 */
    overflow: auto;
    /* 隐藏超出部分 */

}

.dialog-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.save-btn,
.cancel-btn {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.save-btn {
    background-color: #67c23a;
    color: white;
    margin-right: 8px;
}

.cancel-btn {
    background-color: #909399;
    color: white;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
<style></style>
  