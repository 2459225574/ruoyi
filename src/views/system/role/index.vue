<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
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
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="设备组名称" prop="roleName" :show-overflow-tooltip="true" width="160" />
      <el-table-column label="设备权限字符" prop="roleKey" :show-overflow-tooltip="true" width="160" />
      <!-- <el-table-column label="显示顺序" prop="roleSort" width="100" /> -->
      <el-table-column label="用户列表" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUserList(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="设备列表" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEquipment(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="250">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户详情对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="1000px">
      <el-form :model="queryFriendsParams" ref="queryForm" :inline="true" label-width="68px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户昵称" prop="nickName">
                <el-input 
                v-model="queryFriendsParams.nickName" 
                clearable
                size="small"
                style="width: 230px"
                @keyup.enter.native="getUserList"
                placeholder="请输入用户昵称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称" prop="userName">
                <el-input
                  v-model="queryFriendsParams.userName"
                  placeholder="请输入用户名称"
                  clearable
                  size="small"
                  style="width: 230px"
                  @keyup.enter.native="getUserList"
                />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input
                  v-model="queryFriendsParams.phonenumber"
                  placeholder="请输入手机号码"
                  clearable
                  size="small"
                  style="width: 240px"
                  @keyup.enter.native="getUserList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="邮箱" prop="status">
                <el-input
                  v-model="queryFriendsParams.email"
                  placeholder="请输入邮箱"
                  clearable
                  size="small"
                  style="width: 240px"
                  @keyup.enter.native="getUserList"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getUserList">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      <el-table v-loading="loading" :data="userFriendsList" @selection-change="handleSelectionChangeFirends">
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
                v-if="scope.row.status === '0'"
                @click="handleAddRoleMember(scope.row)"
              >加入设备组</el-button>
              <el-button
                size="mini"
                type="text"
                v-else
                @click="handleRemoveRoleMember(scope.row)"
              >移除设备组</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="totalFriends>0"
          :total="totalFriends"
          :page.sync="queryFriendsParams.pageNum"
          :limit.sync="queryFriendsParams.pageSize"
          @pagination="getUserList"
        />
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitDataScope">确 定</el-button> -->
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改设备对话框 -->
    <el-dialog :title="title" :visible.sync="equipmentOpen" width="1000px">
      <el-form :model="formEquipmentParams" ref="queryForm" :inline="true">
      <el-form-item label="设备标识">
        <el-input
          v-model="formEquipmentParams.eId"
          placeholder="请输入设备标识"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input
          v-model="formEquipmentParams.name"
          placeholder="请输入设备名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="equipmentDateRange"
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getEquipmentList">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetEquipmentQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="EquipmentList">
      <el-table-column label="设备编号" align="center" prop="id" width="80" />
      <el-table-column label="设备标识" align="center" prop="eid" width="180" />
      <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="地理位置" align="center" prop="location" />
      <el-table-column label="连接情况" align="center" prop="online">
        <template slot-scope="scope">
          <span v-if="scope.row.online">正常</span>
          <span v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="id" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status === '0'"
            @click="handleAddEquipment(scope.row)"
          >添加设备</el-button>
          <el-button
            size="mini"
            type="text"
            v-else
            @click="handleRemoveEquipment(scope.row)"
          >移除设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="equipmentTotal>0"
      :total="equipmentTotal"
      :page.sync="formEquipmentParams.pageNum"
      :limit.sync="formEquipmentParams.pageSize"
      @pagination="getEquipmentList"
    />
    </el-dialog>
  </div>
</template>

<script>
import { listRole, addRoleMember, removeRoleMember, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus } from "@/api/system/role";
import { listUser, listFriends, listRoleUser, delFriends, addFriends, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
import { listRoleEquipment, AddRoleEquipment, RemoveRoleEquipment } from "@/api/iot/home";

export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      equipmentTotal: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      equipmentDateRange: [],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      },
      currentUser: undefined,
      userFriendsList: undefined,
      totalFriends:0,
      
      // 查询好友参数
      queryFriendsParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
        nickName: undefined,
        roleId:undefined,
      },
      equipmentOpen:false,
      // 查设备友参数
      queryEquipmentParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
        nickName: undefined,
        roleId:undefined,
      },
      EquipmentList:undefined,
      formEquipmentParams:{
        eId:undefined,
        name:undefined,
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
      },
      addAndRemoveParams: {
        eId: undefined,
        roleId: undefined
      }
      
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.roleList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    getUserList() {
      this.loading = true;
      listRoleUser(this.queryFriendsParams).then(response => {
          this.userFriendsList = response.rows;
          this.totalFriends = response.total;
          this.loading = false;
        }
      );
    },
    getEquipmentList(){
      this.loading = true;
      listRoleEquipment(this.addDateRange(this.formEquipmentParams, this.equipmentDateRange)).then(response => {
          this.EquipmentList = response.rows;
          this.equipmentTotal = response.total;
          this.loading = false;
        }
      );
    },
    handleEquipment(row){
      this.equipmentOpen = true;
      this.formEquipmentParams.roleId = row.roleId;
      this.addAndRemoveParams.roleId = row.roleId;
      this.title = row.roleName + "设备管理";
      this.getEquipmentList();
    },
    handleAddEquipment(row){
      this.addAndRemoveParams.eId = row.id;
      AddRoleEquipment(this.addAndRemoveParams).then(response=>{
        if (response.code === 200) {
          this.msgSuccess("添加成功");
          this.getEquipmentList();
        } else {
          this.msgError(response.msg);
        }
      })
    },
    handleRemoveEquipment(row){
      this.addAndRemoveParams.eId = row.id;
      RemoveRoleEquipment(this.addAndRemoveParams).then(response=>{
        if (response.code === 200) {
          this.msgSuccess("移除成功");
          this.getEquipmentList();
        } else {
          this.msgError(response.msg);
        }
      })
    },
    //设备组添加成员
    handleAddRoleMember(row){
      addRoleMember(this.queryFriendsParams.roleId,row.userId).then(response=>{
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.getUserList();
        } else {
          this.msgError(response.msg);
        }
      })
      
    },
    //移除设备组成员
    handleRemoveRoleMember(row){
      removeRoleMember(this.queryFriendsParams.roleId,row.userId).then(response=>{
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.getUserList();
        } else {
          this.msgError(response.msg);
        }
      })
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: undefined
      };
      this.resetForm("form");
    },
    resetQuery(){
      this.queryFriendsParams= {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
        nickName: undefined,
        roleId:undefined,
      }
      this.resetForm("form");
      this.getUserList();
    },
    resetEquipmentQuery(){
      this.equipmentDateRange = [];
      this.formEquipmentParams = {
        eId:undefined,
        name:undefined,
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
      };
      this.getEquipmentList();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getUserList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    //用户详情
    handleUserList(row){
      this.queryFriendsParams.roleId = row.roleId;
      this.openDataScope = true;
      this.title = row.roleName + "的用户管理";
      this.currentUser = row;
      this.getUserList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids
      getRole(roleId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改角色";
      });
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            updateRole(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addRole(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.roleId != undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys();
        dataScope(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
            this.openDataScope = false;
            this.getList();
          } else {
            this.msgError(response.msg);
          }
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRole(roleIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
  }
};
</script>