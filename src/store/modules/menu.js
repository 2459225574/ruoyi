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
                        title:"智能家居"
                    },
                    name:"Home",
                    path:"home"
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
            }
          ]
    }
    
}


export default menu;