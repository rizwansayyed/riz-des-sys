import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
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