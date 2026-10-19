// 公开采样工具；在浏览器控制台按契约运行，不是自动评分器。
window.bench = {
  async frames({ warmupSeconds = 10, sampleSeconds = 60 } = {}) {
    await new Promise(r => setTimeout(r, warmupSeconds * 1000))
    const raw = []; let previous; const start = performance.now()
    await new Promise(resolve => {
      function step(now) {
        if (previous !== undefined) raw.push(now - previous)
        previous = now
        if (now - start >= sampleSeconds * 1000) resolve()
        else requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    const sorted = [...raw].sort((a,b) => a-b)
    return { raw, p95: sorted[Math.ceil(sorted.length * .95)-1],
      width: innerWidth, height: innerHeight, dpr: devicePixelRatio, userAgent: navigator.userAgent }
  },
  async input(selector, values, { settleMs = 500 } = {}) {
    const raw = []
    for (const value of values) {
      const element = document.querySelector(selector)
      if (!element) throw new Error('未找到搜索输入框')
      const start = performance.now()
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value')
      descriptor.set.call(element, value)
      element.dispatchEvent(new Event('input', { bubbles: true }))
      await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)))
      raw.push(performance.now() - start)
      await new Promise(resolve => setTimeout(resolve, settleMs))
    }
    const sorted = [...raw].sort((a,b) => a-b)
    return { raw, p95: sorted[Math.ceil(sorted.length*.95)-1],
      note: '近似测量输入到下一次绘制机会；主持人须同时确认真实可见反馈，不能仅以此代替交互验收。' }
  },
  resources(renderer) {
    return { at: performance.now(), geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures, programs: renderer.info.programs?.length ?? null }
  },
  save(data, name = 'performance.json') {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)], { type: 'application/json' }))
    const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url)
  }
}
