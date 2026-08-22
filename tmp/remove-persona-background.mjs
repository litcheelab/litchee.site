import sharp from "/Users/litliao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs";

const jobs = [
  {
    input: "/Users/litliao/.codex/generated_images/019fe3b6-2032-7893-b866-48fd494656e6/exec-30b807e3-ffa4-4194-9d2a-2ad1bc1da479.png",
    output: "/Users/litliao/Documents/litchee.site-source/public/assets/learners/personas/litchee-jr.png",
  },
  {
    input: "/Users/litliao/.codex/generated_images/019fe3b6-2032-7893-b866-48fd494656e6/exec-592ce978-64ba-4d2b-9f1b-cc5eea56caf6.png",
    output: "/Users/litliao/Documents/litchee.site-source/public/assets/learners/personas/fcc-hs.png",
  },
  {
    input: "/Users/litliao/.codex/generated_images/019fe3b6-2032-7893-b866-48fd494656e6/exec-75af8e46-f5cc-400c-9884-17136d1ccf4d.png",
    output: "/Users/litliao/Documents/litchee.site-source/public/assets/learners/personas/litchee-academy.png",
  },
];

const isBackground = (r, g, b) => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min >= 238 && max - min <= 10;
};

for (const { input, output } of jobs) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;

  const enqueue = (x, y) => {
    const pixel = y * width + x;
    if (visited[pixel]) return;
    const offset = pixel * channels;
    if (!isBackground(data[offset], data[offset + 1], data[offset + 2])) return;
    visited[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(x - 1, y);
    if (x + 1 < width) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y + 1 < height) enqueue(x, y + 1);
  }

  for (let pixel = 0; pixel < visited.length; pixel += 1) {
    if (visited[pixel]) data[pixel * channels + 3] = 0;
  }

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    if (data[pixel * channels + 3] === 0) continue;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const margin = 24;
  const left = Math.max(0, minX - margin);
  const top = Math.max(0, minY - margin);
  const right = Math.min(width - 1, maxX + margin);
  const bottom = Math.min(height - 1, maxY + margin);

  await sharp(data, { raw: { width, height, channels } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}
