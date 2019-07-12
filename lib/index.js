'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = require('assert');
var exec = require('child_process').exec;

var DingTalkRobot = function () {
  function DingTalkRobot(accessToken) {
    _classCallCheck(this, DingTalkRobot);

    assert(accessToken, 'accessToken is necessary!');
    this.accessToken = accessToken;
  }

  _createClass(DingTalkRobot, [{
    key: 'alarmApi',
    value: function alarmApi(data) {
      var _data$name = data.name,
          name = _data$name === undefined ? '' : _data$name,
          _data$status = data.status,
          status = _data$status === undefined ? '' : _data$status,
          _data$url = data.url,
          url = _data$url === undefined ? '' : _data$url,
          _data$msg = data.msg,
          msg = _data$msg === undefined ? '' : _data$msg,
          _data$alarm = data.alarm,
          alarm = _data$alarm === undefined ? 'api异常' : _data$alarm,
          _data$isAtAll = data.isAtAll,
          isAtAll = _data$isAtAll === undefined ? false : _data$isAtAll;

      this.sendMarkdown({
        title: 'api异常',
        text: '\n## ' + alarm + '\n* \u9879\u76EE\uFF1A' + name + '\n* \u72B6\u6001\uFF1A' + status + '\n* url: ' + url + '\n* \u5F02\u5E38\u4FE1\u606F\uFF1A' + msg + '\n      '
      }, isAtAll);
    }
  }, {
    key: 'alarmMsg',
    value: function alarmMsg(data) {
      var _data$name2 = data.name,
          name = _data$name2 === undefined ? '' : _data$name2,
          _data$msg2 = data.msg,
          msg = _data$msg2 === undefined ? '' : _data$msg2,
          _data$title = data.title,
          title = _data$title === undefined ? '项目异常' : _data$title,
          _data$isAtAll2 = data.isAtAll,
          isAtAll = _data$isAtAll2 === undefined ? false : _data$isAtAll2;

      this.sendMarkdown({
        title: '异常',
        text: '\n## ' + title + '\n* \u9879\u76EE\uFF1A' + name + '\n* \u5F02\u5E38\u4FE1\u606F\uFF1A' + msg + '\n      '
      }, isAtAll);
    }

    /**
     * text 类型
     * text String 必填 文本内容
     * isAtAll 选填 是否抄送所有人
     */

  }, {
    key: 'sendText',
    value: function sendText() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var isAtAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.send({
        msgtype: 'text',
        text: {
          content: text
        },
        at: {
          isAtAll: isAtAll
        }
      });
    }

    /**
     * link类型
     * text String 必填 文本内容
     * title String 必填 消息标题
     * picUrl String 必填 展示图片
     * messageUrl String 必填 点击消息跳转的URL
     */

  }, {
    key: 'sendLink',
    value: function sendLink(linkObject) {
      this.send({
        msgtype: 'link',
        link: linkObject
      });
    }

    /**
     * 发布markdown 消息
     * {
     *  "title":"杭州天气",
     *  "text": "#### 杭州天气\n"
     *  }
     * @param markdownContent
     */

  }, {
    key: 'sendMarkdown',
    value: function sendMarkdown(markdownContent) {
      var isAtAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _markdownContent$titl = markdownContent.title,
          title = _markdownContent$titl === undefined ? '无题' : _markdownContent$titl,
          _markdownContent$text = markdownContent.text,
          text = _markdownContent$text === undefined ? '' : _markdownContent$text;

      this.send({
        msgtype: 'markdown',
        markdown: {
          title: title,
          text: text
        },
        'at': {
          isAtAll: isAtAll
        }
      });
    }
  }, {
    key: 'send',
    value: function send(contentBody) {
      exec('\n      curl \'https://oapi.dingtalk.com/robot/send?access_token=' + this.accessToken + '\'        -H \'Content-Type: application/json\'        -d \'' + JSON.stringify(contentBody) + '\'\n    ');
    }
  }]);

  return DingTalkRobot;
}();

module.exports = DingTalkRobot;