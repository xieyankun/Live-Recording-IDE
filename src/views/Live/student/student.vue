<template>
  <div class="student-wrap">
    <div class="teach">
      <killer-ide></killer-ide>
    </div>
    <div class="practice">
      <killer-ide></killer-ide>
    </div>

  </div>
</template>

<script>
import killerIde from '@/components/killer-ide/index/index'
export default {
  data () {
    return {
    }
  },
  components: {
    'killer-ide': killerIde
  },
  mounted () {
    console.log('-------------========')
    var socket = require('socket.io-client')('http://localhost:5000')
    socket.on('teacher.programming', function (msg) {
      console.log(msg)
    })
  }
}
</script>

<style>
  .student-wrap{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #901231;
    display: flex;
  }
  .teach, .practice{
    position: relative;
    flex: 1;
  }
  .teach{
    border-right: 1px solid #fff;
  }
</style>
