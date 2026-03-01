import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

register(StyleDictionary);

// Parse Token Studio's single-file format into individual token sets
const tokensJson = await import('./src/tokens.json', { with: { type: 'json' } });
const reserved = ['$themes', '$metadata'];

// Write each token set as a separate temp file for Style Dictionary
mkdirSync('./tmp', { recursive: true });
for (const [key, value] of Object.entries(tokensJson.default)) {
  if (reserved.includes(key)) continue;
  const safeName = key.replace(/\//g, '_').replace(/\.json$/, '');
  writeFileSync(
    resolve(`./tmp/${safeName}.json`),
    JSON.stringify(value, null, 2)
  );
}

const sd = new StyleDictionary({
  source: ['tmp/**/*.json'],
  platforms: {
    css: {
      transforms: [
        'ts/resolveMath',
        'ts/size/px',
        'ts/color/modifiers',
        'name/kebab',
      ],
      prefix: 'ds',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
      }]
    },
    js: {
      transforms: [
        'ts/resolveMath',
        'ts/size/px',
        'ts/color/modifiers',
        'name/camel',
      ],
      prefix: 'ds',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/esm',
      }]
    }
  }
});

await sd.buildAllPlatforms();