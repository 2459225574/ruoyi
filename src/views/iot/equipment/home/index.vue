<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="设备标识">
        <el-input
          v-model="queryParams.eId"
          placeholder="请输入设备标识"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入设备名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户组">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入用户组"
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

    <el-table v-loading="loading" :data="EquipmentList">
      <el-table-column label="设备编号" prop="id" width="80" />
      <el-table-column label="设备标识" prop="eid" width="220" />
      <el-table-column label="设备名称" prop="name" :show-overflow-tooltip="true" width="200" />
      <el-table-column label="操作" prop="id" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleUse(scope.row.eid,scope.row.driveId)"
          >使用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用户组" prop="deptName" width="200" />
      <el-table-column label="地理位置" prop="location" width="250" />
      <el-table-column label="创建时间" align="center" prop="time" width="220">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time) }}</span>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEquipment } from "@/api/iot/home";
export default {
  name: "Home",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 设备表格数据
      EquipmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        eId:undefined,
        name:undefined,
        deptName:undefined,
        pageNum: 1,
        pageSize: 10,
        type: 0,
      },
      defaultProps: {
        children: "children",
        label: "label"
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
      listEquipment(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.EquipmentList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    handleUse(id,driveId){
      if(driveId == 1){
        this.$router.push({ path: "/carDrive",query:{eId:id} });
      }
      console.log(id);
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRoleStatus(row.roleId, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
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
            this.form.menuIds = this.getMenuAllCheckedKeys();
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
  }
};
</script>
