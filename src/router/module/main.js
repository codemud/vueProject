import Layout from "@/views/Layout";

export default [
    {
        path: "/home/baseMs",
        name: "基础模块",
        icon: "el-icon-s-home",
        component: Layout,
        children: [
            {
                name: "基础页面",
                path: "/home/baseMs",
                meta: {parentName: "基础信息"},
                component: () => import(`@/views/main/home/baseMs`)
            },
        ]
    },
    {
        path: "/specialMs",
        name: "医院管理",
        icon: "el-icon-s-comment",
        component: Layout,
        children: [
            {
                path: "/specialMs",
                name: "医院列表",
                meta: {parentName: "医院管理"},
                component: () => import(`@/views/main/specialMs`),

            },
        ]
    },
    {
        path: "/doctorMs",
        name: "医生管理",
        icon: "el-icon-s-custom",
        component: Layout,
        children: [
            {
                path: "/doctorMs",
                name: "医生列表",
                meta: {parentName: "医生管理"},
                component: () => import(`@/views/main/doctorMs`)
            }
        ],
        super: 1
    },
    {
        path: "/patientMs",
        name: "患者管理",
        icon: "el-icon-s-data",
        component: Layout,
        children: [
            {
                path: "/patientMs",
                name: "患者列表",
                meta: {parentName: "患者管理"},
                component: () => import(`@/views/main/patientMs`)
            }
        ]
    },
    {
        path: "/orderMs",
        name: "订单管理",
        icon: "el-icon-s-tools",
        component: Layout,
        children: [
            {
                path: "/orderMs",
                name: "订单列表",
                meta: {parentName: "订单管理"},
                component: () => import(`@/views/main/orderMs`)
            }
        ]
    },
];
