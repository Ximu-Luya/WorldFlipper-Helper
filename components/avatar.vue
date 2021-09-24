<template>
  <view class="avatar-container bg-img">
    <view class="avatar">
      <image src="/static/image/avatar.png" lazy-load>
    </view>
    <view class="star">
      <image :src="`/static/image/icon/star-${avatarInfo.star}.png`" lazy-load>
    </view>
    <view class="attribute">
      <image :src="`/static/image/icon/${avatarInfo.attribute}.png`" lazy-load>
    </view>
  </view>
</template>

<script>
export default {
  props: ['avatarInfo'],
  mounted(){},
  options: {
    virtualHost: true
  }
}
</script>

<style lang="scss">
.avatar-container{
  position: relative;
  border-radius: 15% !important;
  z-index: 0;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);

  &:before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 50%,50% 50%;
    background-position: 0 0,100% 0,100% 100%,0 100%;
    background-color: white;
  }

  .avatar{
    position: absolute;
    top: 6rpx;
    right: 6rpx;
    left: 6rpx;
    bottom: 6rpx;
    background-color: white;
    border: 5rpx solid #606266;
    border-radius: 15%;
  }
  .star{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 18%;
    background-color: rgba(0,0,0,.5);
  }
  .attribute{
    position: absolute;
    right: 0;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 0 0 0 25%;
    background-color: white;
  }
}
</style>