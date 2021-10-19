<template>
  <view class="u-select">
    <u-select
      v-model="show"
      mode="single-column"
      :list="options"
      :placeholder="placeholder"
      @confirm="confirm"
    ></u-select>
    <view class="selector-button" @tap="show = true">
      {{curValue.label || placeholder}}
    </view>
  </view>
</template>

<script>
export default {
  options: {
    virtualHost: true
  },
  props: {
    // 选项
    options: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 绑定值
    value: {
      default: null
    }
  },
  data(){
    return {
      show: false,
      curValue: null
    }
  },
  methods: {
    confirm(data){
      this.curValue = data[0]
      this.$emit('input', data[0].value)
    }
  }
}
</script>

<style>

</style>