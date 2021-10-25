<template>
  <view>
    <!-- 头部导航栏 -->
    <top-nav></top-nav>
    <battle-array></battle-array>
  </view>
</template>

<script>
import battleArray from "./battleArray/battleArray";

export default {
  data() {
    return {};
  },

  components: {
    battleArray
  },
  props: {},
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>