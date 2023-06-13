<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="大事件编号"
        :label-width="95"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入大事件编号"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="search"
      >查询</el-button>
    </div>

    <div style="width: 95%; margin:0 auto">
      <el-button
        type="info"
        @click="research"
      >重置</el-button>
      <el-button
        type="success"
        @click="toAdd"
      >添加
      </el-button>
    </div>
    <el-table
      :data="memorabilias"
      style="width: 95%; margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      />
      <el-table-column
        prop="userId"
        label="用户编号"
        width="100"
      />

      <el-table-column
        prop="content"
        label="发生内容"
        width="180"
      />

      <el-table-column
        label="发生时间"
        width="200"
      >
        <template #default="scope">
          {{ scope.row.happenTime != null ? scope.row.happenTime.replace("T"," ").slice(0,19) : ""}}
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="150"
      >
        <template #default="scope">
          {{ scope.row.createTime != null ? scope.row.createTime.replace("T"," ").slice(0,19) : ""}}
        </template>
      </el-table-column>

      <el-table-column
        label="修改时间"
        width="150"
      >
        <template #default="scope">
          {{ scope.row.updateTime != null ? scope.row.updateTime.replace("T"," ").slice(0,19) : ""}}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="功能管理"
        width="140"
      >
        <template #default="scope">
          <el-button
            type="warning"
            link
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            type="danger"
            link
            size="small"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="page.size"
      :total="page.total"
      style="width: 95%; margin:0 auto"
      @current-change="currentchange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="用户编辑"
  >
    <el-form :model="memorabilia">
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
      >
        <t-pagination-select
          @page-change="pageChange"
          :optionSource="userInfos"
          v-model="memorabilia.userId"
          labelKey="userName"
          valueKey="id"
          style="width:90%;"
          placeholder="请选择用户名称"
          :paginationOption="selectPage"
        />
      </el-form-item>

      <el-form-item
        label="发生内容"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          placeholder="请输入发生内容"
          :row="3"
          style="width:80%;"
          v-model="memorabilia.content"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="发生时间"
        :label-width="formLabelWidth"
      >
        <div class="block">
          <el-date-picker
            v-model="memorabilia.happenTime"
            type="datetime"
            placeholder="请选择发生时间"
          />
        </div>
      </el-form-item>

      <el-form-item
        label="创建时间"
        :label-width="formLabelWidth"
      >
        <div class="block">
          <el-date-picker
            v-model="memorabilia.createTime"
            type="datetime"
            placeholder="请选择创建时间"
          />
        </div>
      </el-form-item>

      <el-form-item
        label="修改时间"
        :label-width="formLabelWidth"
      >
        <div class="block">
          <el-date-picker
            v-model="memorabilia.updateTime"
            type="datetime"
            placeholder="请选择修改时间"
          />
        </div>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
        >保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent } from "vue";
import {
  updateOne,
  addOne,
  delOne,
  getMemorabiliaPage,
  getOne,
} from "../../http/memorabilia";
import { cloneDeep } from "lodash-es";
import { getUserPage } from "../../http/user";
import TPaginationSelect from "./module/TPaginationSelect.vue";
export default defineComponent({
  data() {
    return {
      memorabilias: [],
      page: {
        total: 0,
        current: 1,
        size: 6,
      },
      searchId: null,
      selectPage: {
        total: 0,
        current: 1,
        size: 6,
        pagerCount: 5,
      },
      dialogFormVisible: false,
      memorabilia: {
        content: "",
        createTime: new Date(),
        happenTime: new Date(),
        id: 0,
        updateTime: new Date(),
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getMemorabiliasPage(1);
    this.getUserInfosPage(1);
  },
  components: {
    "t-pagination-select": TPaginationSelect,
  },
  methods: {
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
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入大事件编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.memorabilias = [];
          } else {
            this.memorabilias = [];
            this.memorabilias.push(res.data.memorabilia);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getMemorabiliasPage(1);
    },
    toEdit(memorabilia) {
      this.dialogFormVisible = true;
      this.memorabilia = cloneDeep(memorabilia);
    },
    getMemorabiliasPage(current) {
      const data = {
        current: current,
        size: 6,
        userId: 11,
        colums: [],
      };
      getMemorabiliaPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.memorabilias = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getMemorabiliasPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getMemorabiliasPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.memorabilia = {
        content: "",
        createTime: new Date(),
        happenTime: new Date(),
        id: 0,
        updateTime: new Date(),
      };
    },
    save() {
      const memorabilia = this.memorabilia;
      if (memorabilia.id == 0) {
        addOne(memorabilia)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getMemorabiliasPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        updateOne(memorabilia)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getMemorabiliasPage(this.page.current);
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
    <style scoped>
.el-col-12 {
  width: 15%;
}
</style>