const DingTalk = require('./lib/index.js')

let robot = new DingTalk('')

// robot.alarmApi({
//     name:'starkwang',
//     status :'500',
//     url :'http://stark.wang',
//     msg :'',
//     alarm :'api异常',
//     isAtAll :true
// })
robot.alarmMsg({
  name: 'starkwang',
  msg: '发生了一个异常',
  title: '项目异常',
  isAtAll: true
})
// robot.alarmApi({'web学习中心', 500, 'http://stark.wang', '', '',true})
// robot.sendText('hello stark wang', true) // 抄送所有人
