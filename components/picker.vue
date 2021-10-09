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
      {{value.label || placeholder}}
    </view>
  </view>
</template>

<script>
export default {
  options: {
    virtualHost: true
  },
  props: {
    options: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      default: null
    }
  },
  data(){
    return {
      show: false,
    }
  },
  methods: {
    confirm(data){
      this.$emit('input', data[0])
    }
  }
}
</script>

<style>

</style>