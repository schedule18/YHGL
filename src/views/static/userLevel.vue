<template>
  <div style="margin-top:10px">
    <div style="width: 95%;margin: 0 auto;">
      <el-form-item
        label="用户等级编号"
        :label-width="110"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="用户等级编号"
        ></el-input>
      </el-form-item>

      <el-button
        type="primary"
        @click="search"
      >查询</el-button>
    </div>
    <div style="width: 95%;margin: 0 auto; margin-bottom: 10px;">
      <el-button
        type="info"
        @click="research"
      >重置</el-button>
      <el-button
        type="success"
        @click="toAdd"
      >添加</el-button>
    </div>
    <el-table
      :data="userLevels"
      style="width: 95%;margin: 0 auto;"
    >
      <el-table-column
        fixed
        prop="levelId"
        label="编号"
        width="80"
      />
      <el-table-column
        prop="levelName"
        label="头衔名称"
        width="120"
      />
      <el-table-column
        prop="discount"
        label="折扣"
        width="120"
      />

      <el-table-column
        prop="amount"
        label="等级必要金额"
        width="150"
      />
      <el-table-column
        prop="description"
        label="头街描述"
        width="150"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template #default="scope">
          <el-button
            link
            type="warning"
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="del(scope.row.levelId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="用户等级编辑"
  >
    <el-form :model="userLevel">
      <el-form-item
        label="头衔名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="userLevel.levelName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="折扣"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="userLevel.discount"
          style="width:100%"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="必要金额"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="userLevel.amount"
          style="width:100%"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="头街描述"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          :row="3"
          v-model="userLevel.description"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>

  <template><el-input
      v-model="input"
      placeholder="Please input"
    /></template>
</template>
    
    <script>
import { defineComponent } from "vue";
//
import { getAll, addOne, updateOne, delOne, getOne } from "@/http/userLevel";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      input: "",
      userLevels: [],
      searchId: "",
      dialogFormVisible: false,
      userLevel: {
        amount: 0,
        description: "",
        discount: 0,
        levelId: 0,
        levelName: "",
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getUserLevelList();
  },
  methods: {
    research() {
      this.searchId = null;
      this.getUserLevelList();
    },
    search() {
      if (this.searchId == "") {
        alert("请选择后进行查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          console.log(res);
          this.userLevels = [];
          this.userLevels.push(res.data.userLevel);
          console.log(this.userLevels);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEdit(userLevel) {
      this.dialogFormVisible = true;
      this.userLevel = cloneDeep(userLevel);
    },
    getUserLevelList() {
      getAll()
        .then((res) => {
          console.log(res);
          this.userLevels = res.data.userLevels;
          console.log(this.userLevels);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(levelId) {
      delOne(levelId)
        .then((res) => {
          if (res.success) {
            this.getUserLevelList();
          } else {
            console.log(res.msg);
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      //到添加的页面
      this.dialogFormVisible = true;
      this.userLevel = {
        amount: 0,
        description: "",
        discount: 0,
        levelId: 0,
        levelName: "",
      };
    },
    save() {
      const userLevel = this.userLevel;
      if (userLevel.levelId == 0) {
        addOne(userLevel)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getUserLevelList();
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
        updateOne(userLevel)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getUserLevelList();
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
    