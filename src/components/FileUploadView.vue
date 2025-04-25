<template>
  <div 
    class="upload-zone" 
    @click="openFileDialog"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ 'is-dragover': dragover }"
  >
    <div class="upload-content">
      <div v-if="fileName" class="file-info">
        <div class="file-icon">
          <FileText class="icon" />
        </div>
        <div class="file-details">
          <p class="file-name">{{ fileName }}</p>
          <p class="file-size">{{ fileSize }}</p>
        </div>
      </div>
      <div v-else class="upload-prompt">
        <Upload class="upload-icon" />
        <p class="upload-text">拖拽文件到此处或点击选择文件</p>
        <p class="upload-hint">支持 .c, .cpp 等源代码文件</p>
      </div>
    </div>

    <input type="file" ref="fileInput" class="hidden-input" @change="onFileChange">
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { Upload, FileText } from 'lucide-vue-next';

const emit = defineEmits(['fileSelected']);
const dragover = ref(false);
const fileInput = ref(null);
let selectedFile = null;

const fileName = ref('');
const fileSize = ref('');

function openFileDialog() {
  fileInput.value.click();
}

function handleDragOver() {
  dragover.value = true;
}

function handleDragLeave() {
  dragover.value = false;
}

function handleDrop(e) {
  dragover.value = false;
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function onFileChange(e) {
  const files = e.target.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFile(file) {
  selectedFile = file;
  fileName.value = file.name;
  fileSize.value = (file.size / 1024).toFixed(2) + ' KB';

  emit('fileSelected', file); // 通知父组件文件已选择
}
</script>

<style scoped>
.upload-zone {
  border: 2px dashed #cbd5e1;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.upload-zone:hover {
  border-color: #93c5fd;
  background-color: #f0f9ff;
}

.upload-zone.is-dragover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.875rem;
  color: #6b7280;
}

.file-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.file-icon {
  width: 40px;
  height: 40px;
  background-color: #eff6ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.file-icon .icon {
  width: 24px;
  height: 24px;
  color: #3b82f6;
}

.file-details {
  text-align: left;
  flex: 1;
}

.file-name {
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.file-size {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.hidden-input {
  display: none;
}
</style>