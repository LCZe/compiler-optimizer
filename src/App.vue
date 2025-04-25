<template>
  <div id="app">
    <!-- 顶部导航 -->
    <TopNav />

    <!-- 主体布局：左侧菜单 + 中间/右侧内容 -->
    <div class="main-layout">
      <SideMenu :activeItem="activeMenuItem" @select-menu="handleMenuSelect" />
      <main class="content-area">
        <HomeView v-if="activeMenuItem === '智能程序调优'" />
        <div v-else class="placeholder-content">
          <div class="flex flex-col items-center justify-center h-full text-gray-500">
            <component :is="getMenuIcon(activeMenuItem)" class="w-16 h-16 mb-4 opacity-20" />
            <h2 class="text-xl font-medium mb-2">{{ activeMenuItem }}</h2>
            <p>该功能正在开发中，敬请期待</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TopNav from './components/TopNav.vue';
import SideMenu from './components/SideMenu.vue';
import HomeView from './views/HomeView.vue';
import { 
  Code, Cpu, LayoutGrid, BarChart3, Users, 
  History, UserCircle, Network, FileText 
} from 'lucide-vue-next';

const activeMenuItem = ref('智能程序调优');

const handleMenuSelect = (item) => {
  activeMenuItem.value = item;
};

const getMenuIcon = (menuItem) => {
  const iconMap = {
    '智能程序调优': Code,
    'DCU平台建模调优': Cpu,
    'DCU结构': LayoutGrid,
    '大规模分析': BarChart3,
    '用户管理': Users,
    'DCU分析记录': History,
    '账号记录': UserCircle,
    '网络记录': Network,
    '文件记录': FileText
  };
  
  return iconMap[menuItem] || Code;
};
</script>

<style>
/* 1. 重置默认边距，让页面可100%铺开 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f5f7fa;
}

*, *::before, *::after {
  box-sizing: inherit;
}

/* 2. #app 宽高撑满视口，并采用 Flex 布局 */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 垂直方向占满视口 */
  width: 100%;   /* 横向也全宽 */
}

/* 3. main-layout 占据除顶部导航外的剩余空间，左右排布 */
.main-layout {
  display: flex;
  flex: 1;     /* 占满剩余可用空间 */
  overflow: hidden; /* 防止内容溢出 */
}

.content-area {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: #f5f7fa;
}

.placeholder-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 16px;
}
</style>