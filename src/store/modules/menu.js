const menu = {
    state:{
        permission_routes:[
            {
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                  component:"system/user/manger/index",
                  meta: {
                      icon:"peoples",
                      title:"用户管理"
                  },
                  name:"UserManger",
                  path:"UserManger"
              },
                {
                    component:"system/user/index",
                    meta: {
                        icon:"user",
                        title:"好友管理"
                    },
                    name:"User",
                    path:"user"
                },
                {
                    component:"system/role/index",
                    meta: {
                        icon:"peoples",
                        title:"设备组管理"
                    },
                    name:"Role",
                    path:"role"
                },
                {
                  component:"iot/equipment/home/index",
                  meta: {
                      icon:"chart",
                      title:"设备管理"
                  },
                  name:"Home",
                  path:"home"
              },
              {
                component:"iot/equipment/use/index",
                meta: {
                    icon:"phone",
                    title:"可用设备"
                },
                name:"Equipment",
                path:"equipment"
            }
              ],
              meta:{
                icon:"system",
                title:"系统管理"
              },
              name:"System",
              path:"/system",
              redirect:"noRedirect"
            },
            {
              hidden: true,
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"iot/drive/CarDrive",
                    meta: {
                        title:"小车"
                    },
                    name:"CarDrive",
                    path:"carDrive"
                },
                {
                  component:"iot/drive/test",
                  meta: {
                      title:"测试"
                  },
                  name:"Test",
                  path:"test"
                }
              ],
              meta:{
                icon:"textarea",
                title:"驱动"
              },
              name:"Driver",
              path:"/driver",
              redirect:"noRedirect"
            },
            {
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"monitor/operlog/index",
                    meta: {
                        title:"操作日志"
                    },
                    name:"Operlog",
                    path:"/operlog"
                },
                {
                  component:"monitor/logininfor/index",
                  meta: {
                      title:"登录日志"
                  },
                  name:"Logininfor",
                  path:"/logininfor"
                }
              ],
              meta:{
                icon:"textarea",
                title:"日志管理"
              },
              name:"Log",
              path:"/log",
              redirect:"noRedirect"
            },
            {
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"monitor/druid/index",
                    meta: {
                        title:"数据监控"
                    },
                    name:"Druid",
                    path:"/druid"
                },
                {
                  component:"monitor/server/index",
                  meta: {
                      title:"服务监控"
                  },
                  name:"Server",
                  path:"/server"
                },
                {
                  component:"monitor/online/index",
                  meta: {
                      title:"在线用户"
                  },
                  name:"Online",
                  path:"/online"
                }
              ],
              meta:{
                icon:"textarea",
                title:"系统监控"
              },
              name:"Monitor",
              path:"/monitor",
              redirect:"noRedirect"
            },
            {
                component:"Layout",
                meta: {
                    icon:"guide",
                    title:"驱动资源"
                },
                name: "http://localhost:8008/login.shtml",
                path: "http://localhost:8008/login.shtml"
            }
          ],
          permission_user_routes:[
            {
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                  component:"system/user/manger/index",
                  meta: {
                      icon:"peoples",
                      title:"用户管理"
                  },
                  name:"UserManger",
                  path:"UserManger"
              },
                {
                    component:"system/user/index",
                    meta: {
                        icon:"user",
                        title:"好友管理"
                    },
                    name:"User",
                    path:"user"
                },
                {
                    component:"system/role/index",
                    meta: {
                        icon:"peoples",
                        title:"设备组管理"
                    },
                    name:"Role",
                    path:"role"
                },
                {
                  component:"iot/equipment/home/index",
                  meta: {
                      icon:"chart",
                      title:"设备管理"
                  },
                  name:"Home",
                  path:"home"
              },
              {
                component:"iot/equipment/use/index",
                meta: {
                    icon:"phone",
                    title:"可用设备"
                },
                name:"Equipment",
                path:"equipment"
            }
              ],
              meta:{
                icon:"system",
                title:"系统管理"
              },
              name:"System",
              path:"/system",
              redirect:"noRedirect"
            },
            {
              hidden: true,
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"iot/drive/CarDrive",
                    meta: {
                        title:"小车"
                    },
                    name:"CarDrive",
                    path:"carDrive"
                },
                {
                  component:"iot/drive/test",
                  meta: {
                      title:"测试"
                  },
                  name:"Test",
                  path:"test"
                }
              ],
              meta:{
                icon:"textarea",
                title:"驱动"
              },
              name:"Driver",
              path:"/driver",
              redirect:"noRedirect"
            },
            {
                component:"Layout",
                meta: {
                    icon:"guide",
                    title:"驱动资源"
                },
                name: "http://localhost:8008/login.shtml",
                path: "http://localhost:8008/login.shtml"
            }
          ]
    }
}


export default menu;