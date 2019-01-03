var curd_consumer = {
    'getAllEvent':'SELECT * FROM 14to19event_lib',
    'getAllConsumer':'SELECT * FROM 1419consumerdata',
    'getConsumerCameWhichEvent': 'SELECT * FROM 1419consumerdata WHERE FIND_IN_SET(?,event_num)',
    'searchConsumerEvent':'SELECT * FROM 14to19event_lib WHERE ? = 14to19event_lib.event_num ',
    'searchConsumerInfoByPhone':'SELECT * FROM 1419consumerdata WHERE contact_info1 = ? || contact_info2 = ?',
    'getUpdatedgetAllConsumer': 'SELECT * FROM AllEventMemberNumTmp',
    'clearAllEventMenberNumTmp':'truncate table AllEventMemberNumTmp',
    'clearAllConsumerLinkEvent':'truncate table allConsumerLinkEvent',
    'getUpdatedAllConsumerLinkEvent': 'SELECT * FROM allConsumerLinkEvent',
}
module.exports =  curd_consumer
