import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getThemeStyles } from '../src/styles';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const outPath = join(distDir, 'theme.css');

mkdirSync(distDir, { recursive: true });
const buildPrefix = process.env.BUILD_PREFIX ?? 'ds';
const css = getThemeStyles(buildPrefix);
writeFileSync(outPath, css, 'utf8');
console.log('Wrote dist/theme.css (prefix:', buildPrefix, ')');
