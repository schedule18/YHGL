<template>
  <div style="width: 95%; margin: 0 auto; margin-top:-10px">
    <div style="width: 600px;">
      <el-form :model="userArticle">
        <h3 style="margin-left:280px">添加用户文章</h3>

        <el-form-item
          label="文章标题"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入文章标题"
            v-model="userArticle.title"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="分类编号"
          :label-width="formLabelWidth"
        >
          <el-input-number
            v-model="userArticle.articleCatId"
            autocomplete="off"
            style="width:100%"
          />
        </el-form-item>

        <el-form-item
          label="文章内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入文章内容"
            v-model="userArticle.content"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="创建时间"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-date-picker
              v-model="userArticle.createTime"
              type="datetime"
              placeholder="请选择创建时间"
            />
          </div>
        </el-form-item>

        <el-form-item
          label="更新时间"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-date-picker
              v-model="userArticle.updateTime"
              type="datetime"
              placeholder="请选择更新时间"
            />
          </div>
        </el-form-item>

        <el-form-item
          label="逻辑删除"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="userArticle.deleted"
            placeholder="请选择逻辑删除"
            style="width:100%;"
          >
            <el-option
              label="删除"
              :value="1"
            />
            <el-option
              label="不删除"
              :value="0"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="是否公开"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="userArticle.open"
            placeholder="请选择是否公开"
            style="width:100%;"
          >
            <el-option
              label="公开"
              :value="0"
            />
            <el-option
              label="不公开"
              :value="1"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <t-pagination-select
            @page-change="pageChange"
            :optionSource="userInfos"
            v-model="userArticle.userinfoId"
            labelKey="userName"
            valueKey="id"
            style="width:100%;"
            placeholder="请选择用户名称"
            :paginationOption="selectPage"
          />
        </el-form-item>

      </el-form>
      <span class="dialog-footer">
        <el-button
          style="margin-left:230px; margin-right:30px"
          @click="reset"
        >重置</el-button>
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </span>
    </div>
  </div>

</template>
      
      <script>
import { defineComponent } from "vue";
//
import { addOne } from "@/http/userArticle";
import { ElMessage } from "element-plus";
import { getUserPage } from "../../http/user";
import { cloneDeep } from "lodash-es";
import TPaginationSelect from "./module/TPaginationSelect.vue";
export default defineComponent({
  data() {
    return {
      selectPage: {
        total: 0,
        current: 1,
        size: 6,
        pagerCount: 5,
      },
      userInfos: [],
      userArticle: {
        articleCatId: 0,
        content: "",
        createTime: new Date(),
        updateTime: new Date(),
        deleted: 0,
        id: 0,
        open: 0,
        title: "",
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getUserInfosPage(1);
  },
  components: {
    "t-pagination-select": TPaginationSelect,
  },
  methods: {
    reset() {
      this.userArticle = {
        articleCatId: 0,
        content: "",
        createTime: new Date(),
        deleted: 0,
        updateTime: new Date(),
        id: 0,
        open: 0,
        title: "",
      };
    },
    pageChange(current) {
      this.getUserInfosPage(current);
    },
    getUserInfosPage(current) {
      const data = {
        current: current,
        size: 6,
      };
      getUserPage(data)
        .then((res) => {
          const page = res.data.page;
          this.userInfos = page.records;
          this.selectPage = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      const userArticle = this.userArticle;
      if (userArticle.id == 0) {
        let data = {
          article: userArticle,
          userId: userArticle.userinfoId,
        };
        addOne(data)
          .then((res) => {
            if (res.success) {
              //刷新页面
              (this.userArticle = {
                articleCatId: 0,
                content: "",
                createTime: new Date(),
                deleted: 0,
                updateTime: new Date(),
                id: 0,
                open: 0,
                title: "",
              }),
                ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>     
<style lang="scss" scoped></style>
      