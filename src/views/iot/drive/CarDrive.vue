<!--
<template>
  <el-table
    :data="tableData"
    :show-header="false"
    border
    height="100%"
    class="tableBox"
    style="width: 100%">
    <template v-for="(column, index) in tableData[0]">
      <el-table-column
      v-bind:key = "index"
      :property="index"
      :label="index"
      width="108px"
      >
    </el-table-column>
    </template>
  </el-table>
</template>
-->
<style lang="scss">
.rootClass{
  width: 100%;
  height: 100%;
  background: #dfecdf;
  text-align: center;
}
.mainControl{
  height: 100%;
  border: gray solid 1px;
}
.rowHead{
  height: 20%;
}
.rowMain{
  height: 60%;
}
.rowFooter{
  height: 20%;
}
.colMain{
  height: 100%;
}
.menuStyle{
  height: 30px;
  line-height: 30px;
}
.snip{
  height: 10%;
}
</style>
<template>
  <div class="rootClass">
    <el-row class="rowHead"></el-row>
    <el-row gutter="1" class="rowMain"> 
      <el-col span="6" offset="8" class="colMain">
        <!-- 控制面板 -->
        <div class="mainControl">
          <el-row class="rowHead"></el-row>
          <el-row class="rowMain">
            <el-row class="menuStyle">
              <el-col span="4" offset="10">
                <button onclick="move(1)">前</button>
              </el-col>
            </el-row>
            <el-row class="menuStyle">
              <el-col span="4" offset="6">
                <button onclick="move(2)">左</button>
              </el-col>
              <el-col span="4" offset="4">
                <button onclick="move(3)">右</button>
              </el-col>
            </el-row>
            <el-row class="menuStyle">
              <el-col span="4" offset="10">
                <button onclick="move(4)">后</button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row>
              <el-col span="5" offset="3">
                <button>喇叭</button>
              </el-col>
              <el-col span="5" offset="8">
                <button>灯光</button>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="rowFooter"></el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="rowFooter"></el-row>
  </div>
</template>
<script>
  export default {
    name:  'CarDrive',
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      
    },
    created(){
      
    },
    methods: {
      move:function(status){
        
      }
    }
  }
</script>

<style lang="scss">
.tableBox{
  th{
    padding: 0;
    line-height: 100px;
    height: 100px;
  }
  td{
    padding: 0;
    height: 100px;
    line-height: 100px;
  }
}
</style>