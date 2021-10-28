<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
  onLaunch: function () {
    /**
     * 获取系统信息
     * 用于确定顶部导航栏高度与底部安全区域
     */
    uni.getSystemInfo({
      success: function (e) {
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;

        // 获取底部安全区域
        Vue.prototype.bottomSafeArea = e.screenHeight - e.safeArea.bottom
      },
    });
    
    /**
     * 获取角色与武器信息
     */
    this.getHandbookData()

    uni.navigateTo({ url: '/subPages/handbook/weaponDetail' })
  },
  methods: {
    ...mapActions('handbook',['getHandbookData'])
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>