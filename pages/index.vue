<template>
  <view>
    <!-- 页面主体 -->
    <scroll-view
      scroll-y
      :class="'DrawerPage ' + (drawerVisible ? 'show' : '')"
    >
      <!-- 头部导航栏 -->
      <top-nav></top-nav>

      <!-- 页面主体 -->
      <view class="index-page-content">
        <home v-if="tabCurrent == 'pages/home/index'"></home>
        <handbook v-if="tabCurrent == 'pages/handbook/index'"></handbook>
        <lineup v-if="tabCurrent == 'pages/lineup/index'"></lineup>
        <about v-if="tabCurrent == 'pages/about/index'"></about>
        <view class="cu-tabbar-height"></view>
      </view>
      
      <!-- 底部导航栏 -->
      <foot-nav></foot-nav>
    </scroll-view>

    <!-- 抽屉返回按钮 -->
    <view
      :class="'DrawerClose ' + (drawerVisible ? 'show' : '')"
      @tap="toggleDrawerVisible"
    >
      <text class="cuIcon-pullright"></text>
    </view>

    <!-- 筛选参数抽屉 -->
    <scroll-view
      scroll-y
      :class="'DrawerWindow ' + (drawerVisible ? 'show' : '')"
    >
      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
        
      </view>
    </scroll-view>
  </view>
</template>

<script>
import topNav from "../components/topNav.vue";
import footNav from "../components/footNav.vue";
import home from "./home/index.vue";
import handbook from "./handbook/index.vue";
import lineup from "./lineup/index.vue";
import about from "./about/index.vue";
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(['tabCurrent', 'drawerVisible'])
  },

  components: {
    topNav,
    footNav,
    home,
    handbook,
    lineup,
    about,
  },
  props: {},
  methods: {
    ...mapMutations(['toggleDrawerVisible'])
  },
};
</script>

<style>
.DrawerPage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0vw;
  background-color: #f1f1f1;
  transition: all 0.4s;
}

.DrawerPage.show {
  transform: scale(0.9, 0.9);
  left: 85vw;
  box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
  transform-origin: 0;
}

.DrawerWindow {
  position: absolute;
  width: 85vw;
  height: 100vh;
  left: 0;
  top: 0;
  transform: scale(0.9, 0.9) translateX(-100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.DrawerWindow.show {
  transform: scale(1, 1) translateX(0%);
  opacity: 1;
  pointer-events: all;
}

.DrawerClose {
  position: absolute;
  width: 40vw;
  height: 100vh;
  right: 0;
  top: 0;
  color: transparent;
  padding-bottom: 30rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.01),
    rgba(0, 0, 0, 0.6)
  );
  letter-spacing: 5px;
  font-size: 50rpx;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.DrawerClose.show {
  opacity: 1;
  pointer-events: all;
  width: 15vw;
  color: #fff;
}
</style>