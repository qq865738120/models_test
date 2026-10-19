# 工具验证记录

日期：2026-10-18（Asia/Shanghai）

- 26项行为测试全部通过，记录见 `tests.log`。
- React、Phaser 3、Three.js＋enable3d 起始工程类型检查和生产构建通过，记录见 `prepare.log`。
- 公开Mock查询、筛选、分页、详情、乱序、查询失败、原子派单失败与重置通过实测。
- 本机真实初始化全部五题，已校验干净 `ready-local-r1`。
- 研究开发集执行与指标复算通过，结果仅用于工具检查，不是参赛模型成绩；见 `memory-dev-smoke.json`。
- `verification-smoke` 研究题初始与追加快照分别冻结，材料校验通过，不进入模型榜。
- 提示词页面实际打开并点击复制，显示“提示词已复制”；截图保存在 `prompt-page.png`。
- 3D起始工程实际加载出Three.js场景及本地Ammo地面；不是完整游戏通关验证。
- 未运行：Docker（本机未安装）、完整智能体隔离接入、游戏参考实现通关、性能阈值校准、人工专家评分。材料状态保持试运行。

当前准备材料哈希：`d6e538814630f3ea0d78a0614303de591abf99454059fcd21004e5f962eaae1f`。
原标准哈希：`2c4e60d763072b8d320e7abae4db82ed72b0e0ade1484411d177e784b4f8a7be`（原文件未修改）。

复验：`python3 -m unittest discover -s tests -v`；按 README 创建新的独立运行，再执行完整性检查与阶段留档。
