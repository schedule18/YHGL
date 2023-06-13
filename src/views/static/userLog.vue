<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="用户编号"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入用户编号"
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
      :data="userLogs"
      style="width: 95%; margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="100"
      />
      <el-table-column
        prop="userId"
        label="用户编号"
        sortable
        width="150"
      />

      <el-table-column
        prop="log"
        label="日志内容"
        width="150"
      />

      <el-table-column
        label="创建时间"
        width="200"
      >
        <template #default="scope">
          {{ scope.row.createTime != null ? scope.row.createTime.replace("T"," ").slice(0,19) : ""}}
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
    title="日志编辑"
  >
    <el-form :model="userLog">
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
      >
        <t-pagination-select
          @page-change="pageChange"
          :optionSource="userInfos"
          v-model="userLog.userId"
          labelKey="userName"
          valueKey="id"
          style="width:90%;"
          placeholder="请选择用户名称"
          :paginationOption="selectPage"
        />
      </el-form-item>
      <el-form-item
        label="日志内容"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          :row="3"
          style="width:80%;"
          v-model="userLog.log"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="创建时间"
        :label-width="formLabelWidth"
      >
        <div class="block">
          <el-date-picker
            v-model="userLog.createTime"
            type="datetime"
            placeholder="请选择创建时间"
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
import { getUserLogPage, getPageByUserId, addOne } from "../../http/userLog";
import { getUserPage } from "../../http/user";
import { cloneDeep } from "lodash-es";
import TPaginationSelect from "./module/TPaginationSelect.vue";
export default defineComponent({
  data() {
    return {
      userLogs: [],
      userInfos: [],
      page: {
        total: 0,
        current: 1,
        size: 6,
      },
      selectPage: {
        total: 0,
        current: 1,
        size: 6,
        pagerCount: 5,
      },
      userInfos: [],
      searchId: null,
      dialogFormVisible: false,
      userLog: {
        createTime: new Date(),
        id: 0,
        log: "",
        userId: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getLogsPage(1);
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
        alert("请输入用户编号后查询");
        return;
      }
      const data = {
        current: 1,
        size: 6,
        colums: [],
        userId: this.searchId,
      };
      getPageByUserId(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.userLogs = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getLogsPage(1);
    },
    getLogsPage(current) {
      const data = {
        current: current,
        size: 6,
        colums: [],
      };
      getUserLogPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.userLogs = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getLogsPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },

    toAdd() {
      this.dialogFormVisible = true;
      this.userLog = {
        createTime: new Date(),
        id: 0,
        log: "",
      };
    },
    save() {
      const userLog = this.userLog;
      if (userLog.id == 0) {
        addOne(userLog)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getLogsPage(this.page.current);
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