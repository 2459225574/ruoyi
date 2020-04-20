<template>
  <div class="login">
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户昵称" prop="nickName">
                        <el-input class="inputWidth"  v-model="form.nickName" placeholder="请输入用户昵称" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号码" prop="phonenumber">
                        <el-input class="inputWidth" v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                        <label slot="label">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                    <el-input class="inputWidth" v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input class="inputWidth" v-model="form.userName" placeholder="请输入用户名称" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
                <el-input class="inputWidth" v-model="form.password" placeholder="请输入用户密码" type="password" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="用户性别">
                <el-select v-model="form.sex" placeholder="请选择">
                    <el-option
                    v-for="dict in sexOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                    ></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            </el-row>  
        </el-form>
        <el-row style="height:30px;"></el-row>
        <div slot="footer" class="dialog-footer">
            <el-row>
                <el-col :span="3" style="height:10px;"></el-col>
                <el-col :span="13">
                    <el-button type="primary" @click="submitForm">注 册</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button @click="reset">重 置</el-button>
                </el-col>
            </el-row>
        </div>
        <el-row style="height:20px;"></el-row>
      </div>
  </div>
</template>

<script>
import {addUser} from "@/api/system/user";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Register",
  data() {
    return {
      // 表单参数
      form: {},
      sexOptions: [{'dictValue':'1','dictLabel':'男'},{'dictValue':'0','dictLabel':'女'}],
      loginRules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
     /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        new Promise((resolve, reject) => {
            addUser(this.form).then(response => {
                console.log(response)
                if (response.code === 200) {
                    this.msgSuccess("新增成功");
                    setTimeout(() => {
                        this.$router.push({ path: '/login' || "/" });
                    }, 1000);
                } else {
                    this.msgError(response.msg);
                }
            });
        }).catch(error => {
          reject(error)
        });
      });
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        remark: undefined,
      };
      this.resetForm("form");
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.inputWidth{
    width: 200px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 800px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
