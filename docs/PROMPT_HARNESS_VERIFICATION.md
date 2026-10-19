# 提示词与 Harness 验证（2026-10-19）

已完成：第2/3/4题初始及追加详细提示词、五题50个阶段维度的检查与分档、独立Harness与版本字段、筛选分组、历史编辑、导出和CLI。

- `python3 -m unittest discover -s tests -v`：47项通过。
- `node --experimental-strip-types --test web/tests/*.test.mjs`：14项通过。
- `npm run build --prefix web`：TypeScript与生产构建通过。
- 在临时独立副本中离线构建第2/3/4题空白起始工程：全部成功，均产生output/index.html。2D/3D有引擎包体积提示，无构建失败。
- 独立临时工作台浏览器实测：选择DeepSeek Harness创建、列表展示、编辑为自定义Harness及版本、按Harness筛选；真实用户运行未被测试写入。
- 评分页检查：5档、逐项清单和通用判分说明可滚动查看，固定画幅内不与保存区重叠；桌面1440×1000与默认窄面板均检查。
- 正式8787工作台重启后HTTP正常，后台显示新字段，准备包就绪。目录24项预置及1项自定义。
- 新准备包完整性验证通过，版本pelican-v1.0-prompts-20261019，评分pelican-rubric-3；原始HTML无diff。
- 上版材料已备份至 `.prepared-backup-022f9e2ca1ef4edb82f1e55b95b428bb`；历史运行不迁移，旧Harness缺失显示未记录。

未完成且未宣称完成：2D/3D实际作品的真实通关、加宽后的搬运预跑和性能阈值校准。这里只验证起始工程和管理工作流，不代写参赛作品，不执行既有被测成果。

本地原始日志与截图位于verification/prompt-harness-tests.log、prompt-harness-web-tests.log、prompt-harness-build.log、harness-admin.png（不纳入Git）。

## 后续用户修订：移除Harness版本

当前界面、API摘要与新写入、CLI和导出均移除Harness版本字段。成绩在相同材料与评分版本下按模型+Harness合并；历史版本值不参与分组。既有磁盘记录不批量重写。

再次运行47项Python测试、14项前端测试及生产构建，全部通过。浏览器确认Harness下拉可见、Harness版本输入数量为0，8787服务已重启。题目与起始工程未受影响。日志：verification/harness-no-version-*.log。

## 第4版页面与视觉要求

第2题公开提示词明确五页、详情/确认弹层、真实统计、跨页状态、设置、视觉规范与可操作导航。沿用现有Mock，不要求不存在的配送员绩效或历史趋势；第3/4题补充游戏界面与视觉层级。评分第4版同步检查公开要求。Harness版本字段保持移除。

48项Python回归通过，包含上一提示词版本修订的备份保留及Mock统计/分页语义验证；第2/3/4题独立副本离线构建全部通过。题目原始HTML无修改，新准备包内容/哈希与源码一致，服务重启后确认新版就绪。此次没有前端源码改动，未重复前端测试。

材料版本：pelican-v1.0-pages-20261019；提示词pelican-prompts-4；评分pelican-rubric-4。旧包备份：.prepared-backup-7e61226cc6124d548f7d6d6dae23f2ef。新规则仅对新轮次生效，已有轮次继续读取固定材料。日志verification/pages-v4-tests.log和pages-v4-starters.log。未运行被测作品，游戏正式通关与性能校准仍未验证。

## 归一化五档思考强度（计划v5）

新增environment.reasoningLevel，严格使用1–5或unsupported；未记录为null。后台新建/编辑、历史列、筛选、CSV/JSON导出和CLI贯通。原生档位按顺序等距映射，采用半数向上舍入；默认/自适应无法定位时不推断。旧environment.reasoning原文只读保留，不猜测映射。相同材料、评分版本、模型、Harness和归一化强度才汇总，缺失Harness或强度的运行逐轮展示。

- 52项Python全量回归通过，含合法值验证、错误输入原子拒绝、创建/编辑/重新读取/修改历史/CLI/CSV及JSON导出。
- 16项前端测试通过，含不同强度分组隔离、未记录不合并、2/3/4/5/6个原生档位映射。
- TypeScript检查与Vite生产构建通过，git diff --check无错误。
- 独立临时工作台浏览器创建二档记录，编辑成五档，刷新仍为五档；按五档筛选仅显示对应记录。1440×1000下编辑对话框内容与保存按钮可见。截图verification/reasoning-admin.png；未写入真实测试记录。
- 正式8787服务已重启，bootstrap恰好提供五个强度档位，现有轮次保留；用户当前后台页已刷新，可见新控件，没有Harness版本字段。

日志：verification/reasoning-tests.log、reasoning-web-tests.log、reasoning-build.log。本次只修改管理元数据与界面，题目材料和起始工程未受影响，没有执行被测作品。此字段仅记录条件，不自动修改模型客户端设置；同一归一化档位不代表相同算力。
