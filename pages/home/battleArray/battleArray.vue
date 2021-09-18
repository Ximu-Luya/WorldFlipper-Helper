<template>
<view>
<!--pages/home/index/battleArray/battleArray.wxml-->
<view class="cu-bar bg-white solid-bottom margin-top">
  <view class="action">阵容分享</view>
  <view class="action text-grey">
    <navigator url>更多 ></navigator>
  </view>
</view>
<view class="padding bg-white">
  <view class="flex flex-wrap">
    <view class="basis-xs bg-grey margin-xs padding-sm radius">xs(20%)</view>
    <view class="basis-df"></view>
    <view class="basis-sm bg-grey margin-xs padding-sm radius">sm(40%)</view>
    <view class="basis-df"></view>
    <view class="basis-df bg-grey margin-xs padding-sm radius">sub(50%)</view>
    <view class="basis-lg bg-grey margin-xs padding-sm radius">lg(60%)</view>
    <view class="basis-xl bg-grey margin-xs padding-sm radius">xl(80%)</view>
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  methods: {}
};
</script>
<style>
@import "./battleArray.css";
</style>