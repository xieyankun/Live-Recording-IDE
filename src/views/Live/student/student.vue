<template>
  <div class="student-wrap">
    <div class="teach">
      <killer-ide :live='liveTeach'></killer-ide>
    </div>
    <div class="practice">
      <killer-ide :live='liveStud'></killer-ide>
    </div>

  </div>
</template>

<script>
import killerIde from '@/components/killer-ide/index/index'
export default {
  data () {
    return {
      liveTeach: {
        role: 0,
        where: 1
      },
      liveStud: {
        role: 1,
        where: 1
      }
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
