'use strict'

const assert = require('assert')
const exec = require('child_process').exec

class DingTalkRobot {
  constructor(accessToken) {
    assert(accessToken, 'accessToken is necessary!')
    this.accessToken = accessToken
  }

  alarmApi(data) {
    const { name = '', status = '', url = '', msg = '', alarm = 'api异常', isAtAll = false } = data
    this.sendMarkdown(
      {
        title: 'api异常',
        text: `
## ${alarm}
* 项目：${name}
* 状态：${status}
* url: ${url}
* 异常信息：${msg}
      `
      },
      isAtAll
    )
  }

  alarmMsg(data) {
    const { name = '', msg = '', title = '项目异常', isAtAll = false } = data
    this.sendMarkdown(
      {
        title: '异常',
        text: `
## ${title}
* 项目：${name}
* 异常信息：${msg}
      `
      },
      isAtAll
    )
  }

  /**
   * text 类型
   * text String 必填 文本内容
   * isAtAll 选填 是否抄送所有人
   */
  sendText(text = '', isAtAll = false) {
    this.send({
      msgtype: 'text',
      text: {
        content: text
      },
      at: {
        isAtAll: isAtAll
      }
    })
  }

  /**
   * link类型
   * text String 必填 文本内容
   * title String 必填 消息标题
   * picUrl String 必填 展示图片
   * messageUrl String 必填 点击消息跳转的URL
   */
  sendLink(linkObject) {
    this.send({
      msgtype: 'link',
      link: linkObject
    })
  }

  /**
   * 发布markdown 消息
   * {
   *  "title":"杭州天气",
   *  "text": "#### 杭州天气\n"
   *  }
   * @param markdownContent
   */
  sendMarkdown(markdownContent, isAtAll = false) {
    const { title = '无题', text = '' } = markdownContent
    this.send({
      msgtype: 'markdown',
      markdown: {
        title,
        text
      },
      'at': {
        isAtAll: isAtAll
      }
    })
  }

  send(contentBody) {
    exec(`
      curl 'https://oapi.dingtalk.com/robot/send?access_token=${this.accessToken}' \
       -H 'Content-Type: application/json' \
       -d '${JSON.stringify(contentBody)}'
    `)
  }
}

module.exports = DingTalkRobot
