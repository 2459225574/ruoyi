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
      <el-form-item label="设备组名">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入组名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备管理员">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入设备管理员"
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
        <el-button icon="el-icon-sort" size="mini" @click="equipmentFilter">设备过滤</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="EquipmentList">
      <el-table-column label="设备编号" align="center" prop="id" width="80" />
      <el-table-column label="设备标识" align="center" prop="eid" width="180" />
      <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="操作界面" align="center" width="100">
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
      <el-table-column v-if="!filterFlag" label="设备组名" align="center" prop="roleName" />
      <el-table-column v-if="!filterFlag" label="设备管理员" align="center" prop="createBy" />
      <el-table-column v-if="!filterFlag" label="操作" align="center" prop="id">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleRemoveEquipment(scope.row)"
          >移除</el-button>
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
  </div>
</template>

<script>
import { listAllEquipment, listAllEquipmentNoRepeat, RemoveRoleEquipment} from "@/api/iot/home";
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
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        eId:undefined,
        name:undefined,
        roleName: undefined,
        createBy: undefined,
        pageNum: 1,
        pageSize: 10,
        type: 0,
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      filterFlag: false,
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
    /** 查询设备列表 */
    getList() {
      this.loading = true;
      listAllEquipment(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.EquipmentList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    getFilterList(){
      this.loading = true;
        listAllEquipmentNoRepeat(this.addDateRange(this.queryParams, this.dateRange)).then(
          response => {
            this.EquipmentList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
        )
    },
    handleQuery(){
      if(this.filterFlag){
        this.getFilterList();
      }else{
        this.getList();
      }
    },
    resetQuery(){
      this.queryParams = {
        eId:undefined,
        name:undefined,
        roleName: undefined,
        createBy: undefined,
        pageNum: 1,
        pageSize: 10,
        type: 0,
      }
    },
    equipmentFilter(){
      this.filterFlag = !this.filterFlag;
      this.handleQuery();
    },
    handleRemoveEquipment(row){
      this.addAndRemoveParams.eId = row.id;
      this.addAndRemoveParams.roleId = row.roleId;
      let that = this;
      this.$confirm('确认移除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
            RemoveRoleEquipment(that.addAndRemoveParams).then(response=>{
              if (response.code === 200) {
                that.msgSuccess("移除成功");
                that.handleQuery();
              } else {
                that.msgError(response.msg);
              }
              
            })
        }).catch(function() {});
      
    },
    handleUseEquipment(row){
      this.$router.push({ path: row.path, query: {eId: row.eid} });
    },
  }
};
</script>
