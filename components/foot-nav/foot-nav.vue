<template>
  <!-- 底部导航栏 -->
  <view class="cu-bar tabbar bg-white shadow foot">
    <block v-for="(item, index) in tabData" :key="index">
      <view class="action" @tap="NavChange(item.url)">
        <view class="cuIcon-cu-image">
          <image
            :src="`/static/image/tabbar/${item.name}${tabCurrent == item.url ? '_cur' : ''}.png`"
          ></image>
        </view>
        <view :class="tabCurrent == item.url ? 'text-green' : 'text-gray'">
          {{item.label}}
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      tabData: [
        {
          url: "pages/home/index",
          name: "home",
          label: "首页",
        },
        {
          url: "pages/handbook/index",
          name: "handbook",
          label: "图鉴",
        },
        {
          url: "pages/lineup/index",
          name: "lineup",
          label: "阵容",
        },
        {
          url: "pages/about/index",
          name: "about",
          label: "关于",
        },
      ],
    };
  },
  computed: {
    ...mapState(['tabCurrent'])
  },
  props: {},

  mounted() {},

  methods: {
    ...mapActions(['updateTabCurrent']),
    // 底部导航栏切换
    NavChange(cur) {
      this.updateTabCurrent(cur)
    },
  },
};
</script>

<style>
</style>