<template>
  <div id="ide">
    <div class="ide-container">
      <div class="toolbar"></div>
      <div id="idegrid">
        <div id="codewrap">
          <div id="filetree">
          </div>
          <div id="codeditor">
            <codemirror 
                      :options="editorConfig" 
                      :live="liveConfig"
                      :record="recordConfig"></codemirror>
          </div>
          <div id="v-line"></div>
        </div>
        <div id="terminalwrap">
          <div class="grid-terminal"></div>
          <div id="l-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import codemirror from '../codemirror/codemirror'
export default {
  data () {
    return {
      editorConfig: {
        tabSize: 4,
        mode: 'text/javascript',
        // theme: 'base16-dark',
        lineNumbers: true,
        line: true
      },
      liveConfig: this.live,
      recordConfig: this.record
    }
  },
  props: {
    /*
    * 跟随编程
    * role 0:老师, 1:学生, 2:回放页面
    */
    live: {
      type: Object
    },
    /*
    * 实景编程
    * role 0:老师, 1:学生, 2:回放页面
    */
    record: {
      type: Object
    }
  },
  components: {
    'codemirror': codemirror
  },
  mounted () {
    function $(id) {
      return document.getElementById(id)
    }

    window.onload = function() {
      var codewrap = $("codewrap"),
        filetree = $("filetree"),
        codeditor = $("codeditor"),
        ide = $("ide"),
        vLine = $("v-line")

      var idegrid = $("idegrid"),
        terminalwrap = $("terminalwrap"),
        lLine = $("l-line")


      vLine.onmousedown = function(e) {
          var disX = (e || event).clientX;    // Êó±ê¾àä¯ÀÀÆ÷×ó±ßµÄ³¤¶È
          var vLineLeft = vLine.offsetLeft;       // Ïß¾àºÐ×Ó×ó±ß¾àµÄµÄ³¤¶È

          console.log(disX)
          console.log(vLine.offsetLeft)

          document.onmousemove = function(e) {
              var newLeft = vLineLeft + ((e || event).clientX - disX);
              console.log('--------')
              console.log(vLineLeft)

              vLine.style.left = filetree.style.width = newLeft + "px";
              codeditor.style.width = codewrap.clientWidth - newLeft + "px";
      
              return false
          }
          document.onmouseup = function() {
              document.onmousemove = null;
              document.onmouseup = null;
          };
          vLine.setCapture && vLine.setCapture();
          return false
      }

      lLine.onmousedown = function(e) {
        var disY = (e || event).clientY;
        var lLineTop = lLine.offsetTop;

        var Bottom = ide.clientHeight - disY;
        console.log(Bottom);

        document.onmousemove = function(e) {
          var newBottom = 200 + (disY - (e || event).clientY);

          lLine.style.bottom = terminalwrap.style.height = newBottom + "px";
          codewrap.style.height = idegrid.clientHeight - newBottom + "px";
          console.log('--------')
          console.log(newBottom)

          return false
        }
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        lLine.setCapture && lLine.setCapture();
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ide{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background-color: #FFF;
  }
  .toolbar{
    width: 100%;
    height: 36px;
    position: absolute;
    background: #999;
    z-index: 999;
  }
  #idegrid{
    width: 100%;
    height:-moz-calc(100% - 36px); 
    height:-webkit-calc(100% - 36px);
    height: calc(100% - 36px);
    position: absolute;
    box-sizing: border-box;
    /*background: red;*/
    overflow: auto;
    top: 36px;
  }
  #codewrap{
    width: 100%;
    height:-moz-calc(100% - 200px); 
    height:-webkit-calc(100% - 200px);
    height: calc(100% - 200px);
    position: absolute;
    box-sizing: border-box;
    /*background: red;*/
    overflow: auto;
  }

  #filetree{
    width: 200px;
    height: 100%;
    background: #666;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    z-index: 9;
  }

  #codeditor{
    width: calc(100% - 200px);
    /*width: 100%;*/
    height: 100%;
    background: #0e8f9e;
    position: absolute;
    top: 0;
    right: 0;
    overflow: auto;
    z-index: 8;
  }

  #v-line{
    width: 2px;
    height: 100%;
    position: absolute;
    left: 198px;
    background: red;
    cursor: col-resize;
    z-index: 9;
  }

  #terminalwrap{
    width: 100%;
    height: 200px;
    background: #502d6d;
    position: absolute;
    bottom: 0;
    z-index: 9;
  }
  #l-line{
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 198px;
    background: red;
    cursor: row-resize;
    z-index: 9;
  }
</style>
