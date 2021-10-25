<template>
  <view>
    <!-- 头部导航栏 -->
    <top-nav></top-nav>
    <view class="top-function-area">
      <view class="bg-white nav text-center">
        <view
          class="cu-item"
          :class="{'text-black cur': 'character' == tabCur, 'text-gray': 'character' !== tabCur}"
          @tap="tabSelect('character')"
        >
          <text class="cuIcon-camerafill"></text>
          角色
        </view>
        <view
          class="cu-item"
          :class="{'text-black cur': 'weapon' == tabCur, 'text-gray': 'weapon' !== tabCur}"
          @tap="tabSelect('weapon')"
        >
          <text class="cuIcon-upstagefill"></text>
          武器
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          筛选器：
          <view class="cu-tag line-grey">全部星级</view>
        </view>
        <view class="action text-grey">
          <view @tap="toggleDrawerVisible">更多筛选参数 ></view>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="margin-top" >
      <character v-if="tabCur === 'character'"></character>
      <weapon v-if="tabCur === 'weapon'"></weapon>
    </scroll-view>
  </view>
</template>

<script>
import Character from './components/character.vue'
import Weapon from './components/weapon.vue';
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      tabCur: "character",
    };
  },

  components: { Character, Weapon },
  props: {},
  methods: {
    // 筛选参数Drawer控制
    ...mapMutations(['toggleDrawerVisible']),
    // 导航栏切换
    tabSelect(tab) {
      this.tabCur = tab;
    },
  },
};
</script>

<style>
</style>