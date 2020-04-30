<style lang="scss">
.rootClass1{
  width: 100%;
  height: 100%;
  line-height: 100%;
  background: #dfecdf;
  text-align: center;
}
.rootClass2{
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
  margin-top: 2em;
}
.rowMain{
  height: 60%;
  margin-bottom: 2em;
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
  height: 1em;
}
.status{
  display: inline-block;
  height: 2em;
  margin-top: 1em;
}

.rootClass1 button {
  height: 2.5em;
  width: 2.5em;
}

.rootClass2 button {
  height: 3em;
  width: 3em;
}

</style>
<template>
  <div class="rootClass1" v-if="userAgentType">
    <el-row class="rowHead">
      <div class="status">设备状态：
        <div v-if="status" style="display: inline-block;color: green;">在线</div>
        <div v-else style="display: inline-block;color: blueviolet;">离线</div>
      </div>
    </el-row>
    <el-row gutter=1 class="rowMain"> 
      <el-col :span=6 :offset=9 class="colMain">
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
  <div class="rootClass2" v-else>
    <el-row class="rowHead">
      <div class="status">设备状态：
        <div v-if="status" style="display: inline-block;color: green;">在线</div>
        <div v-else style="display: inline-block;color: blueviolet;">离线</div>
      </div>
    </el-row>
    <el-row class="rowMain"> 
      <el-col :span=22 :offset=1 class="colMain">
        <!-- 控制面板 -->
        <div class="mainControl">
          <el-row class="rowHead"></el-row>
          <el-row class="rowMain">
            <el-row class="menuStyle">
              <el-col :span=4 :offset=5>
                <button v-on:click="CarPower()"><i class="el-icon-switch-button"></i></button>
              </el-col>
              <el-col :span=4 :offset=6>
                <button v-on:click="CarPause()"><i class="el-icon-video-pause"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col :span=4 :offset=10>
                <button v-on:click="MoveForward()"><i class="el-icon-caret-top"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col :span=4 :offset=5>
                <button v-on:click="MoveLeft()"><i class="el-icon-caret-left"></i></button>
              </el-col>
              <el-col :span=4 :offset=6>
                <button v-on:click="MoveRight()"><i class="el-icon-caret-right"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="snip"></el-row>
            <el-row class="menuStyle">
              <el-col :span=4 :offset=10>
                <button v-on:click="MoveBack()"><i class="el-icon-caret-bottom"></i></button>
              </el-col>
            </el-row>
            <el-row class="snip"></el-row>
            <el-row class="snip"></el-row>
            <el-row>
              <el-col :span=4 :offset=5>
                <button v-on:click="CarBell()"><i class="el-icon-bell"></i></button>
              </el-col>
              <el-col :span=4 :offset=6>
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
import { getEquipmentStatus } from "@/api/iot/home";
  export default {
    name:  'CarDrive',
    data() {
      return {
        tableData: [],
        userAgentType: true,
        status: false,
      }
    },
    mounted(){
      getEquipmentStatus({"eId":this.$route.query.eId}).then(response => {
        if(response.code == 200)
          this.status = response.data
      })
    },
    created(){
      if(this.browserType() === "phone"){
        this.userAgentType = false;
      }else{
        this.userAgentType = true;
      }
    },
    methods: {
      //判断是电脑还是手机
      browserType() {
      　　var sUserAgent = navigator.userAgent.toLowerCase();
      　　var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      　　var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      　　var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      　　var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      　　var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      　　var bIsAndroid = sUserAgent.match(/android/i) == "android";
      　　var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      　　var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      　　if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
      　　　　return "phone";
      　　} else {
      　　　　return "computer";
      　　}　　　　
      },
      //Vibration接口用于在浏览器中发出命令，使得设备振动。
      //navigator.vibrate([震动时间，停止时间，震动时间，停止时间………..]);
      vibration(){
          navigator.vibrate = navigator.vibrate
                  || navigator.webkitVibrate
                  || navigator.mozVibrate
                  || navigator.msVibrate;
          if (navigator.vibrate) {// 支持
              navigator.vibrate([500,100]);
          }
          
      },
      CarPower:function(){
        this.vibration();
        CarOperation({"action":8,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      CarPause:function(){
        this.vibration();
        CarOperation({"action":7,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      CarBell:function(){
        this.vibration();
        CarOperation({"action":1,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      CarLight:function(){
        this.vibration();
        CarOperation({"action":1,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveForward:function(){
        this.vibration();
        CarOperation({"action":3,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveLeft:function(){
        this.vibration();
        CarOperation({"action":4,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      MoveRight:function(){
        this.vibration();
        CarOperation({"action":5,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },  
      MoveBack:function(){
        this.vibration();
        CarOperation({"action":2,"eId":this.$route.query.eId}).then(response => {
          this.msgSuccess(response.msg);
        }).catch(err => {
          console.log(err);
        })
      },
      move:function(status){
        this.vibration();
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