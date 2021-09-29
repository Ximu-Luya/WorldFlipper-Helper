<template>
  <view class="detail-content">
    <top-nav :isBack="true"></top-nav>

    <!-- 立绘背景 -->
    <view class="tachie-img" :style="{backgroundImage: `url(${commonTachie})`, height: `calc(100vh - ${CustomBar}px)`}"></view>

    <!-- 滚动的详细信息查看 -->
    <scroll-view scroll-y class="character-detail" :style="{height: `calc(100vh - ${CustomBar}px)`}">
      <view class="space"></view>
      
      <view class="content page-safe-bottom">
        <!-- 角色基础信息 -->
        <view class="basic-info">
          <view class="avatar">
            <image class="avatar-img" :src="avatarImg"/>
            <image class="star" :src="`/static/image/icon/star-${starRating}.png`"/>
          </view>
          <view class="info">
            <view class="designation">{{designation}}</view>
            <view class="name">{{`${cnName}(${jpName})`}}</view>
            <view class="info-area">
              <!-- HP血量 -->
              <view class="info-item">
                <text class="info-label">HP</text>{{HP}}
              </view>
              <!-- ATK攻击力 -->
              <view class="info-item">
                <text class="info-label">ATK</text>{{ATK}}
              </view>
              <!-- 属性 -->
              <view class="info-item">
                <text class="info-label">属性</text>

                <!-- 属性内容值 -->
                <image :src="`/static/image/icon/${attribute}.png`" mode="heightFix" class="icon"/>{{attributeName}}
              </view>
              <!-- 类型 -->
              <view class="info-item">
                <text class="info-label">类型</text>
                
                <!-- 类型内容值 -->
                <image :src="`/static/image/icon/${type}.png`" mode="heightFix" class="icon"/>{{typeName}}
              </view>
            </view>
          </view>
        </view>

        <!-- 角色技能信息 -->
        <view class="skill-info">
          <!-- 主动技能 -->
          <view class="info-box skill">
            <view class="label">技能</view>
            <view class="skill-content">
              <view class="content-item title">{{skill.title}}</view>
              <view class="content-item description"> {{skill.description}} </view>
              <view class="content-item data">技能数据：{{skill.data}} </view>
              <view class="content-item energy">能量：{{skill.energy}}</view>
            </view>
          </view>
          <!-- 队长技能 -->
          <view class="info-box leader-skill">
            <view class="label">队长技</view>
            <view class="skill-content">
              <view class="content-item title">{{leaderSkill.title}}</view>
              <view class="content-item description"> {{leaderSkill.description}} </view>
            </view>
          </view>
          <!-- 被动能力 -->
          <view class="info-box abilitys">
            <view class="label">被动能力</view>
            <view class="skill-content">
              <view class="content-item" v-for="(item, index) in abilitys" :key="index">
                <text class="ability-index"> {{index + 1}} </text>
                <view class="description"> {{item}} </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 角色其他信息 -->
        <view class="other-info">
          <!-- 种族 -->
          <view class="info-box skill">
            <view class="label">种族</view>{{race}}
          </view>
          <!-- 性别 -->
          <view class="info-box skill">
            <view class="label">性别</view>{{sex}}
          </view>
          <!-- 声优 -->
          <view class="info-box skill">
            <view class="label">CV</view>{{CV}}
          </view>
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
      attribute: 'wind',
      // 属性名称
      attributeName: '风',
      // 类型
      type: 'swordsman',
      // 类型名称
      typeName: '剑士',
      // HP血量
      HP: 3546,
      // ATK攻击力
      ATK: 1136,
      // 主动技能
      skill: {
        title: '双空牙·エンリル+',
        description: '自身[神速剑技]增加2层，以疾风般的剑术对前后方敌人造成风伤害 / 赋予我方加速效果',
        data: '最大攻击段数2，最大倍率28 / 神速剑技+ 2 / 加速效果30%持续15秒',
        energy: 390
      },
      // 队长技能
      leaderSkill: {
        title: '剑鬼·二刀流+',
        description: '风属性角色攻击力+ 50 %\n自身[神速剑技]每有1层时，风属性角色的攻击力+ 5%[最大+ 100%]'
      },
      // 被动能力
      abilitys: [
        '以主要角色编成：[神速剑技]1层以上时，自身直接攻击计算2次，连击伤害+ 30%\n以主要角色编成：[神速剑技]10层以上时，自身直接攻击计算2次，连击伤害+ 40%\n以主要角色编成：[神速剑技]20层以上时，自身直接攻击计算2次，连击伤害+ 100%',
        '以主要角色编成：[神速剑技]每有1层时，自身攻击力+ 5%[最大+ 100%]',
        '以主要角色编成：100COMBO时，自身[神速剑技]增加1层[最大20层]\n以主要角色编成：自身[神速剑技]每有1层时，风属性角色的攻击力+ 6%[最大+ 120%]',
        '战斗开始时，自身技能槽+ 50%',
        '[神速剑技]每有一层时，自身攻击力+ 2.5%[最大+ 50%]',
        '战斗开始时，自身[神速剑技]增加1层\n[神速剑技]每有一层时，自身直接攻击伤害+ 3%[最大+ 60%]'
      ],
      // 种族
      race: '人',
      // 性别
      sex: '女',
      // CV声优
      CV: '麻仓もも'
    }
  },
  computed:{
    
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
  >.tachie-img {
    position: absolute;
    z-index: -999;
    background-repeat: no-repeat;
    // TODO 部分立绘分布问题，不能居中显示
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
      position: relative;
      z-index: -90;
      box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);

      &::before{
        content: '';
        position: absolute;
        background: rgba(255,255,255,0.95);
        transform: translateX(-50%);
        top: -40rpx; left: 50%;
        height: 40rpx;
        width: 150rpx;
        border-radius: 10rpx 10rpx 0 0;
        z-index: -80;
        box-shadow: 0 -5rpx 20rpx rgba(0, 0, 0, 0.1);
        
      }

      &::after{
        content: '';
        position: absolute;
        top: -24rpx; left: 50%;
        height: 26rpx;
        width: 26rpx;

        border-width: 0 4rpx 4rpx 0;
        border-color: #999999;
        border-style: solid;
        transform-origin: center;
        transform: translateX(-50%) rotate(225deg);
        transition: transform .3s;
      }
      &.down::after{
        transform: translateX(-50%) rotate(45deg);
        top: -40rpx; left: 50%;
        transition: transform .3s;
      }

      // 带有黑色label的info-box
      .info-box{
        display: flex;
        margin: 16rpx 0;

        // 黑色内凹箭头label
        .label{
          flex: 0 0 auto;
          height: 36rpx;
          line-height: 36rpx;
          width: 110rpx;
          margin-right: 30rpx;
          margin-left: 10rpx;
          z-index: 0;
          position: relative;
          color: #F7F7F7;
          background-color: #323232;
          text-align: center;
          font-size: 24rpx;

          &::before{
            content: '';
            position: absolute;
            z-index: -1;
            background-color: #FF9800;
            top: 0; bottom: 0;
            left: -10rpx;
            width: 10rpx;
          }

          &::after{
            content: '';
            position: absolute;
            overflow: hidden;
            z-index: -2;
            top: 0; bottom: 0;
            right: -10rpx;
            border: 18rpx solid #323232;
            border-width: 18rpx 18rpx 18rpx 0;
            border-right: 10rpx solid transparent;
          }
        }
      }

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
          left: 30rpx; right: 30rpx;
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
            width: 130rpx;
          }
          .star{
            height: 30rpx;
            width: 160rpx;
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

              >.info-label{
                display: inline-block;
                position: relative;
                overflow: hidden;
                width: 40%;
                font-size: 24rpx;
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

              .icon{
                height: 100%;
                width: auto;
              }
            }
          }
        }
      }

      // 技能信息
      .skill-info{
        padding: 0 50rpx;

        // 技能内容
        .skill-content{
          .content-item{
            margin-bottom: 10rpx;
            display: flex;
          }
          // 技能名称
          .title{
            font-size: 32rpx;
            margin-bottom: 10rpx;
          }
          // 技能描述
          .description{
            line-height: 36rpx;
            white-space: pre-line;
          }
          
          // 被动能力序号
          .ability-index{
            width: 30rpx;
            line-height: 30rpx;
            text-align: center;
            vertical-align: middle;
            margin-right: 5rpx;
            color: #fff;
            font-size: 20rpx;
            flex: 0 0 auto;
            z-index: 0;
            position: relative;

            &::before{
              content: '';
              position: absolute;
              z-index: -1;
              left: 0; top: 0;
              width: 30rpx;
              height: 30rpx;
              background-color: #00C9B6;
              border-radius: 50%;
            }

            &::after{
              content: '';
              position: absolute;
              z-index: -1;
              left: 50%; top: 10rpx;
              bottom: 0;
              width: 6rpx;
              margin-left: -4rpx;
              background-color: #00C9B6;
            }
          }
        }
      }

      // 其他信息
      .other-info{
        padding: 0 50rpx;
      }
    }
  }
}

</style>