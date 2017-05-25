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
        options: {
          value: "Hello world",
          mode: 'text/javascript',
          lineNumbers: true,
          smartIndent: false,
          theme: 'base16-dark'
        }
      }
    },
    created() {
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
