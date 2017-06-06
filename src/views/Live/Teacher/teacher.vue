<template>
  <div class="title">
    <codemirror :options="editorOptions"></codemirror>
  </div>
</template>

<script>
import codemirror from '@/components/codemirror/codemirror'
export default {
  data () {
    return {
      editorOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  components: {
    'codemirror': codemirror
  }
}
</script>

<style>
</style>
