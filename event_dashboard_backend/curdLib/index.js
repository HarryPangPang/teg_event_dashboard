var curd_consumer = {
    'getAllEvent':'SELECT * FROM 14to19event_lib',
    'getAllConsumer':'SELECT * FROM 1419consumerdata',
    'getConsumerCameWhichEvent':'SELECT * FROM 1419consumerdata WHERE 1419consumerdata.event_num LIKE ?',
    'searchConsumerEvent':'SELECT * FROM 14to19event_lib WHERE ? = 14to19event_lib.event_num ',
    'searchConsumerInfoByPhone':'SELECT * FROM 1419consumerdata_copy WHERE contact_info1 = ? || contact_info2 = ?'
}
module.exports =  curd_consumer

// 15160267这场活动来的人
// SELECT * FROM 1419consumerdata WHERE 1419consumerdata.event_num LIKE '%?%'