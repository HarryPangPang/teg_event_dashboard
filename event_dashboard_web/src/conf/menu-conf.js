module.exports = [
    {
        name: '报表可视化',
        id: 'dashboard1',
        sub: [
            {   
                name: '客户分布',
                componentName: 'PieDashBoard'
            }, {
                name: '客户分布2',
                componentName: 'Login'
            }
        ]
    },
    {
        name: '客户信息',
        id: 'dashboard2',
        sub: [
            {   
                name: '客户信息查找',
                componentName: 'searchConsuerInfo'
            }, {
                name: 'Checkbox 多选框',
                componentName: 'PieDashBoard'
            }
        ]
    }
]