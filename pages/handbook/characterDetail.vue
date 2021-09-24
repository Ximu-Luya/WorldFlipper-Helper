<template>
  <view class="detail-content">
    <top-nav :isBack="true"></top-nav>

    <!-- 立绘背景 -->
    <view class="tachie-img" :style="`background-image:url(${commonTachie});height: calc(100vh - ${CustomBar}px)`"></view>

    <!-- 滚动信息查看 -->
    <scroll-view scroll-y class="character-detail" :style="`height: calc(100vh - ${CustomBar}px)`">
      <view class="space"></view>
      
      <view class="content">
        <view class="basic-info">
          <view class="avatar">
            <image class="avatar-img" :src="avatarImg" mode="heightFix"/>
            <image class="star" :src="`/static/image/icon/star-${starRating}.png`" mode="heightFix"/>
          </view>
          <view class="info">
            <view class="designation">{{designation}}</view>
            <view class="name">{{`${cnName}(${jpName})`}}</view>
            <view class="info-area">
              <view class="info-item">
                <text class="label">HP</text>{{HP}}
              </view>
              <view class="info-item">
                <text class="label">ATK</text>{{ATK}}
              </view>
              <view class="info-item">
                <text class="label">属性</text>

                <!-- 属性内容值 -->
                <template v-if="attribute==='fire'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>火
                </template>
                <template v-if="attribute==='nature'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>风
                </template>
                <template v-if="attribute==='thunder'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>雷
                </template>
                <template v-if="attribute==='water'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>水
                </template>
                <template v-if="attribute==='light'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>光
                </template>
                <template v-if="attribute==='dark'">
                  <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" style="height: 100%"/>暗
                </template>
              </view>
              <view class="info-item">
                <text class="label">类型</text>
                
                <!-- 类型内容值 -->
                <template v-if="type==='special'">
                  <image :src="`/static/image/icon/${type}.png`" mode="heightFix" style="height: 100%"/>特殊
                </template>
                <template v-if="type==='fighter'">
                  <image :src="`/static/image/icon/${type}.png`" mode="heightFix" style="height: 100%"/>格斗家
                </template>
                <template v-if="type==='supporter'">
                  <image :src="`/static/image/icon/${type}.png`" mode="heightFix" style="height: 100%"/>辅助
                </template>
                <template v-if="type==='shooter'">
                  <image :src="`/static/image/icon/${type}.png`" mode="heightFix" style="height: 100%"/>射手
                </template>
                <template v-if="type==='swordsman'">
                  <image :src="`/static/image/icon/${type}.png`" mode="heightFix" style="height: 100%"/>剑士
                </template>
              </view>
            </view>
          </view>
        </view>

        <view class="skill-info">

        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import Character from './character.vue'

export default {
  components: {Character},
  data(){
    return {
      CustomBar: this.CustomBar,
      // 普通立绘
      commonTachie: 'https://wf.hotimi.com/assets/upload/pic/61c95699-645d-43f5-98fd-c552fefff5d1.png',
      // 觉醒立绘
      awakeTachie: 'https://wf.hotimi.com/assets/upload/picAwake/61c95699-645d-43f5-98fd-c552fefff5d1-2.png',
      // 头像图标
      avatarImg: '/static/image/avatar.png',
      // 中文名
      cnName: '希尔媞',
      // 日文名
      jpName: 'シルティー',
      // 称号
      designation: '星の少女騎士',
      // 星级
      starRating: 5,
      // 属性
      attribute: 'nature',
      // 类型
      type: 'swordsman',
      // HP血量
      HP: 3546,
      // ATK攻击力
      ATK: 1136,
      // 主动技能
      skill: {
        description: '双空牙·エンリル：自身[神速剑技]增加2层，以疾风般的剑术对前后方敌人造成风伤害 / 赋予我方加速效果',
        data: '最大攻击段数2，最大倍率28 / 神速剑技+ 2 / 加速效果30%持续15秒',
        energy: 390
      },
      // 队长技能
      leaderSkill: '剑鬼·二刀流+：风属性角色攻击力+ 50 % / 自身[神速剑技]每有1层时，风属性角色的攻击力+ 5%[最大+ 100%]',
      // 被动能力
      abilitys: [
        '以主要角色编成：[神速剑技]1层以上时，自身直接攻击计算2次，连击伤害+ 30% / 以主要角色编成：[神速剑技]10层以上时，自身直接攻击计算2次，连击伤害+ 40% / 以主要角色编成：[神速剑技]20层以上时，自身直接攻击计算2次，连击伤害+ 100%',
        '以主要角色编成：[神速剑技]每有1层时，自身攻击力+ 5%[最大+ 100%]',
        '以主要角色编成：100COMBO时，自身[神速剑技]增加1层[最大20层] / 以主要角色编成：自身[神速剑技]每有1层时，风属性角色的攻击力+ 6%[最大+ 120%]',
        '战斗开始时，自身技能槽+ 50%',
        '[神速剑技]每有一层时，自身攻击力+ 2.5%[最大+ 50%]',
        '战斗开始时，自身[神速剑技]增加1层 / [神速剑技]每有一层时，自身直接攻击伤害+ 3%[最大+ 60%]'
      ],
      // 种族
      race: 'human',
      // 性别
      sex: 'female',
      // CV声优
      CV: '麻仓もも'
    }
  },
  props: [],
  mounted(){},
  methods: {}
}
</script>

<style lang="scss">
page {
  background-color: white;
}
.detail-content{
  position: relative;

  // 立绘背景
  .tachie-img {
    position: absolute;
    z-index: -999;
    background-repeat: no-repeat;
    // TODO 部分立绘不能居中显示
    background-position:center center;
    background-size: cover;
    width: 100vw;
  }

  .character-detail{
    position: absolute;
    z-index: -99;

    // 立绘留白
    .space{
      height: 70vh;
    }

    // 角色信息内容
    .content{
      background: rgba(255,255,255,0.95);

      // 角色基础信息
      .basic-info{
        display: flex;
        position: relative;
        padding: 20rpx 40rpx;

        // 分割线
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 40rpx; right: 40rpx;
          background: #DEDCDE;
          height: 4rpx;
        }

        // 头像
        .avatar{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .avatar-img{
            display: block;
            margin-bottom: 20rpx;
            border-radius: 20rpx;
            height: 130rpx;
          }
          .star{
            height: 30rpx;
          }
        }

        // 角色信息
        .info{
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          justify-content: start;
          margin-left: 30rpx;

          // 别称
          .designation{
            font-size: 24rpx;
          }

          // 角色名字
          .name{
            font-size: 36rpx;
          }

          // 基础属性
          .info-area{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20rpx;

            >.info-item{
              display: flex;
              align-items: center;
              flex-shrink: 0;
              width: 50%;
              margin-bottom: 20rpx;
              line-height: 35rpx;
              max-height: 35rpx;

              >.label{
                display: inline-block;
                position: relative;
                overflow: hidden;
                width: 40%;
                z-index: 0;
                padding-left: 10rpx;
                margin-right: 20rpx;
                
                &::before{ 
                  background-color: #DCDCDC;
                  content: '';
                  position: absolute;
                  z-index: -1;
                  top: 0; bottom: 0;
                  right: 0; left: 0;
                  transform: scaleY(1.5) perspective(8rpx) rotateX(5deg);
                  transform-origin: bottom left;
                }
              }
            }
          }
        }
      }

      // 技能信息
      .skill-info{
        height: 800rpx;
      }
    }
  }
}

</style>