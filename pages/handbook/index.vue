<template>
<view>
<!--pages/about/index/index.wxml-->
<scroll-view scroll-x class="bg-white nav text-center">
  <view :class="'cu-item ' + ('character'==tabCur?'text-black cur':'text-gray')" @tap="tabSelect" data-tab-name="character">
    <text class="cuIcon-camerafill"></text>
    角色
  </view>
  <view :class="'cu-item ' + ('weapon'==tabCur?'text-black cur':'text-gray')" @tap="tabSelect" data-tab-name="weapon">
    <text class="cuIcon-upstagefill"></text>
    武器
  </view>
</scroll-view>
<view class="cu-bar bg-white margin-top">
  <view class="action">
    筛选器：
    <view class="cu-tag line-grey">全部星级</view>
  </view>
  <view class="action text-grey">
    <view @tap="toggleDrawer">更多筛选参数 ></view>
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      tabCur: 'character'
    };
  },

  components: {},
  props: {},
  methods: {
    // 导航栏切换
    tabSelect(e) {
      this.setData({
        tabCur: e.currentTarget.dataset.tabName
      });
    },

    // 筛选参数Drawer控制
    toggleDrawer() {
      this.$emit('toggleDrawer');
    }

  }
};
</script>
<style>
@import "./index.css";
</style>