var curd_consumer = {
    'getAllConsumer':'SELECT * FROM 1419consumerdata_copy',
    'searchConsumerEvent':'SELECT * FROM 14to19event_lib WHERE ? = 14to19event_lib.event_num '
}
module.exports =  curd_consumer