const menu = {
    state:{
        permission_routes:[
            {
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"system/user/index",
                    meta: {
                        icon:"user",
                        title:"用户管理"
                    },
                    name:"User",
                    path:"user"
                },
                {
                    component:"system/role/index",
                    meta: {
                        icon:"peoples",
                        title:"设备管理"
                    },
                    name:"Role",
                    path:"role"
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
              alwaysShow:true,
              component: "Layout",
              children:[
                {
                    component:"iot/equipment/home/index",
                    meta: {
                        icon:"chart",
                        title:"智能设备"
                    },
                    name:"Home",
                    path:"home"
                },
                {
                  component:"iot/equipment/use/index",
                  meta: {
                      icon:"phone",
                      title:"使用设备"
                  },
                  name:"Equipment",
                  path:"equipment"
              }
              ],
              meta:{
                icon:"textarea",
                title:"智能设备"
              },
              name:"Iot",
              path:"/iot",
              redirect:"noRedirect"
            },
            {
                component:"Layout",
                meta: {
                    icon:"guide",
                    title:"驱动资源"
                },
                name: "Http://ruoyi.vip",
                path: "http://ruoyi.vip"
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
            }
          ]
    }
}


export default menu;