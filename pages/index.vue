<template>
  <view>
    <!-- 页面主体 -->
    <scroll-view
      scroll-y
      class="DrawerPage"
      :class="{'show': drawerVisible}"
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
      class="DrawerClose"
      :class="{'show': drawerVisible}"
      @tap="toggleDrawerVisible"
    >
      <text class="cuIcon-pullright"></text>
    </view>

    <!-- 筛选参数抽屉 -->
    <scroll-view
      scroll-y
      class="DrawerWindow"
      :class="{'show': drawerVisible}"
    >
      <handbook-filter></handbook-filter>
    </scroll-view>
  </view>
</template>

<script>
import home from "./home/index.vue";
import handbook from "./handbook/index.vue";
import lineup from "./lineup/index.vue";
import about from "./about/index.vue";
import HandbookFilter from "./handbook/components/HandbookFilter.vue"
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(['tabCurrent', 'drawerVisible'])
  },

  components: {
    home,
    handbook,
    lineup,
    about,
    HandbookFilter
  },
  props: {},
  methods: {
    ...mapMutations(['toggleDrawerVisible']),
  },
};
</script>

<style lang="scss">
@import '@/colorui/drawer.css';
.DrawerWindow{
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
}
</style>