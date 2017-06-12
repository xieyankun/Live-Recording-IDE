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
      config: {
        type: Object,
        role: {
          type: String,
          required: true
        }
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
      console.log(this.$el)
      console.log(typeof(this.config.role))
      let _this = this
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      // this.editor.setValue('Hello world');
      CodeMirror.on(this.editor, "change", function(instance, changeObj) {
        // console.log(instance);
        // code直播
        _this.liveTeachCode(changeObj);

        console.log(changeObj);
      });
    },
    methods: {
      liveTeachCode: function(changeObj){
        let role = this.config.role;
        let socket = require('socket.io-client')('http://localhost:5000');
        if (role == 0) {
          socket.emit('teacher.programming', changeObj);
        }else{
          console.log('学生端')
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
