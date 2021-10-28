<template>
  <view class="weapon-list bg-white grid grid-square col-5">
    <template v-for="(item, index) in weapons">
      <avatar :key="index" :avatar-info="item" @tap="checkDetail(item.star)"/>
    </template>
  </view>
</template>

<script>
import Avatar from '../../../components/avatar.vue'

export default {
  options: {
    virtualHost: true
  },
  data(){
    return {
      weapons: new Array(100).fill({star: 5, attribute: 'fire', avatarImg: '/static/image/weapon.png'}, 0, 100)
    }
  },
  mounted(){},
  components: {Avatar},
  methods: {
    checkDetail(id){
      uni.navigateTo({ url: '/subPages/handbook/weaponDetail' })
    }
  }
};
</script>

<style lang="scss">
.weapon-list{
  padding: 20rpx 20rpx;
}
</style>