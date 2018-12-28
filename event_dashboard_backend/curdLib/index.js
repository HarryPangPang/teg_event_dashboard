var curd_consumer = {
    'getAllEvent':'SELECT * FROM 14to19event_lib1',
    'getAllConsumer':'SELECT * FROM 1419consumerdata',
    'getConsumerCameWhichEvent': 'SELECT * FROM 1419consumerdata WHERE FIND_IN_SET(?,event_num)',
    // 'getConsumerCameWhichEvent':'SELECT * FROM 1419consumerdata WHERE event_num like ?',
    'searchConsumerEvent':'SELECT * FROM 14to19event_lib WHERE ? = 14to19event_lib.event_num ',
    'searchConsumerInfoByPhone':'SELECT * FROM 1419consumerdata_copy WHERE contact_info1 = ? || contact_info2 = ?'
}
module.exports =  curd_consumer
