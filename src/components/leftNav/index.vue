<template>
  <div class="leftNav">
    <Menu ref="side_menu" theme="dark" accordion v-for="(menuItem, menuIndex) in menuList" :key="menuIndex" :active-name="$route.name">

      <!-- 展开没有子菜单 -->
      <MenuItem v-if="!menuItem.children || menuItem.children.length==0" :key="menuIndex" :name="menuItem.to" :to="menuItem.to">
        <Icon :type="menuItem.icon" />
        <span>{{ menuItem.name }}</span>
      </MenuItem>

      <!-- 展开有子菜单 -->
      <Submenu v-else :name="menuIndex">
          <template slot="title">
              <Icon :type="menuItem.icon" />
              <span>{{menuItem.name}}</span>
          </template>
          <MenuItem  v-for="(item, index) in menuItem.children" :key="index" :name="item.to" :to="item.to">{{item.name}}</MenuItem>
      </Submenu>
    </Menu>
  </div> 
            
</template>
<script>
export default {
  data() {
    return {
      // menuList: [
      //   {
      //     name: "首页",
      //     to: "home",
      //     icon: "ios-archive-outline"
      //   },
      //   {
      //     name: "关于",
      //     to: "about",
      //     icon: "ios-create-outline"
      //   },
      //   {
      //     name: "菜单分类1",
      //     icon: "md-person",
      //     children: [
      //       {
      //         name: "用户",
      //         to: "user"
      //       }
      //     ]
      //   },
      //   {
      //     name: "菜单分类2",
      //     icon: "ios-copy",
      //     children: [
      //       {
      //         name: "测试",
      //         to: "test"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  computed: {
    menuList() {
      return this.$store.state.loginInfo.roleMenu
    }
  },
  created() {
    // console.log(this.menuList)
    // 数据我先写静态的，可在初始化的时候通过请求，将数据指向menuList。
    // ajax成功回调后 this.menuList = response.data;
    // 别忘记更新菜单
    // this.$nextTick(() => {
    // 	this.$refs.side_menu.updateOpened()
    // 	this.$refs.side_menu.updateActiveName()
    // });
  }
};
</script>
<style lang="scss" scoped>
/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  border-right: none;
  color: #fff;
  background: #2d8cf0 !important;
}
</style>
