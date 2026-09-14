# 食寐有时 - AI 健康膳食食疗助手

> 症状驱动的 AI 健康膳食食疗助手，围绕脑肠轴理论，用饮食调理改善失眠

## 项目简介

**食寐有时**是一款面向 22-35 岁都市白领的健康管理小程序，专注于通过中医食疗改善睡眠质量。基于体质评估问卷，为用户提供个性化的助眠饮食方案，并通过每日打卡、7天效果报告形成健康闭环。

### 核心特性

- 🎯 **症状驱动**：基于体质评估问卷生成个性化方案
- 🤖 **AI 智能方案**：结合 DeepSeek/通义千问 API + RAG 知识库
- 📊 **效果追踪**：每日打卡 + 7天效果报告 + 方案自动微调
- 💬 **智能问诊**：营养师 Agent AI 对话咨询

## 技术栈

| 技术 | 说明 |
|------|------|
| 微信小程序 | 前端框架 |
| 微信云开发 CloudBase | 后端服务 |
| DeepSeek/通义千问 API | AI 模型 |
| RAG 知识库 | 药食同源知识检索 |

## 项目结构

```
AiHealth/
├── miniprogram/                # 小程序源代码
│   ├── pages/                  # 页面
│   │   ├── index/             # 首页
│   │   ├── disclaimer/        # 免责声明
│   │   ├── assessment/        # 体质评估
│   │   ├── diagnosis/         # AI 问诊
│   │   ├── plan/              # 今日方案
│   │   ├── checkin/           # 打卡评分
│   │   ├── report/            # 健康报告
│   │   ├── reminder/          # 提醒设置
│   │   └── user/              # 我的
│   ├── components/            # 公共组件
│   │   ├── meal-card/         # 餐食卡片
│   │   ├── star-rating/       # 星级评分
│   │   ├── progress-bar/      # 进度条
│   │   └── loading/           # 加载态
│   ├── app.js                 # 小程序入口
│   ├── app.json               # 全局配置
│   └── app.wxss               # 全局样式
├── agent-test.html            # Agent 测试工具（可独立运行）
├── preview.html               # 小程序预览页面（可独立运行）
├── spec.md                    # 技术规格文档
├── 产品方案.md                 # 产品方案文档
└── 商业洞察报告.md             # 商业洞察报告
```

## 快速开始

### 前置条件

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册微信小程序账号
3. 开通微信云开发环境

### 开发步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/peachScorpion/aihealth-miniprogram.git
   ```

2. **导入项目**
   - 打开微信开发者工具
   - 选择"导入项目"
   - 选择 `miniprogram` 目录
   - 填入自己的 AppID

3. **配置云开发环境**
   - 在微信开发者工具中开通云开发
   - 创建云函数目录 `cloudfunctions/`
   - 部署云函数

4. **配置 API 密钥**
   - 在云函数中配置 AI API 密钥（DeepSeek/通义千问）
   - 配置 RAG 知识库

### 在线预览

- **Agent 测试工具**：[https://peachscorpion.github.io/aihealth-miniprogram/agent-test.html](https://peachscorpion.github.io/aihealth-miniprogram/agent-test.html)
- **小程序预览页面**：[https://peachscorpion.github.io/aihealth-miniprogram/preview.html](https://peachscorpion.github.io/aihealth-miniprogram/preview.html)

## 功能模块

### 核心流程

```
进入小程序 → 微信授权登录 → 确认免责声明
→ 体质评估问卷(5-10题) → AI生成个性化助眠方案
→ 每日查看方案 → 打卡 + 睡眠评分(1-5)
→ 7天效果报告 → 方案自动微调 → 循环闭环
```

### 主要功能

| 模块 | 功能说明 |
|------|---------|
| 用户登录 | 微信授权登录，token 管理 |
| 体质评估 | 5-10题问卷，判定体质类型 |
| AI 方案生成 | 基于体质 + 症状生成三餐 + 睡前食疗 |
| 每日打卡 | 记录餐食完成情况 + 睡眠评分 |
| 效果报告 | 7天数据统计 + 趋势分析 + 改善建议 |
| 方案微调 | 根据评分趋势自动调整方案 |
| AI 问诊 | 营养师 Agent 对话咨询 |

## 数据库设计

### 云数据库集合

- `users` - 用户表
- `assessments` - 评估记录表
- `meal_plans` - 方案表
- `checkins` - 打卡记录表
- `reports` - 效果报告表

详见 `spec.md` 文档

## 开发规范

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

### 分支管理

- `main` - 生产环境
- `dev` - 开发环境
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复分支

## 团队协作

### 开发流程

1. 从 `dev` 分支创建 `feature/功能名` 分支
2. 完成开发后提交 Pull Request
3. Code Review 通过后合并到 `dev`
4. 测试通过后合并到 `main`

### 代码规范

- 遵循微信小程序官方代码规范
- 使用 ESLint 进行代码检查
- 组件命名使用 kebab-case
- 页面命名使用 kebab-case

## 部署说明

### GitHub Pages 部署

本项目已部署到 GitHub Pages，提供在线预览：
- 仓库地址：`https://github.com/peachScorpion/aihealth-miniprogram`
- 预览地址：`https://peachscorpion.github.io/aihealth-miniprogram/`

### 微信小程序发布

1. 在微信开发者工具中点击"上传"
2. 在微信公众平台提交审核
3. 审核通过后发布

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系项目维护者。