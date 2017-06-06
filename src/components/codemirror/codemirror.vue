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
      console.log(this.$el)
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      // this.editor.setValue('Hello world');
      CodeMirror.on(this.editor, "change", function(instance, changeObj) {
        // console.log(instance);
        console.log(changeObj);
      });
    },
    methods: {
    }
  }
</script>
