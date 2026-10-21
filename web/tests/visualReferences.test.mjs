import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { getVisualReference, visualReferenceFigures } from '../src/visualReferences.ts'

test('visual dimensions have references in both stages without replacing content judging', () => {
  const pairs = [
    ['01-svg', 'expression'], ['01-svg', 'visual'],
    ['02-static', 'impact'], ['02-static', 'craft'], ['02-static', 'integration'],
    ['03-dispatch', 'visual'], ['03-dispatch', 'interaction'],
    ['04-game2d', 'visual'], ['04-game2d', 'feel'],
    ['05-game3d', 'model'], ['05-game3d', 'rendering'], ['05-game3d', 'visual'],
  ]
  for (const [task, dimension] of pairs) {
    const reference = getVisualReference(task, dimension)
    assert.ok(reference, `${task}/${dimension}`)
    assert.equal(reference.labels.length, 3)
    assert.ok(reference.labels.every(label => label.length > 0))
  }
  assert.equal(getVisualReference('02-static', 'content'), null)
  assert.equal(getVisualReference('02-static', 'kids'), null)
  assert.equal(getVisualReference('06-memory', 'P01'), null)
})

test('raster reference assets are project-local PNG triptychs with saved prompts', () => {
  const images = new Set(Object.values(visualReferenceFigures).flatMap(x => x.image ? [x.image] : []))
  assert.equal(images.size, 5)
  for (const image of images) {
    assert.ok(image.startsWith('/rubric-references/r7/'))
    const path = fileURLToPath(new URL(`../public${image}`, import.meta.url))
    assert.ok(existsSync(path), image)
    const bytes = readFileSync(path)
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
    const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20)
    assert.ok(Math.abs(width / height - 3) < 0.01, `${image} must have three square panels`)
  }
  const metadata = JSON.parse(readFileSync(new URL('../public/rubric-references/r7/prompts.json', import.meta.url), 'utf8'))
  assert.equal(metadata.method, 'built-in image_gen')
  assert.deepEqual(metadata.levels, [0, 5, 10])
  assert.equal(metadata.files.length, 5)
  assert.ok(metadata.files.every(item => item.generationPrompt && item.editPrompt && item.source))
})

test('interaction and feel use action diagrams rather than raster proof of behavior', () => {
  assert.equal(getVisualReference('03-dispatch', 'interaction').kind, 'interaction')
  assert.equal(getVisualReference('04-game2d', 'feel').kind, 'feel')
  assert.ok(!getVisualReference('03-dispatch', 'interaction').image)
  assert.ok(!getVisualReference('04-game2d', 'feel').image)
  assert.match(getVisualReference('04-game2d', 'feel').note, /试玩/)
})
