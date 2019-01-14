let menuConf = [
    {
        name: '报表可视化',
        id: 'dashboard1',
        sub: [
            {   
                name: '客户图表',
                componentName: 'ConsumerDashBoard'
            }, {
                name: '活动图表',
                componentName: 'eventDashboard'
            }
        ]
    },
    {
        name: '客户信息',
        id: 'dashboard2',
        sub: [
            {   
                name: '客户信息',
                componentName: 'searchConsumerInfo'
            }, {
                name: '活动',
                componentName: 'searchEventInfo'
            }
        ]
    }
]

export default menuConf;