var curd_consumer = {
    'getAllConsumer':'SELECT * FROM 1419consumerdata_copy',
    'searchConsumerEvent':'SELECT * FROM 14to19event_lib WHERE ? = 14to19event_lib.event_num ',
    'searchConsumerInfoByPhone':'SELECT * FROM 1419consumerdata_copy WHERE contact_info1 = ? || contact_info2 = ?'
}
module.exports =  curd_consumer