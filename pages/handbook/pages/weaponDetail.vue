<template>
  <view class="detail-content">
    <top-nav :isBack="true"></top-nav>

    <scroll-view scroll-y class="weapon-detail">
      <view class="title">
        <text class="name">{{name}}</text>
        <view class="obtain" @tap="showObtain">
          入手方法<image style="height: 32rpx;width: 32rpx;margin-left: 4rpx" src="/static/image/icon/info.png" />
        </view>
        
        <!-- 入手方法模态框 -->
        <view class="cu-modal" :class="modal?'show':''">
          <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
              <view class="content">入手方法</view>
              <view class="action" @tap="hideObtain">
                <text class="cuIcon-close text-red"></text>
              </view>
            </view>
            <view class="padding-xl">
              {{obtain}}
            </view>
          </view>
        </view>
      </view>

      <view class="content">
        <view class="avatar-info">
          <image class="img" :src="weaponImg" />
          <image class="star" :src="`/static/image/icon/star-${starRating}.png`"/>
        </view>
        
        <view class="weapon-info">
          <view class="awake-lv">
            <view class="label">觉醒Lv：</view>
            <view class="awake-icon-area">
              <image
                class="edit-icon"
                mode="heightFix"
                src="/static/image/icon/reduce.png"
                :style="{visibility: awakeLv > 0?'visible':'hidden'}"
                @tap="() => { awakeLv-- }"
              ></image>

              <image
                v-for="(i, index) in [1,2,3,4]"
                :key="index"
                :src="`/static/image/icon/${awakeLv >= i?'awake':'sleep'}.png`"
                class="awake-icon"
                mode="heightFix"
              ></image>

              <image
                class="edit-icon"
                mode="heightFix"
                src="/static/image/icon/plus.png"
                :style="{visibility: awakeLv < 4?'visible':'hidden'}"
                @tap="() => { awakeLv++ }"
              ></image>
            </view>
          </view>
          
          <view class="basic-info">
            <view class="now-data">
              <text>HP：{{HP[awakeLv]}}</text>
              <text>攻击力：{{ATK[awakeLv]}}</text>
            </view>
            <view class="max-data">
              <text>HPMAX：{{HP[4]}}</text>
              <text>攻击力MAX：{{ATK[4]}}</text>
            </view>
          </view>
          
          <view class="skill-info">
            <view class="now-data">
              <text> {{skillInfo[awakeLv]}} </text>
            </view>
            <view class="max-data">
              <text>MAX：{{skillInfo[4]}} </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data(){
    return {
      // 顶部导航栏高度
      CustomBar: this.CustomBar,
      // 入手方法模态框
      modal: false,
      // 武器图标
      weaponImg: 'https://wf.hotimi.com/assets/upload/c4e2c1a4-f269-44a7-8da5-d1eb88646d0c.png',
      // 武器名称
      name: '普罗米修斯之剑',
      // 入手方法
      obtain: '暗潮汹涌的迷宫崩坏区域[火](首次通关)\n深层区域3[火](几率掉落)',
      // 武器星级
      starRating: 5,
      // 武器属性
      attribute: 'fire',
      // 属性名称
      attributeName: '火',
      // 觉醒等级
      awakeLv: 3,
      // HP
      HP: [100, 200, 300, 499, 550],
      // ATK
      ATK: [50, 90, 120, 150, 195, 220],
      // 技能详情
      skillInfo: [
        '当角色发动技能时，队伍中火属性角色的技能伤害+10%[最大50%] / 每弹射15次，自身的技能槽+5%（上限10次）',
        '当角色发动技能时，队伍中火属性角色的技能伤害+12%[最大50%] / 每弹射15次，自身的技能槽+6%（上限10次）',
        '当角色发动技能时，队伍中火属性角色的技能伤害+14%[最大50%] / 每弹射15次，自身的技能槽+7%（上限10次）',
        '当角色发动技能时，队伍中火属性角色的技能伤害+16%[最大50%] / 每弹射15次，自身的技能槽+8%（上限10次）',
        '当角色发动技能时，队伍中火属性角色的技能伤害+20%[最大100%] / 每弹射15次，自身的技能槽+10%（上限10次）'
      ]
    }
  },
  methods: {
    // 显示入手方法模态框
    showObtain() { this.modal = true },
    // 隐藏入手方法模态框
    hideObtain(){ this.modal = false }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: white;
}
image {
  // z-index: -1;
}
.weapon-detail{
  padding: 30rpx;
  $horizontal-padding: 40rpx;
  position: relative;

  // 标题栏
  .title{
    $title-height: 80rpx;
    @mixin line-height {
      line-height: $title-height;
      height: $title-height;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 0;
    height: $title-height;

    // 标题栏下横线
    &::before{
      content: '';
      position: absolute;
      z-index: -2;
      width: 100%;
      height: 4rpx;
      background-color: #00D4C6;
      bottom: 0;
    }

    // 武器名称
    .name{
      padding-left: $horizontal-padding;
      font-size: 36rpx;
      @include line-height;
    }

    // 入手方法
    .obtain{
      font-size: 28rpx;
      padding-left: 80rpx;
      padding-right: 16rpx;
      display: flex;
      align-items: center;
      color: white;
      position: relative;
      overflow: hidden;
      @include line-height;

      &::before{
        content: '';
        position: absolute;
        z-index: -1;
        left: 0; right: 0;
        top: 0; bottom: 0;
        transform-origin: bottom right;
        border: 4rpx solid #00D4C6;
        transform: scaleY(1.6) perspective(12rpx) rotateX(5deg);
        background-color: #00C9B6;
        border-radius: 16rpx 16rpx 0 0;
      }
    }

    .cu-modal .content{
      display: block;
      padding: 0;;
    }
  }

  // 内容部分
  .content{
    display: flex;
    padding: 20rpx $horizontal-padding;

    // 武器图标与星级
    .avatar-info{
      margin-right: 20rpx;
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .img{
        width: 130rpx;
        height: 130rpx;
        margin-bottom: 10rpx;
      }

      .star{
        width: 130rpx;
        height: 24rpx;
      }
    }

    // 武器信息
    .weapon-info{
      $margin-bottm: 10rpx;

      // 觉醒等级
      .awake-lv{
        $height: 48rpx;
        @mixin height{
          height: $height;
          line-height: $height;
        }
        font-size: 36rpx;
        display: flex;
        @include height;

        .label{
          @include height;
        }
        
        .awake-icon-area{
          display: flex;
          align-items: center;

          .awake-icon{
            height: $height * 0.8;
            width: auto;
          }

          .edit-icon{
            height: $height * 0.5;
            width: auto;
            margin: 0 10rpx;
            visibility: hidden;
          }
        }
      }

      // 最大觉醒等级数据
      .max-data{
        font-size: 24rpx;
        color: #ACACAC;
      }
      // 单行内文字需要间距
      text{
        margin-right: 30rpx;
      }

      .basic-info{
        margin-bottom: $margin-bottm;
        .now-data{
          font-size: 32rpx;
        }
      }

      .skill-info{
        margin-bottom: $margin-bottm;
      }
    }
  }
}
</style>