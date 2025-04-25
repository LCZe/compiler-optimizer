<template>
  <aside class="side-menu">
    <div class="menu-header">
      <h3>功能导航</h3>
    </div>
    <ul class="menu-list">
      <li 
        v-for="(item, index) in menuItems" 
        :key="index"
        :class="{ 'active': activeItem === item.name }"
        @click="selectMenuItem(item.name)"
      >
        <component :is="item.icon" class="menu-icon" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { 
  Code, Cpu, LayoutGrid, BarChart3, Users, 
  History, UserCircle, Network, FileText 
} from 'lucide-vue-next';

const props = defineProps({
  activeItem: {
    type: String,
    default: '智能编译选项优化'
  }
});

const emit = defineEmits(['select-menu']);

const menuItems = [
  { name: '智能编译选项优化', icon: Code },
  { name: 'DCU平台建模调优', icon: Cpu },
  { name: 'DCU结构', icon: LayoutGrid },
  { name: '大规模分析', icon: BarChart3 },
  { name: '用户管理', icon: Users },
  { name: 'DCU分析记录', icon: History },
  { name: '账号记录', icon: UserCircle },
  { name: '网络记录', icon: Network },
  { name: '文件记录', icon: FileText }
];

const selectMenuItem = (item) => {
  emit('select-menu', item);
};
</script>

<style scoped>
.side-menu {
  width: 240px;
  background-color: white;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.menu-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.menu-header h3 {
  margin: 0;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.menu-list {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
}

.menu-list li {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #4b5563;
  transition: all 0.2s ease;
  margin: 0.25rem 0.75rem;
  border-radius: 6px;
}

.menu-list li:hover {
  background-color: #f3f4f6;
  color: #1d4ed8;
}

.menu-list li.active {
  background-color: #e0e7ff;
  color: #1d4ed8;
  font-weight: 500;
}

.menu-icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
}
</style>