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
          @click="handleAddEquipment"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="EquipmentList">
      <el-table-column label="设备编号" align="center" prop="id" width="80" />
      <el-table-column label="设备标识" align="center" prop="eid" width="180" />
      <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="操作界面" align="center" prop="id" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleUseEquipment(scope.row)"
          >跳转</el-button>
        </template>
      </el-table-column>
      <el-table-column label="连接情况" align="center" prop="online">
        <template slot-scope="scope">
          <span v-if="scope.row.online">正常</span>
          <span v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="地理位置" align="center" prop="location" />
      <el-table-column label="创建时间" align="center" prop="time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="id">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleModifyEquipmentOpen(scope.row)"
          >修改</el-button>
        
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handledeleteEquipment(scope.row)"
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
    <!-- 添加或修改设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="equipmentParams" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备标识" prop="eId">
              <el-input v-model="equipmentParams.eId" placeholder="请输入设备标识" oninput = "value=value.replace(/[^\w_]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="equipmentParams.name" placeholder="请输入设备名称" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备位置" prop="location">
              <el-input v-model="equipmentParams.location" placeholder="请输入设备位置" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备描述" prop="description">
              <el-input v-model="equipmentParams.description" placeholder="请输入设备描述" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作地址" prop="description">
              <el-input v-model="equipmentParams.path" placeholder="请输入设备操作地址" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="addOrModify" type="primary" @click="submitEquipmentForm">新 增</el-button>
        <el-button v-if="!addOrModify" type="primary" @click="handlemodifyEquipment">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEquipment , addEquipment ,modifyEquipment , deleteEquipment } from "@/api/iot/home";
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
        pageNum: 1,
        pageSize: 10,
        type: 0,
      },
      equipmentParams:{
        eId: undefined,
        name: undefined,
        location: undefined,
        description: undefined,
        path: undefined,
        id: undefined,
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        eId: [
          { required: true, trigger: "blur", message: "设备标识不能为空" }
        ],
        name: [
          { required: true, trigger: "blur", message: "设备名称不能为空" }
        ],
      },
      addOrModify: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询设备列表 */
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
    handleUseEquipment(row){
      this.$router.push({ path: row.path, query: {eId: row.eid} });
    },
    handleAddEquipment(row){
      this.title = "添加新设备";
      this.open = true;
      this.addOrModify = true;
    },
    handleModifyEquipmentOpen(row){
      this.equipmentParams.id = row.id;
      this.equipmentParams.eId = row.eid;
      this.equipmentParams.name = row.name;
      this.equipmentParams.location = row.location;
      this.equipmentParams.description = row.description;
      this.equipmentParams.path = row.path;
      this.title = "修改设备信息";
      this.open = true;
      this.addOrModify = false;
    },
    checkData(){
      if(this.equipmentParams.eId === undefined || this.equipmentParams.eId === ""){
        this.msgError("必填数据设备标识不能为空");
        return false;
      }
      if(this.equipmentParams.name === undefined || this.equipmentParams.name === ""){
        this.msgError("必填数据设备名称不能为空");
        return false;
      }
      return true;
    },
    submitEquipmentForm(){
      if(!this.checkData()){
        return ;
      }
      addEquipment(this.equipmentParams).then(response=>{
        if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
                this.equipmentReset();
              } else {
                this.msgError(response.msg);
              }
      })
    },
    handlemodifyEquipment(row){
      if(!this.checkData()){
        return ;
      }
      modifyEquipment(this.equipmentParams).then(response=>{
        if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.equipmentReset();
              } else {
                this.msgError(response.msg);
              }
      })
    },
    handledeleteEquipment(row){
      let that = this;
      this.$confirm('确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          deleteEquipment(row).then(response=>{
              if (response.code === 200) {
                that.msgSuccess("删除成功");
                that.getList();
              } else {
                that.msgError(response.msg);
              }})
      }).catch(function() {});
      
    },
    equipmentReset(){
      this.equipmentParams = {
        eId: undefined,
        name: undefined,
        location: undefined,
        description: undefined,
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      equipmentReset();
      
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryParams = {
        eId:undefined,
        name:undefined,
        pageNum: 1,
        pageSize: 10,
        type: 0,
      },
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>
