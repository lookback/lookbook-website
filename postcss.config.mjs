import { defaultPostCssPlugins } from '@lookback/lookbook';
import minify from 'postcss-csso';

export default function (ctx) {
    return {
        map: ctx.options.map, // Sourcemaps
        plugins: [
            ...defaultPostCssPlugins(),
            ctx.env === 'production' ? minify : null,
        ],
    };
}
