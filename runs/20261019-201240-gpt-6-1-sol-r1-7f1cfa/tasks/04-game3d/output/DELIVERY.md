# 鹈鹕叉车驾校

最终入口：`output/index.html`。验证索引：`output/verification.html`。

## 启动与构建

在本题根目录执行：

```sh
npm run build
python3 -m http.server 8000 --directory output
```

浏览器打开 `http://127.0.0.1:8000/`。端口可自行替换。也已使用 `npm run preview` 检查生产包。

所有运行脚本、样式、地图副本及 Ammo WASM 均在 `output/` 内，引用为本地相对路径。不使用外网、存储服务、宿主父页面、localStorage、IndexedDB、Service Worker 或后端接口。沙箱 iframe 的跨来源资源支持由预览服务提供；已用附带 `iframe-check.html` 在有 `Access-Control-Allow-Origin: *` 的本地静态服务中验证。测试服务 `.runtime/cors_server.py` 仅用于验证，不是游戏依赖。

## 操作与模型

- W / S：前进 / 倒车；A / D：转向；空格：制动。
- Q：降叉；E：升叉。降到箱底、对齐并伸入后，升叉托起；降至接近地面后自动释放。
- P：暂停 / 继续。窗口失焦或切至后台也自动暂停。
- 暂停面板可进入模型检查，切换前、侧、后、斜上方或线框；返回后仍暂停。
- 本局120秒，三个箱子全部正确交付即胜利。结算后输入冻结，重开恢复初始位置和状态。

原实现：`src/main.ts`；交付内源码副本：`output/source/main.ts`，样式副本 `output/source/style.css`。

关键源码位置（副本与原文件行号一致）：

| 部分 | 位置 |
|---|---|
| 仓库布局、边界、货架、区域 | `source/main.ts:47`，`buildWarehouse` |
| 车身、四轮、座椅、门架、双叉、鹈鹕父子层级 | `source/main.ts:76`，`buildVehicle` |
| 车体、货叉、载货碰撞 | `source/main.ts:125`，`blocking` |
| 对齐、横向、高度与伸入检查 | `source/main.ts:132`，`pickupMetrics` |
| 释放、落地、区域投影和稳定计时 | `source/main.ts:135` 至 `checkDeliveries` |
| 固定步长驾驶及轮子/门架联动 | `source/main.ts:140`，`step` |
| 完整重置、跟随及检查镜头 | `source/main.ts:186`，`reset`；`:196`，`updateCamera` |

## 契约实现与最小假设

地图直接来自给定 JSON，保持24×20米地面、初始位置、箱子1.2米尺寸、区域3×3米、车宽1.4米及全部控制参数。四轮外沿与车宽统一。Y向上，车头局部朝 +Z，初始 yaw=π。

使用 Three.js 0.171.0、enable3d 0.26.1 的 `AmmoPhysics`。货箱为20kg动态 Ammo 立方体，地面、墙和货架等为静态刚体；叉车350kg参数配合运动学车体和二维OBB阻挡检测。吸附搬运期间箱子切为运动学，释放恢复动态刚体，由重力落地；关闭箱子翻倒以简化搬运。车轮有独立转向和滚动节点，货叉和鹈鹕均挂在整车层级内。

拾取阈值未放宽：角度≤15°、横向≤0.25m、叉顶与箱底高度差≤0.15m、实际水平重叠≥0.3m。箱子两面均绘有叉孔，因此沿箱体 ±Z 的相向接近均可，按0°或180°等价处理。吸附仅将横向及朝向对齐，保留纵向伸入位置；最小箱心车距1.94m，避免与车头交叠。车身中心距和吸附辅助均记录在拾取日志中。

`forkHeight` 是升降架参数；叉片中心在其下0.08m，叉片厚0.08m，因此叉顶是 `forkHeight - 0.04`。最低叉顶为0.08m，满足≤0.1m释放条件；记录中的释放箱底约0.0917m，随后真实下落至地面。区域包含判定对箱子四个底角应用完整世界四元数，唯一边界数值容差为0.0001m；OBB接触容差为0.002m。计分要求已释放、箱底绝对距地≤0.05m、水平速度≤0.1m/s、连续稳定≥0.5秒。固定1/60秒步进下日志稳定值为0.5167秒。箱子交付后不会再次被拾起或重复计分。

## 已实际运行的检查

生产构建 `npm run build` 成功。使用本地浏览器真实按键驾驶；没有内置自动驾驶、瞬移、直接加分或预录搬运路线。

| 检查 | 实际结果与证据 |
|---|---|
| 三箱完整通关 | 最终构建在仅允许脚本的沙箱iframe内通关，游戏用时39.833秒，3/3；`evidence/24-final-iframe-victory.json`、同名PNG。较早完整通关记录43.767秒另保留于 `08-victory.json`。 |
| 前后行驶、A/D转向、制动、升降 | 真实执行上述搬运路线；快照包含实际位置、角度、叉高、拾放事件及拾取条件。 |
| 阻挡车体的边界 | 倒车撞南墙，中心停在 z≈8.702m，未穿越边界；`11-wall.json`。转弯中路障阻挡也保留在 `15-wrong-color.json` 的事件日志。 |
| 隔空拾取拒绝 | 初始位置单独升叉，伸入为0，未携箱；`10-no-remote-pickup.json`。 |
| 仅驶入区域不计分 | 蓝箱在B区上方仍携带时0/3；`03-carried-zone.json`。 |
| 真实落地后计分 | 三箱交付日志均箱底约 -0.000000095m、水平速度0、稳定0.5167秒。 |
| 错色拒绝 | 蓝箱完全落入红色A区，箱心(-5.634,-5.857)，箱底0、水平速度0、仍0/3；`15-wrong-color.json`、同名PNG。已用四角投影复核完整包含。 |
| 不重复交付 | 正确交付蓝箱后再次E/Q升降，分数保持1，未拾起；`16-before-repeat.json`、`17-after-repeat.json`。 |
| 暂停冻结 | 暂停中按驾驶和升叉键，车辆、箱子、计时、叉高均相同；`11-wall.json`、`12-paused-input.json`。 |
| 稳定计时冻结 | 蓝箱稳定累计0.233秒时暂停，等待1.8秒仍0.233，恢复后才计分；`20-stable-paused-before.json`、`21-stable-paused-after.json`。 |
| 检查模式不改游戏 | 前/侧/后/斜上/线框截图均保留，返回时车辆、箱子、剩余时间与进入前一致；`13-after-inspection.json`。 |
| 自然超时失败 | 未加速、未改时间地自然运行至120秒，0/3失败；`18-timeout.json`、同名PNG。之后W/E输入仍冻结，见 `19-timeout-input.json`。 |
| 胜利后冻结 | 最终沙箱通关后按W/E，车辆、箱子、时间完全一致；`25-final-win-input.json`。 |
| 重开恢复 | 车辆恢复(0,7)、yaw=π、叉高0.12，三箱原位且未交付；`14-restart.json`。连续十次重开后也复核初态。 |
| 静态资源与沙箱 | 入口JS/CSS、Ammo JS/WASM、地图及采样工具全部HTTP 200；`resource-http-check.json`。无同源身份的iframe实际三箱通关，浏览器未记录警告/错误。 |

多视角：`evidence/model-front.png`、`model-side.png`、`model-rear.png`、`model-oblique.png`、`model-wireframe.png`。驾驶画面：`23-final-driving.png`。

## 性能原始结果

- 硬件：Apple M5 Pro，Mac17,9，48GiB内存；Darwin 27.0.0 arm64。
- 浏览器：本地Chromium，User Agent版本 Chrome/155.0.0.0；具体原文在原始JSON内。
- 生产文件：`assets/index-DK7wFgA0.js`。1280×720，浏览器设备DPR1、渲染DPR1、画布1280×720，使用浏览器视口覆盖设置核对。
- `tools/performance.js` 原文复制为 `output/performance.js`，SHA256核对一致。通过其 `bench.frames({warmupSeconds:10,sampleSeconds:60})` 默认值实际采集。游戏处于游玩状态、场景完整、无驾驶输入、未暂停；前述全流程驾驶为另一次功能测试。
- 7200个原始帧间隔，P95 **10.1000ms**，均值8.3334ms，最大10.4000ms，满足≤33.3ms。原始数组：`evidence/frames-production.json`；完整条件：`performance-environment.json`；汇总：`performance-summary.json`。
- 连续十次重开，原始 `bench.resources(renderer)` 的 `geometries` 均28、`textures` 均20、`programs` 均7；未持续增长。完整原始时间和数值：`evidence/resources-10-restarts.json`。模型、几何体和文字纹理在同一场景复用，重开不重建资源。
- 功能截图和沙箱通关使用浏览器默认设备DPR2，游戏仍固定渲染DPR1；与上述独立DPR1性能采样明确区分。

## 未运行与已知限制

未进行跨浏览器、移动端、长时间压力测试或逐一穷举所有接触角度。帧间隔采样覆盖静止游玩场景，未宣称覆盖60秒连续驾驶的性能。没有额外悬挂、液压、翻倒和车体推箱模拟；车体接触货箱会停止，须用货叉搬运。货叉仅对契约指定的对齐搬运提供吸附辅助。极端高举货物跨越矮墙后原地降叉的堆叠/边缘工况未验证。

可附加 `?qa=1` 打开本地验证面板，查看实际只读状态、导出记录、调用原始帧间隔采样或连续重开资源采样。正式入口默认不显示该面板。
