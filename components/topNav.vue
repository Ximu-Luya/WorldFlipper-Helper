<template>
  <cu-custom bgColor="bg-white" :isBack="isBack">
    <template v-slot:backText>
      <view v-show="isBack">返回</view>
    </template>
    <template v-slot:content>弹射世界助手</template>
  </cu-custom>
</template>

<script>
import CuCustom from "../colorui/components/cu-custom.vue"
export default {
  data() {
    return {};
  },
  props: ['isBack'],
  components: {CuCustom},
  methods: {},
};
</script>

<style>
</style>