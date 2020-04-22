<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="status">
            <el-input
              v-model="queryParams.email"
              placeholder="请输入邮箱"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDeletes"
            >删除</el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center" />
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" width="170"/>
          <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" width="170"/>
          <el-table-column label="手机号码" align="center" prop="phonenumber" width="200" />
          <el-table-column label="邮箱" align="center" prop="email" width="200" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="250">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除好友</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
 
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="queryFriendsParams" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="queryFriendsParams.nickName" placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="queryFriendsParams.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="queryFriendsParams.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="queryFriendsParams.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryFriends">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm">全部添加</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <el-table v-loading="loading" :data="userFriendsList" @selection-change="handleSelectionChangeFirends">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" type="index" width="50" />
          <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" width="120"/>
          <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" width="120"/>
          <el-table-column label="手机号码" align="center" prop="phonenumber" width="100" />
          <el-table-column label="邮箱" align="center" prop="email" width="170" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="150">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleAddFriend(scope.row)"
              >添加好友</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="totalFriends>0"
          :total="totalFriends"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
    </el-dialog>

  </div>
</template>

<script>
import { listUser, listFriends, delFriends, addFriends, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      idFriends:[],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      totalFriends:0,
      // 用户表格数据
      userList: null,
      userFriendsList:null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
      },
       // 查询好友参数
      queryFriendsParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
        nickName: undefined
      },
    };
  },
  watch: {
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.getList();
      this.reset();
    },
    // 表单重置
    reset() {
      this.queryFriendsParams = {
        pageNum: 1,
        pageSize: 10,
        nickName:undefined,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    //搜索陌生朋友
    handleQueryFriends(){
      this.queryParams.page = 1;
      this.loading = true;
      listFriends(this.queryFriendsParams).then(response => {
          this.userFriendsList = response.rows;
          this.totalFriends = response.total;
          this.loading = false;
        }
      );
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
      },
      this.resetForm("queryParams");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleSelectionChangeFirends(selection){
      this.idFriends = selection.map(item => item.userId);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "搜索好友";
    },
    /** 提交按钮 */
    submitForm: function() {
      if(this.idFriends.length>0){
        addFriends(this.idFriends).then(response => {
        if (response.code === 200) {
          this.msgSuccess("添加成功");
          this.idFriends = [];
        } else {
          this.msgError(response.msg);
        }
      });
      }
    },
    handleAddFriend(row){
      const userIds = [];
      userIds.push(row.userId);
      addFriends(userIds).then(response => {
        if (response.code === 200) {
          this.msgSuccess("添加成功");
          // this.handleQueryFriends();
        } else {
          this.msgError(response.msg);
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let ids = [];
          ids.push(userIds); 
          return delFriends(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    handleDeletes(){
      let that = this;
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFriends(that.ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>