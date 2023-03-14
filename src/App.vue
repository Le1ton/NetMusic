<template>
<div>
  <router-view/>
  <play-controller></play-controller>
</div>
</template>

<script>
import playController from "@/components/playController.vue"
export default {
  components: {
    playController,
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
}

a {
  color: #333;
  text-decoration: none;
}

.icon{
  width: 0.30rem;
  height: 0.30rem;
}

</style>
