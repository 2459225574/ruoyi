<style lang="scss">
.rootClass{
  width: 100%;
  height: 100%;
  line-height: 100%;
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
    <el-row gutter=1 class="rowMain"> 
      <el-col span=4 offset=10 class="colMain">
        <!-- 控制面板 -->
        <div class="mainControl">
          <el-row class="rowHead"></el-row>
          <el-row class="rowMain">
            <el-row class="menuStyle">
              <el-col span=4 offset=4>
                <button v-on:click="CarPower()"><i class="el-icon-switch-button"></i></button>
              </el-col>
              <el-col span=4 offset=8>
                <button v-on:click="CarPause()"><i class="el-icon-video-pause"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col span=4 offset=10>
                <button v-on:click="MoveForward()"><i class="el-icon-caret-top"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col span=4 offset=4>
                <button v-on:click="MoveLeft()"><i class="el-icon-caret-left"></i></button>
              </el-col>
              <el-col span=4 offset=8>
                <button v-on:click="MoveRight()"><i class="el-icon-caret-right"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col span=4 offset=10>
                <button v-on:click="MoveBack()"><i class="el-icon-caret-bottom"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row>
              <el-col span=4 offset=4>
                <button v-on:click="CarBell()"><i class="el-icon-bell"></i></button>
              </el-col>
              <el-col span=4 offset=8>
                <button v-on:click="CarLight()"><i class="el-icon-sunny"></i></button>
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
import { CarOperation } from "@/api/iot/CarDrive";
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
      CarPower:function(){
        CarOperation({"action":7,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      CarPause:function(){
        CarOperation({"action":8,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      CarBell:function(){
        CarOperation({"action":1,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      CarLight:function(){
        CarOperation({"action":1,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveForward:function(){
        CarOperation({"action":2,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveLeft:function(){
        CarOperation({"action":4,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveRight:function(){
        CarOperation({"action":5,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },  
      MoveBack:function(){
        CarOperation({"action":3,"eId":this.$route.query.eId}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      move:function(status){
        let eId = this.$route.query.eId;
        
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