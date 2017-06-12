<template>
  <div class="teacher-wrap">
    <killer-ide :live='live'></killer-ide>
  </div>
</template>
<script>
import killerIde from '@/components/killer-ide/index/index'
export default {
  data () {
    return {
      live: {
        role: 0,
        where: 0
      }
    }
  },
  components: {
    'killer-ide': killerIde
  },
  mounted () {
  }
}
</script>

<style>
</style>
