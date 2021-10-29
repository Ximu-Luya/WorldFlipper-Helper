<template>
  <view class="character-list bg-white grid grid-square col-5">
    <template v-for="(item, index) in characters">
      <avatar :key="index" :avatar-info="item" @tap="checkDetail(item.uuid)"/>
    </template>
  </view>
</template>

<script>
import Avatar from '../../../components/avatar.vue'
import { mapState } from 'vuex';

export default {
  options: {
    virtualHost: true
  },
  computed: mapState('handbook',['characters']),
  components: {Avatar},
  methods: {
    checkDetail(uuid){
      uni.navigateTo({ url: `/subPages/handbook/characterDetail?uuid=${uuid}` })
    }
  }
};
</script>

<style lang="scss">
.character-list{
  padding: 20rpx 20rpx;
}
</style>