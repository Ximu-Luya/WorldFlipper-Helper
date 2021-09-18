<template>
  <view class="character-list bg-white grid grid-square col-5">
    <template v-for="(item, index) in characters">
      <avatar :key="index" :avatar-info="item" />
    </template>
  </view>
</template>

<script>
import Avatar from '../../components/avatar.vue'

export default {
  data(){
    return {
      characters: new Array(100).fill({star: 5, element: 'nature'}, 0, 100)
    }
  },
  mounted(){
  },
  components: {Avatar},
};
</script>

<style lang="scss">
.character-list{
  padding: 20rpx 20rpx;
}
</style>