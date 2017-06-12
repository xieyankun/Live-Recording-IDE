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
        }else{
          _this.livePlayCode();
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
        socket.on('teacher.programming', function(msg) {
            console.log('--------------mesg');
            console.log(msg);
        });
      }
    }
  }
</script>
<style>
  .CodeMirror{
    height: 100% !important;
  }
</style>
