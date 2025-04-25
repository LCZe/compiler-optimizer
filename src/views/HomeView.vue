<template>
  <div class="home-view">
    <div class="container">
      <!-- 标题区域 -->
      <div class="header">
        <h1>国产超算编译器选项自动选择调优工具</h1>
        <p class="subtitle">优化编译选项，提升程序性能</p>
      </div>
      
      
      
      <div class="sections">
        <!-- 上传区域 -->
        <div class="section upload-section">
          <div class="section-header">
            <div class="section-title">
              <Upload class="section-icon" />
              <h3>源代码上传</h3>
            </div>
          </div>
          <div class="section-content">
            <FileUploadView @fileSelected="onFileSelected" />
          </div>
        </div>

        <!-- 模块分隔线 -->
        <div class="divider"></div>

        <!-- 调优参数设置 -->
        <div class="section tuning-section">
          <!-- 标题栏 - 三段式布局 -->
          <div class="section-header">
            <div class="header-container">
              <!-- 左侧：标题 -->
              <div class="section-title">
                <Sliders class="section-icon" />
                <h3>调优参数设置</h3>
              </div>
              
              <!-- 中间：预设按钮 -->
              <div class="preset-buttons">
                <button 
                  @click="applyPreset('balanced')" 
                  class="preset-button"
                  :class="{ 'preset-active': activePreset === 'balanced' }"
                >
                  <Scale class="preset-icon" />
                  平衡
                </button>
                <button 
                  @click="applyPreset('performance')" 
                  class="preset-button"
                  :class="{ 'preset-active': activePreset === 'performance' }"
                >
                  <Zap class="preset-icon" />
                  性能优先
                </button>
                <button 
                  @click="applyPreset('size')" 
                  class="preset-button"
                  :class="{ 'preset-active': activePreset === 'size' }"
                >
                  <FileDown class="preset-icon" />
                  大小优先
                </button>
              </div>
              
              <!-- 右侧：专家模式开关 -->
              <div class="expert-mode">
                <span>专家模式</span>
                <div class="switch">
                  <input 
                    type="checkbox" 
                    id="advanced-mode" 
                    v-model="advancedMode"
                  />
                  <label for="advanced-mode" class="switch-label"></label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section-content">
            <!-- 优化目标 -->
            <div class="option-group">
              <div class="option-label">
                <Target class="option-icon" />
                <label>优化目标</label>
              </div>
              <div class="optimization-goals">
                <div 
                  class="goal-option"
                  :class="{ 'selected': optimizationGoal === 'size' }"
                  @click="optimizationGoal = 'size'"
                >
                  <div class="goal-icon-container">
                    <FileCode class="goal-icon" />
                  </div>
                  <div class="goal-title">代码大小</div>
                  <div class="goal-description">优化编译后的代码体积</div>
                  <div class="goal-radio">
                    <div class="radio-circle" :class="{ 'checked': optimizationGoal === 'size' }"></div>
                  </div>
                </div>
                
                <div 
                  class="goal-option"
                  :class="{ 'selected': optimizationGoal === 'runtime' }"
                  @click="optimizationGoal = 'runtime'"
                >
                  <div class="goal-icon-container">
                    <Timer class="goal-icon" />
                  </div>
                  <div class="goal-title">运行时间</div>
                  <div class="goal-description">优化程序执行速度</div>
                  <div class="goal-radio">
                    <div class="radio-circle" :class="{ 'checked': optimizationGoal === 'runtime' }"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 优化程度 -->
            <div class="option-group">
              <div class="option-label">
                <Gauge class="option-icon" />
                <label>优化程度</label>
              </div>
              <div class="optimization-level">
                <div 
                  v-for="level in optimizationLevels" 
                  :key="level.value"
                  class="level-option"
                  :class="{ 'active': optimizationLevel === level.value }"
                  @click="optimizationLevel = level.value"
                >
                  <div class="level-icon-container" :class="level.iconClass">
                    <component :is="level.icon" class="level-icon" />
                  </div>
                  <span>{{ level.label }}</span>
                </div>
              </div>
              <div class="level-description">
                {{ getLevelDescription() }}
              </div>
            </div>

            <!-- 专家模式选项 -->
            <div v-if="advancedMode" class="advanced-options">
              <!-- 迭代次数 -->
              <div class="advanced-option">
                <div class="option-header">
                  <div class="option-label">
                    <Repeat class="option-icon" />
                    <label for="iterations">迭代次数</label>
                  </div>
                  <span class="value-display">{{ nIterations }}</span>
                </div>
                <input 
                  type="range" 
                  id="iterations" 
                  v-model.number="nIterations" 
                  min="10" 
                  max="200" 
                  step="10"
                  class="slider"
                />
                <div class="slider-labels">
                  <span>10</span>
                  <span>100</span>
                  <span>200</span>
                </div>
                <p class="info-text">
                  <Info class="info-icon" />
                  更高的迭代次数可能提高调优质量，但会增加处理时间
                </p>
              </div>
              
              <!-- 下界阈值 -->
              <div class="advanced-option">
                <div class="option-header">
                  <div class="option-label">
                    <ArrowDownCircle class="option-icon" />
                    <label for="lower-bound">下界阈值</label>
                  </div>
                  <span class="value-display">{{ lowerBound }}</span>
                </div>
                <input 
                  type="range" 
                  id="lower-bound" 
                  v-model.number="lowerBound" 
                  min="5" 
                  max="50" 
                  step="5"
                  class="slider"
                />
                <div class="slider-labels">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                </div>
                <p class="info-text">
                  <Info class="info-icon" />
                  控制搜索空间的下界约束，较低的值会扩大搜索范围
                </p>
              </div>
            </div>

            <div class="action-buttons">
              <button 
                @click="startTune" 
                :disabled="isProcessing || !selectedFile"
                class="tune-button"
                :class="{ 'processing': isProcessing }"
              >
                <span v-if="isProcessing" class="button-content">
                  <Loader2 class="loader-icon spin" />
                  调优中...
                </span>
                <span v-else class="button-content">
                  <Play class="button-icon" />
                  开始调优
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 模块分隔线 -->
        <div class="divider"></div>
        
        <!-- 进度条 -->
        <div v-if="isProcessing" class="progress-section">
          <div class="progress-header">
            <span class="progress-label">调优进度</span>
            <span class="progress-value">{{ tuningProgress }}%</span>
          </div>
          <div class="progress-bar-container">
            <div 
              class="progress-bar" 
              :style="{ width: tuningProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 结果区域 -->
        <div class="section results-section">
          <div class="section-header">
            <div class="section-title">
              <Code class="section-icon" />
              <h3>搜索结果</h3>
            </div>
            <button 
              v-if="tuneResult"
              @click="exportResults" 
              class="export-button"
            >
              <FileDown class="button-icon" />
              <span>导出结果</span>
            </button>
          </div>
          
          <div class="section-content">
            <div class="result-display">
              <p>{{ tuneResult || "调优结果将在此显示" }}</p>
            </div>

            <!-- 示例模块
            <div class="example-section">
              <h4 class="subsection-title">示例程序</h4>
              <pre class="code-block">
                polybench/linear-algebra/kernels/atax
              </pre>

              <h4 class="subsection-title">示例结果</h4>
              <div class="example-result">
                <p class="result-item">加速比: <span class="result-value">1.4007724548949265</span></p>
                <p class="result-item">
                  优化序列: <span class="result-value">['-strip-dead-prototypes', '-functionattrs', '-mem2reg', '-strip-nondebug', '-loweratomic', ... ]</span>
                </p>
              </div>
            </div> -->
            
            <!-- 结果可视化 -->
            <div v-if="tuneResult" class="visualization-section">
              <h4 class="subsection-title">
                <BarChart class="subsection-icon" />
                性能可视化
              </h4>
              <div class="visualization-placeholder">
                <p>此处将显示性能对比图表</p>
              </div>
            </div>
            
            <!-- 历史记录部分 -->
            <div class="history-section">
              <div class="history-header">
                <div class="section-title">
                  <History class="section-icon" />
                  <h4>历史调优记录</h4>
                </div>
                <button class="export-button">
                  <Download class="button-icon" />
                  <span>导出所有记录</span>
                </button>
              </div>
              
              <div v-if="tuningHistory.length > 0" class="history-table-container">
                <table class="history-table">
                  <thead>
                    <tr>
                      <th>时间</th>
                      <th>文件</th>
                      <th>优化目标</th>
                      <th>优化程度</th>
                      <th>评分</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="record in tuningHistory" :key="record.id">
                      <td>{{ record.timestamp }}</td>
                      <td class="truncate">{{ record.file }}</td>
                      <td>{{ record.goal }}</td>
                      <td>{{ record.level }}</td>
                      <td class="mono">{{ record.score }}</td>
                      <td>
                        <div class="action-icons">
                          <button class="action-icon" title="查看详情">
                            <Info class="icon" />
                          </button>
                          <button class="action-icon" title="导出结果">
                            <Save class="icon" />
                          </button>
                          <button class="action-icon delete" title="删除记录">
                            <Trash2 class="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="empty-history">
                <History class="empty-icon" />
                <p class="empty-text">暂无历史记录</p>
                <p class="empty-subtext">完成调优后，记录将显示在此处</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import FileUploadView from '../components/FileUploadView.vue';
import { 
  Upload, Code, Cpu, Timer, FileCode, Settings, History, 
  BarChart, FileDown, Info, AlertCircle, BookOpen, Save,
  Target, Gauge, Settings2, ChevronDown, Play, Loader2,
  Zap, Minimize2, Maximize2, Sliders, Repeat, ArrowDownCircle,
  Trash2, Download, Scale
} from 'lucide-vue-next';

// 文件上传相关
const selectedFile = ref(null);

// 调优参数
const optimizationGoal = ref('size');  // 默认优化目标：代码大小
const optimizationLevel = ref('medium');  // 默认优化程度：中
const nIterations = ref(50);
const lowerBound = ref(20);
const advancedMode = ref(false);
const showAdditionalParams = ref(false);
const activePreset = ref('balanced');
const parallelism = ref(4);

// 附加参数
const additionalParams = reactive({
  enableVectorization: false,
  aggressiveInlining: false,
  useNativeArch: true,
  fastMath: false
});

// 高级选项
const advancedOptions = reactive({
  vectorize: false,
  unroll: false,
  inline: false,
  simd: false
});

// 优化程度选项
const optimizationLevels = [
  { 
    value: 'low', 
    label: '小', 
    icon: Minimize2,
    iconClass: 'icon-low',
    description: '轻度优化，编译速度快，调试信息保留较多'
  },
  { 
    value: 'medium', 
    label: '中', 
    icon: Gauge,
    iconClass: 'icon-medium',
    description: '平衡的优化级别，适合大多数场景'
  },
  { 
    value: 'high', 
    label: '大', 
    icon: Maximize2,
    iconClass: 'icon-high',
    description: '激进优化，可能会增加编译时间，但运行性能最佳'
  }
];

// 获取优化程度描述
const getLevelDescription = () => {
  const level = optimizationLevels.find(l => l.value === optimizationLevel.value);
  return level ? level.description : '';
};

// 应用预设
const applyPreset = (preset) => {
  activePreset.value = preset;
  
  if (preset === 'balanced') {
    optimizationGoal.value = 'size';
    optimizationLevel.value = 'medium';
    additionalParams.enableVectorization = false;
    additionalParams.aggressiveInlining = false;
    additionalParams.useNativeArch = true;
    additionalParams.fastMath = false;
  } else if (preset === 'performance') {
    optimizationGoal.value = 'runtime';
    optimizationLevel.value = 'high';
    additionalParams.enableVectorization = true;
    additionalParams.aggressiveInlining = true;
    additionalParams.useNativeArch = true;
    additionalParams.fastMath = true;
  } else if (preset === 'size') {
    optimizationGoal.value = 'size';
    optimizationLevel.value = 'high';
    additionalParams.enableVectorization = false;
    additionalParams.aggressiveInlining = false;
    additionalParams.useNativeArch = false;
    additionalParams.fastMath = false;
  }
};

// 调优状态
const tuneResult = ref('');
const isProcessing = ref(false);
const tuningProgress = ref(0);

// 历史记录
const tuningHistory = reactive([
  {
    id: 1,
    timestamp: "2023-04-15 14:32",
    file: "matrix_multiply.c",
    goal: "运行时间",
    level: "大",
    result: "[-O3, -ffast-math, -march=native]",
    score: "1.65"
  },
  {
    id: 2,
    timestamp: "2023-04-14 10:15",
    file: "fft_compute.c",
    goal: "代码大小",
    level: "中",
    result: "[-O2, -fomit-frame-pointer]",
    score: "0.78"
  }
]);

// 文件上传处理
const onFileSelected = (file) => {
  selectedFile.value = file;
};

// 模拟进度
const simulateProgress = () => {
  tuningProgress.value = 0;
  const interval = setInterval(() => {
    tuningProgress.value += 5;
    if (tuningProgress.value >= 100) {
      clearInterval(interval);
    }
  }, 300);
  return interval;
};

// 开始调优
const startTune = async () => {
  if (!selectedFile.value) {
    alert('请先上传文件！');
    return;
  }

  isProcessing.value = true;
  tuneResult.value = '';
  
  // 开始模拟进度
  const progressInterval = simulateProgress();

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('n_iterations', nIterations.value.toString());
  formData.append('lower_bound', lowerBound.value.toString());
  formData.append('optimizationGoal', optimizationGoal.value);
  formData.append('optimizationLevel', optimizationLevel.value);
  
  // 添加附加参数
  Object.keys(additionalParams).forEach(key => {
    formData.append(key, additionalParams[key].toString());
  });
  
  // 添加高级选项
  if (advancedMode.value) {
    Object.keys(advancedOptions).forEach(key => {
      formData.append(key, advancedOptions[key].toString());
    });
    formData.append('parallelism', parallelism.value.toString());
  }

  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 根据不同的优化目标和程度返回不同的模拟结果
    let best_x, best_score;
    
    if (optimizationGoal.value === "size") {
      if (optimizationLevel.value === "high") {
        best_x = "[-O3, -fomit-frame-pointer, -funroll-loops, -ffunction-sections, -fdata-sections]";
        best_score = (0.80 + Math.random() * 0.1).toFixed(2);
      } else if (optimizationLevel.value === "medium") {
        best_x = "[-O2, -fomit-frame-pointer, -ffunction-sections]";
        best_score = (0.65 + Math.random() * 0.15).toFixed(2);
      } else {
        best_x = "[-O1, -ffunction-sections]";
        best_score = (0.50 + Math.random() * 0.15).toFixed(2);
      }
    } else {
      if (optimizationLevel.value === "high") {
        best_x = "[-O3, -ftree-vectorize, -march=native, -ffast-math, -funroll-loops]";
        best_score = (1.35 + Math.random() * 0.2).toFixed(2);
      } else if (optimizationLevel.value === "medium") {
        best_x = "[-O2, -ftree-vectorize, -march=native, -funroll-loops]";
        best_score = (1.15 + Math.random() * 0.15).toFixed(2);
      } else {
        best_x = "[-O2, -march=native]";
        best_score = (1.00 + Math.random() * 0.1).toFixed(2);
      }
    }
    
    // 应用附加参数的影响
    if (additionalParams.enableVectorization) {
      best_x = best_x.replace(']', ', -ftree-vectorize]');
      best_score = (parseFloat(best_score) * 1.05).toFixed(2);
    }
    
    if (additionalParams.fastMath) {
      best_x = best_x.replace(']', ', -ffast-math]');
      best_score = (parseFloat(best_score) * 1.08).toFixed(2);
    }
    
    // 应用高级选项的影响
    if (advancedMode.value) {
      if (advancedOptions.vectorize) {
        best_x = best_x.replace(']', ', -ftree-vectorize]');
        best_score = (parseFloat(best_score) * 1.03).toFixed(2);
      }
      
      if (advancedOptions.unroll) {
        best_x = best_x.replace(']', ', -funroll-loops]');
        best_score = (parseFloat(best_score) * 1.02).toFixed(2);
      }
      
      if (advancedOptions.inline) {
        best_x = best_x.replace(']', ', -finline-functions]');
        best_score = (parseFloat(best_score) * 1.04).toFixed(2);
      }
      
      if (advancedOptions.simd) {
        best_x = best_x.replace(']', ', -msse4.2]');
        best_score = (parseFloat(best_score) * 1.06).toFixed(2);
      }
    }
    
    tuningProgress.value = 100;
    tuneResult.value = "最优值: " + best_x + ", 最优评分: " + best_score;
    
    // 添加到历史记录
    tuningHistory.unshift({
      id: tuningHistory.length + 1,
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      file: selectedFile.value.name,
      goal: optimizationGoal.value === "size" ? "代码大小" : "运行时间",
      level: optimizationLevel.value === "high" ? "大" : 
             optimizationLevel.value === "medium" ? "中" : "小",
      result: best_x,
      score: best_score
    });
  } catch (error) {
    tuneResult.value = '网络请求错误或后端服务不可用。';
  } finally {
    clearInterval(progressInterval);
    isProcessing.value = false;
  }
};

// 导出结果
const exportResults = () => {
  if (!tuneResult.value) return;
  
  const dataStr = "调优结果导出\n------------------------\n" +
    "文件名: " + (selectedFile.value?.name || "") + "\n" +
    "优化目标: " + (optimizationGoal.value === "size" ? "代码大小" : "运行时间") + "\n" +
    "优化程度: " + (optimizationLevel.value === "high" ? "大" : 
                  optimizationLevel.value === "medium" ? "中" : "小") + "\n" +
    "迭代次数: " + nIterations.value + "\n" +
    "------------------------\n" +
    tuneResult.value + "\n" +
    "------------------------\n" +
    "导出时间: " + new Date().toLocaleString();
  
  const blob = new Blob([dataStr], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "tuning_result_" + new Date().getTime() + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
/* 基础样式 */
.home-view {
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

/* 标题区域 */
.header {
  background: linear-gradient(to right, #1e40af, #1e3a8a);
  color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

@media (min-width: 768px) {
  .header h1 {
    font-size: 1.875rem;
  }
}

.subtitle {
  color: #dbeafe;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* 工作流程 */
.workflow {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.workflow-steps {
  display: inline-flex;
  align-items: center;
  background-color: white;
  border-radius: 9999px;
  padding: 0.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.workflow-step {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
}

.workflow-step.active {
  background-color: #dbeafe;
  color: #1e40af;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #1e40af;
  color: white;
  border-radius: 9999px;
  margin-right: 0.5rem;
  font-size: 0.75rem;
}

.workflow-step:not(.active) .step-number {
  background-color: #e5e7eb;
  color: #4b5563;
}

/* 主要内容区域 */
.sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 通用部分样式 */
.section {
  border-radius: 0.75rem;
  border: 1px solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.upload-section {
  background-color: #eff6ff;
  border-color: #dbeafe;
}

.tuning-section {
  background-color: #ecfdf5;
  border-color: #d1fae5;
}

.results-section {
  background-color: white;
  border-color: #e5e7eb;
}

.section-header {
  border-bottom: 1px solid;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
}

.upload-section .section-header {
  background-color: #dbeafe;
  border-color: #dbeafe;
}

.tuning-section .section-header {
  background-color: #d1fae5;
  border-color: #d1fae5;
}

.results-section .section-header {
  background-color: #f9fafb;
  border-color: #f3f4f6;
}

.section-title {
  display: flex;
  align-items: center;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.upload-section .section-icon {
  color: #1e40af;
}

.tuning-section .section-icon {
  color: #047857;
}

.results-section .section-icon {
  color: #1e40af;
}

.section-title h3 {
  font-size: 1rem;
  font-weight: 500;
}

.upload-section h3 {
  color: #1e3a8a;
}

.tuning-section h3 {
  color: #065f46;
}

.results-section h3 {
  color: #1f2937;
}

.section-content {
  padding: 1.5rem;
}

/* 分隔线 */
.divider {
  border-top: 2px dashed #e5e7eb;
  margin: 1.5rem 0;
}

/* 标题栏三段式布局 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* 预设按钮 */
.preset-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.preset-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  color: #4b5563;
  background-color: white;
  border: 1px solid #e5e7eb;
}

.preset-button:hover {
  background-color: #f3f4f6;
}

.preset-active {
  font-weight: 600;
  color: #1f2937;
}

.preset-active.bg-green-100 {
  background-color: #d1fae5;
  border-color: #a7f3d0;
}

.preset-active.bg-blue-100 {
  background-color: #dbeafe;
  border-color: #bfdbfe;
}

.preset-active.bg-purple-100 {
  background-color: #ede9fe;
  border-color: #ddd6fe;
}

.preset-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.375rem;
}

/* 专家模式开关 */
.expert-mode {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expert-mode span {
  font-size: 0.75rem;
  font-weight: 500;
  color: #065f46;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 9999px;
}

.switch-label:before {
  position: absolute;
  content: "";
  height: 1rem;
  width: 1rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

input:checked + .switch-label {
  background-color: #10b981;
}

input:checked + .switch-label:before {
  transform: translateX(1.25rem);
}

/* 选项组 */
.option-group {
  margin-bottom: 1.5rem;
}

.option-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.option-icon {
  width: 1rem;
  height: 1rem;
  color: #059669;
  margin-right: 0.5rem;
}

.option-label label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* 优化目标选项 */
.optimization-goals {
  display: flex;
  gap: 1rem;
}

.goal-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: white;
  text-align: center;
  position: relative;
  flex: 1;
}

.goal-option:hover {
  border-color: #93c5fd;
  background-color: #f8fafc;
}

.goal-option.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.15);
}

.goal-icon-container {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background-color: #f0f9ff;
}

.goal-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
}

.goal-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.goal-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.goal-radio {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
}

.radio-circle {
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.radio-circle.checked {
  border-color: #3b82f6;
  background-color: #3b82f6;
  box-shadow: inset 0 0 0 3px white;
}

/* 优化程度选择器 */
.optimization-level {
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.level-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-right: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.level-option:last-child {
  border-right: none;
}

.level-option:hover {
  background-color: #f8fafc;
}

.level-option.active {
  background-color: #eff6ff;
  box-shadow: inset 0 1px 3px rgba(59, 130, 246, 0.1);
}

.level-icon-container {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.375rem;
}

.icon-low {
  background-color: #d1fae5;
  color: #059669;
}

.icon-medium {
  background-color: #dbeafe;
  color: #3b82f6;
}

.icon-high {
  background-color: #ede9fe;
  color: #8b5cf6;
}

.level-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.level-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* 附加参数 */
.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.toggle-button {
  font-size: 0.75rem;
  color: #059669;
  display: flex;
  align-items: center;
}

.toggle-icon {
  width: 0.875rem;
  height: 0.875rem;
  margin-left: 0.125rem;
  transition: transform 0.2s;
}

.toggle-icon.rotate {
  transform: rotate(180deg);
}

.additional-params {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

@media (min-width: 768px) {
  .additional-params {
    grid-template-columns: repeat(2, 1fr);
  }
}

.param-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.param-option label {
  font-size: 0.75rem;
  color: #374151;
}

/* 自定义复选框 */
.checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.1875rem;
  outline: none;
  transition: all 0.2s ease-in-out;
}

.checkbox:checked {
  border-color: #3b82f6;
  background-color: #3b82f6;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: 0.625rem;
  background-position: center;
  background-repeat: no-repeat;
}

/* 专家模式选项 */
.advanced-options {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.3s ease-in-out;
}

.advanced-option {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.value-display {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
}

/* 自定义滑块 */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.1875rem;
  background: #e2e8f0;
  outline: none;
  margin: 0.5rem 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
}

.info-text {
  font-size: 0.75rem;
  color: #4b5563;
  margin-top: 0.25rem;
  display: flex;
  align-items: flex-start;
}

.info-icon {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
  color: #10b981;
}

/* 操作按钮 */
.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.tune-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
}

.tune-button:hover:not(:disabled) {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.tune-button:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(59, 130, 246, 0.3);
}

.tune-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  box-shadow: none;
}

.tune-button.processing {
  background: #3b82f6;
}

.button-content {
  display: flex;
  align-items: center;
}

.button-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.loader-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 进度条 */
.progress-section {
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.progress-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
}

.progress-bar-container {
  width: 100%;
  background-color: #f3f4f6;
  border-radius: 9999px;
  height: 0.625rem;
}

.progress-bar {
  background-color: #3b82f6;
  height: 0.625rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* 结果显示 */
.result-display {
  background-color: white;
  border: 1px solid #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.25rem;
}

.result-display p {
  font-size: 0.875rem;
  color: #374151;
}

/* 示例部分 */
.example-section {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.subsection-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.subsection-icon {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.375rem;
  color: #3b82f6;
}

.code-block {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.example-result {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.result-item {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-value {
  font-family: monospace;
  color: #3b82f6;
}

/* 可视化部分 */
.visualization-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.visualization-placeholder {
  height: 12rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visualization-placeholder p {
  color: #6b7280;
  font-size: 0.875rem;
}

/* 历史记录部分 */
.history-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  color: #4b5563;
  transition: all 0.2s;
  cursor: pointer;
}

.export-button:hover {
  background-color: #f3f4f6;
  color: #3b82f6;
}

.history-table-container {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: #f9fafb;
}

.history-table td {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  border-top: 1px solid #f3f4f6;
  white-space: nowrap;
}

.history-table tr:hover {
  background-color: #f9fafb;
}

.truncate {
  max-width: 7.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mono {
  font-family: monospace;
}

.action-icons {
  display: flex;
  gap: 0.5rem;
}

.action-icon {
  color: #6b7280;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-icon:hover {
  color: #3b82f6;
}

.action-icon.delete:hover {
  color: #ef4444;
}

.action-icon .icon {
  width: 0.875rem;
  height: 0.875rem;
}

.empty-history {
  text-align: center;
  padding: 2rem 0;
  color: #6b7280;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.75rem;
  opacity: 0.2;
}

.empty-text {
  font-size: 0.875rem;
}

.empty-subtext {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-0.625rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>