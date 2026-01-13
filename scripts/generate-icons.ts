import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

function generateIcon(size: number, text: string, outputPath: string) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#0c4a3e';
  ctx.fillRect(0, 0, size, size);
  
  ctx.fillStyle = '#a8d5ba';
  const fontSize = Math.floor(size * 0.23);
  ctx.font = `bold ${fontSize}px Amiri, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size * 0.55);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

const publicDir = path.join(process.cwd(), 'client', 'public');

generateIcon(512, 'محراب', path.join(publicDir, 'icon-512.png'));
generateIcon(192, 'محراب', path.join(publicDir, 'icon-192.png'));
generateIcon(180, 'محراب', path.join(publicDir, 'apple-touch-icon.png'));
generateIcon(32, 'محراب', path.join(publicDir, 'favicon.png'));

console.log('All icons generated!');
