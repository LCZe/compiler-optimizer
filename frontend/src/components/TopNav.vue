<template>
  <header class="top-nav">
    <div class="logo-area">
      <div class="logo-placeholder">
        <Cpu class="logo-icon" />
      </div>
      <span class="title">超算平台适配调试系统</span>
    </div>

    <nav class="nav-menu">
      <ul>
        <li><a href="#" class="nav-link active"><Home class="nav-icon" /> 主页</a></li>
        <li><a href="#" class="nav-link"><BookOpen class="nav-icon" /> 使用说明</a></li>
        <li><a href="#" class="nav-link"><Mail class="nav-icon" /> 联系我们</a></li>
        <li class="user-profile">
          <a href="#" class="nav-link">
            <div class="avatar">
              <User class="avatar-icon" />
            </div>
            <span>管理员</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { Cpu, Home, BookOpen, Mail, User } from 'lucide-vue-next';
</script>

<style scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #1a56db, #3182ce);
  padding: 0.75rem 1.5rem;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo-placeholder {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.title {
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.5px;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  margin-left: 1.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.nav-link:hover, .nav-link.active {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.user-profile {
  margin-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 1rem;
}

.avatar {
  width: 28px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.avatar-icon {
  width: 16px;
  height: 16px;
  color: white;
}
</style>