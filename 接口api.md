# 国产超算编译器选项自动调优工具 - 后端 API 文档

## 项目简介

本项目是一个支持 GCC 编译器选项自动调优的可视化工具，结合前端 Vue 和后端 Java Spring Boot 实现。本文档详细说明了后端接口，便于联调测试以及集成 Swagger / Apifox 等文档系统。

## 基础信息

- 接口基础路径：`http://localhost:8080/api`
- 接口版本：v1.0
- 数据格式：统一使用 `application/json` 或 `multipart/form-data`


## 接口说明

### 1. 上传源代码文件

- 接口地址：`/api/upload`
- 请求方式：POST
- 请求类型：`multipart/form-data`
- 接口功能：上传 `.c/.cpp` 源文件用于后续自动调优分析处理


#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
| :-- | :-- | :-- | :-- |
| file | File | 是 | 源代码文件，仅支持 `.c/.cpp` 格式 |

#### 响应示例

```json
{
  "filename": "matrix_mul.c",
  "message": "文件上传成功",
  "path": "/tmp/uploads/matrix_mul.c"
}
```


---

### 2. 执行优化任务

- 接口地址：`/api/optimize`
- 请求方式：POST
- 请求类型：`multipart/form-data`
- 接口功能：提交用户上传的源文件和参数设置，后端执行自动调优逻辑，并返回优化结果、耗时、评分等信息


#### 请求参数

| 参数名 | 类型 | 必填 | 示例 | 描述 |
| :-- | :-- | :-- | :-- | :-- |
| file | File | 是 | matrix_mul.c | 上传的源文件 |
| optimizationGoal | String | 是 | "runtime" | 优化目标：`runtime`（运行时间）或 `size`（代码大小） |
| optimizationLevel | String | 是 | "high" | 优化等级：`low` / `medium` / `high` |
| n_iterations | Integer | 否 | 100 | 优化算法的迭代次数 |
| lower_bound | Integer | 否 | 20 | 搜索空间下界阈值 |
| enableVectorization | Boolean | 否 | true | 是否启用向量化 |
| fastMath | Boolean | 否 | true | 是否启用快速数学 |
| useNativeArch | Boolean | 否 | true | 是否启用本地体系结构指令集 |
| aggressiveInlining | Boolean | 否 | false | 是否启用激进函数内联 |
| vectorize / inline / unroll / simd | Boolean | 否 | true | 专家模式下的附加调优参数 |
| parallelism | Integer | 否 | 4 | 启用的并发线程数 |

#### 响应示例

```json
{
  "originTimeMs": 1530,
  "optimizedTimeMs": 650,
  "score": 1.78,
  "bestFlags": ["-O3", "-march=native", "-funroll-loops"],
  "message": "调优完成"
}
```


---

### 3. 获取历史记录（可选）

- 接口地址：`/api/history`
- 请求方式：GET
- 接口功能：查询历史调优任务记录，供用户查看历史优化配置与得分


#### 响应示例

```json
[
  {
    "id": 1,
    "timestamp": "2023-04-15 14:32",
    "file": "matrix_mul.c",
    "goal": "运行时间",
    "level": "大",
    "result": "[-O3, -march=native]",
    "score": 1.65
  }
]
```


---

### 4. 错误响应格式规范

```json
{
  "code": 500,
  "message": "系统错误，请联系管理员",
  "traceId": "abc123xyz"
}
```


---

### 5. Swagger / OpenAPI 示例结构

以下 JSON 结构可直接导入 Swagger 或 Apifox 工具以生成可视化接口文档：

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "编译器优化后端接口",
    "version": "1.0.0"
  },
  "paths": {
    "/api/optimize": {
      "post": {
        "summary": "执行调优任务",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": { "type": "string", "format": "binary" },
                  "optimizationGoal": { "type": "string" },
                  "optimizationLevel": { "type": "string" },
                  "n_iterations": { "type": "integer" },
                  "lower_bound": { "type": "integer" }
                },
                "required": ["file", "optimizationGoal", "optimizationLevel"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "优化完成",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "originTimeMs": { "type": "integer" },
                    "optimizedTimeMs": { "type": "integer" },
                    "score": { "type": "number" },
                    "bestFlags": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "message": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```


---

文档维护人：后端开发 @L_C_Ze@163.com
最后更新时间：2025-01-25

