<template>
  <textarea></textarea>
</template>

<script>
  /* eslint-disable */
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/theme/base16-dark.css'
  export default {
    data() {
      return {
      }
    },
    props: {
      options: {
        type: Object,
        required: true
      },
      live: {
        type: Object
      }
    },
    created() {
      if (this.options.lineNumbers === undefined) {
        this.options.lineNumbers = true
      }
      if (this.options.lineWrapping === undefined) {
        this.options.lineWrapping = false
      }
      if (this.options.mode === undefined) {
        this.options.mode = 'text/javascript'
      }
      if (this.options.smartIndent === undefined) {
        this.options.smartIndent = false
      }
    },
    mounted: function() {
      console.log('------------------------')
      console.log(this.live.role)
      let _this = this
      let _role = this.live.role
      let _where = this.live.where
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      // this.editor.setValue('Hello world');
      CodeMirror.on(this.editor, "change", function(instance, changeObj) {
        // console.log(instance);
        // code直播
        if (_role === 0 && _where === 0) {
          _this.liveTeachCode(changeObj);
        }
        console.log(changeObj);
      });

      if (_role === 0 && _where === 1) {
        console.log('学生端')
        _this.livePlayCode();
      }
    },
    methods: {
      liveTeachCode: function(changeObj){
        let role = this.live.role;
        let socket = require('socket.io-client')('http://localhost:5000')
        if (role == 0) {
          socket.emit('teacher.programming', changeObj)
        }else{
          console.log('学生端')
        }
      },
      livePlayCode: function(){
        let socket = require('socket.io-client')('http://localhost:5000')
        let _teacher = this.editor;
        let _this = this
        socket.on('teacher.programming', function(msg) {
            console.log('--------------mesg');
            console.log(msg);
            // var msgObj = JSON.parse(msg)
            _this.processChangeObject(_teacher, msg)

        });
      },
      processChangeObject: function(playbackcm, obj){
        for (var i = 0; i < obj.text.length; i++) {
            /* 设置鼠标行标示 */
            if (playbackcm.getTextArea().id === "HTMLplayer") {
                if (htmlhlLine !== null) {
                    playbackcm.clearMarker(htmlhlLine);
                }
                htmlhlLine = playbackcm.setMarker(obj.from.line + i, '<span class="text-primary glyphicon glyphicon-pencil"></span>');
            } else if (playbackcm.getTextArea().id === "CSSplayer") {
                if (csshlLine !== null) {
                    playbackcm.clearMarker(csshlLine);
                }
                csshlLine = playbackcm.setMarker(obj.from.line + i, '<span class="text-primary glyphicon glyphicon-pencil"></span>');
            } else if (playbackcm.getTextArea().id === "JSplayer") {
                if (jshlLine !== null) {
                    playbackcm.clearMarker(jshlLine);
                }
                jshlLine = playbackcm.setMarker(obj.from.line + i, '<span class="text-primary glyphicon glyphicon-pencil"></span>');
            }

            /* 设置鼠标输入指针 */
            playbackcm.setCursor({ line: obj.from.line + i, ch: obj.from.ch });

            //以下代码处理其他
            if (obj.text.length === 3 && obj.text[1] !== '' && i === 1) {
                playbackcm.setSelection({ line: obj.from.line + i, ch: 0 });
            } else if (obj.text.length === 3 && obj.text[2] !== '' && i === 2) {
                playbackcm.setSelection({ line: obj.from.line + i, ch: 0 });

                //以下代码处理文字块选择并回车的问题 
            } else if (obj.text.length === 2 && obj.text[i] === '' && i === 1) {
                playbackcm.setSelection({ line: obj.from.line + i, ch: 0 });

                //以下处理块选择并且粘贴多行问题
            } else {
                if (i == 0) {
                    playbackcm.setSelection({ line: obj.from.line + i, ch: obj.from.ch }, { line: obj.to.line + i, ch: obj.to.ch });
                } else {
                    playbackcm.setSelection({ line: obj.from.line + i, ch: 0 }, { line: obj.from.line + i, ch: 0 });
                }
            }

            if (i !== obj.text.length - 1) {
                playbackcm.replaceSelection(obj.text[i] + '\n');
            } else {
                playbackcm.replaceSelection(obj.text[i]);
            }
        }

        if (obj.next) {
            processChangeObject(playbackcm, obj.next);
        }
      }
    }
  }
</script>
<style>
  .CodeMirror{
    height: 100% !important;
  }
</style>
