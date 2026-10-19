# 鹈鹕快递大作战 · 交付

- 游戏入口：[index.html](index.html)
- 实现源码：本项目 `src/main.ts`、`index.html`。
- 全部运行资源已包含在 `output/assets/` 与 `output/materials/`，使用相对路径；关卡 JSON 和 13 份 SVG 与 `public/materials/` 逐字节一致。
- 使用 Phaser 3 Scene、Sprite/Image、Arcade Physics 实现游戏、碰撞、重叠与移动平台承载。界面也是 Phaser GameObject；无联网、存储、宿主页面通信或后端依赖。

## 启动

在本题项目根目录执行：

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory output
```

浏览器打开 `http://127.0.0.1:8080/`。也可 `npm run preview -- --port 5183`。构建命令为 `npm run build`，已成功运行。仅允许脚本的沙箱 iframe 需要预览服务按题目约定提供资源 CORS；本地测试已使用允许跨来源读取的静态服务验证，不需要游戏后端。

## 玩法与实现

方向键或 A/D 移动，空格起跳，P 暂停/继续。手机纵向布局提供独立的左右、跳跃和暂停按钮。收集三份快递后进入最右侧出口。生命为 3，时间为 120 秒，接触伤害后 800ms 无敌。掉落回起点且保留快递和时间。开始、暂停、胜利、生命耗尽、超时与重试都有可见界面。

未变动给定关卡、快递坐标、巡逻路线或公开物理参数。出口矩形按左上角解释；角色、机器人和快递按底部中心解释。机器人无重力，严格保持给定底部高度与水平巡逻路线。

## 实际验证

所有游戏操作均通过本地浏览器的键盘或指针完成。只读的 `#game-diagnostics` JSON 和 `window.__pelican` 用于观察位置、物理对象、事件与计时；没有设置位置、收集、生命、时间或胜利的调试入口。正常通关为分段操作、观察时暂停，未使用状态写入。

| 检查 | 实际步骤与结果 | 证据 |
| --- | --- | --- |
| 正常通关 | 起点向右，在约 x224 起跳拿 c1；跳过尖刺与断桥；从 x1196 台阶跳上移动平台；随平台移动后跳到高台拿 c2；跳至终点台拿 c3，进入出口。6 次真实起跳，三件各收一次，3 点生命通关；活动计时约 11.913 秒，HUD 剩余 109 秒。 | [原始记录](evidence/normal-win.json)、[胜利截图](evidence/desktop-win.jpg)、[游玩截图](evidence/desktop-playing.jpg) |
| 空中连跳 | 第一次起跳后，在空中松开并再次按空格；跳跃计数始终为 1，未重置向上速度。 | [两次观测](evidence/air-jump.json) |
| 移动平台 | 落稳后不按方向键，运行约 1.53 秒；平台 x1351.5→1489.5，角色 x1435.5→1573.5，同时平移 138px，脚底始终 y490、处于站立状态。碰撞体尺寸为 180×24，与显示一致。 | [前后记录](evidence/moving-platform.json) |
| 持续接触与生命耗尽 | 站在 x724 的巡逻路径；扣血活动时间为 4.29993、5.10849、7.55834 秒。前两次相隔约 0.809 秒，未每帧扣血；最终显示生命耗尽失败。 | [事件记录](evidence/robot-life-loss.json)、[失败截图](evidence/desktop-life-loss.jpg) |
| 掉落 | 拿到 c1 后从断桥左边走入缺口，等角色完全离开世界底边。生命 2→1，回到 x100，c1 保留，活动计时继续而未重置。 | [前后记录](evidence/fall.json) |
| 缺件出口 | 仅收 c1，沿地面抵达 x2320、y660，实际重叠出口；仍为游玩状态，提示“还差 2 份快递，回去找找吧”。 | [记录](evidence/locked-exit.json)、[截图](evidence/desktop-locked-exit.jpg) |
| 暂停 10 秒 | 受伤后暂停，实际等待 10 秒；elapsed=4.42501、无敌剩余 674.92ms、角色/机器人/平台位置和场景对象数前后相同。继续后从原处运动并恢复受伤。 | [前后记录](evidence/pause-10s.json)、[暂停截图](evidence/desktop-pause.jpg) |
| 自然超时 | 开始后站在安全起点，以正常速度等待完整 120 秒，未缩短或写入时间；到 0 后显示时间耗尽失败，生命仍为 3。 | [过程中记录](evidence/timeout-progress.json)、[终态记录](evidence/timeout-final.json)、[截图](evidence/desktop-timeout.jpg) |
| 连续重开 10 次 | 重复暂停→重新开始 10 次。每次均恢复 3 点生命、0 件快递和初始场景；动态体 7、静态体 8、碰撞/重叠关系 9、稳定场景对象 39，均不累积。 | [10 次原始观测](evidence/restart-10.json) |
| 重开后计时与输入 | 第十次重开后，实际等待 2 秒，活动计时增量 1.99984 秒；按右约 500ms 后 x100→220，无重复速度。A/D 往返亦正常；长按 P 约 1.4 秒仅进入一次暂停。 | [计时与移动](evidence/restart-rate-input.json)、[键盘记录](evidence/keyboard.json) |
| 结算锁定 | 胜利后继续按左与跳跃，位置与计时不变。 | [前后记录](evidence/finished-input.json) |
| 桌面尺寸 | 在 1280×720、`sandbox="allow-scripts"` 的 iframe 实际完成通关与回归；HUD、出口和按钮完整。 | [桌面画面](evidence/desktop-playing.jpg) |
| 手机布局和操作 | 390×844、`sandbox="allow-scripts"` iframe，用浏览器指针操作屏幕按钮。右按钮按住 500ms 后松开，x220 在后续 400ms 保持不变；点击跳跃产生一次起跳；从右按钮拖出后，x224 在后续 500ms 保持不变。暂停按钮与面板也可操作。 | [触屏区原始观测](evidence/mobile-input.json)、[手机游玩](evidence/mobile-playing.jpg)、[手机开始](evidence/mobile-start.jpg)、[手机暂停](evidence/mobile-paused.jpg) |
| 构建与打包 | `npm run build` 成功（TypeScript + Vite）；14 份关卡/素材文件与原件一致；运行脚本使用相对路径。浏览器检查未见游戏控制台错误。 | [资源核对](evidence/packaging.json)、[控制台观测](evidence/console.json) |

## 验证范围与已知限制

- 手机验证是桌面 Chrome 中的真实 390×844 iframe 与指针操作；操作时为适应浏览器可见高度，测试宿主将 iframe 显示缩放至 75%，iframe 内部尺寸保持 390×844。未在实体手机上测试多指触控、系统手势或横竖屏切换。
- 未运行 Safari/Firefox、无障碍读屏或专项性能采样；未声称这些项目已通过。
- 游戏无音效；跳跃、收集、受伤和送达使用动作、文字、色彩与粒子反馈。
- Vite 提示 Phaser 主包大于 500KB（约 1.50MB 原始 / 348KB gzip），属于构建体积提示，构建成功。
- 在已执行的范围内，没有发现阻止通关的已知缺陷。
