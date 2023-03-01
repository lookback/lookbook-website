/*
    This script parses *all* classes in the Lookbook CSS and outputs
    them to be rendered by the site.
*/

const { colors } = require('@lookback/lookbook');
const postcss = require('postcss');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const {
    version,
} = require('../../node_modules/@lookback/lookbook/package.json');

const readFile = promisify(fs.readFile);

const CLASS_REGEX = /\.([\w\d-]+)/;

const mkTailwindDocsUrl = (slug) => `https://v2.tailwindcss.com/docs/${slug}`;

const arrayMove = (arr, from, to) => arr.splice(to, 0, arr.splice(from, 1)[0]);

// Map group names (machine friendly) to a section with human readable details
// to be rendered in the templates.
const CLASS_MAP = {
    bg: {
        title: 'Background color',
        docsUrl: mkTailwindDocsUrl('background-color'),
    },
    p: {
        title: 'Padding',
        docsUrl: mkTailwindDocsUrl('padding'),
    },
    m: {
        title: 'Margin',
        docsUrl: mkTailwindDocsUrl('margin'),
    },
    border: {
        title: 'Border',
        docsUrl: mkTailwindDocsUrl('border-color'),
    },
    w: {
        title: 'Width',
        docsUrl: mkTailwindDocsUrl('width'),
    },
    maxWidth: {
        title: 'Max-width',
        docsUrl: mkTailwindDocsUrl('max-width'),
    },
    minHeight: {
        title: 'Min-height',
        docsUrl: mkTailwindDocsUrl('min-height'),
    },
    rounded: {
        title: 'Border radius',
        docsUrl: mkTailwindDocsUrl('border-radius'),
    },
    cursor: {
        title: 'Cursor',
        docsUrl: mkTailwindDocsUrl('cursor'),
    },
    opacity: {
        title: 'Opacity',
        docsUrl: mkTailwindDocsUrl('opacity'),
    },
    leading: {
        title: 'Line height',
        docsUrl: mkTailwindDocsUrl('line-height'),
    },
    z: {
        title: 'Z-index',
        docsUrl: mkTailwindDocsUrl('z-index'),
    },
    flex: {
        title: 'Flexbox',
        docsUrl: mkTailwindDocsUrl('flex'),
    },
    grid: {
        title: 'Grid',
        docsUrl: mkTailwindDocsUrl('grid'),
    },
    tracking: {
        title: 'Letter spacing',
        docsUrl: mkTailwindDocsUrl('letter-spacing'),
    },
    select: {
        title: 'User select',
        docsUrl: mkTailwindDocsUrl('user-select'),
    },
    textAlign: {
        title: 'Text align',
        docsUrl: mkTailwindDocsUrl('text-align'),
    },
    textColor: {
        title: 'Text color',
        docsUrl: mkTailwindDocsUrl('text-color'),
    },
    fontSize: {
        title: 'Font size',
        docsUrl: mkTailwindDocsUrl('font-size'),
    },
    list: {
        title: 'List',
        docsUrl: mkTailwindDocsUrl('list-style-type'),
    },
    positioning: {
        title: 'Positioning',
        docsUrl: mkTailwindDocsUrl('top-right-bottom-left'),
    },
    overflow: {
        title: 'Overflow',
        docsUrl: mkTailwindDocsUrl('overflow'),
    },
    display: {
        title: 'Display',
        docsUrl: mkTailwindDocsUrl('display'),
    },
    position: {
        title: 'Position',
        docsUrl: mkTailwindDocsUrl('position'),
    },
    fill: {
        title: 'Fill',
        docsUrl: mkTailwindDocsUrl('fill'),
    },
    typography: {
        title: 'Typography',
        docsUrl: mkTailwindDocsUrl('fill'),
    },
    textBreaks: {
        title: 'Word break',
        docsUrl: mkTailwindDocsUrl('word-break'),
    },
    font: {
        title: 'Fonts',
        docsUrl: mkTailwindDocsUrl('font-family'),
    },
    shadow: {
        title: 'Shadow',
        docsUrl: mkTailwindDocsUrl('box-shadow'),
    },
    fontSmoothing: {
        title: 'Font smoothing',
        docsUrl: mkTailwindDocsUrl('font-smoothing'),
    },
    visibility: {
        title: 'Visibility',
        docsUrl: mkTailwindDocsUrl('visibility'),
    },
    icon: {
        title: 'Icons',
    },
    btn: {
        title: 'Buttons',
    },
    loading: {
        title: 'Loading indicators',
    },
};

// Map a class name regex test to its group name. Values in this
// hash must match the keys in `CLASS_MAP`.
// prettier-ignore
const GROUP_MAP = {
    '^bg-?': 'bg',
    '^icon(--)?': 'icon',
    '^Spinner(--)?': 'loading',
    '^LoadingDots': 'loading',
    '^p(y|x)?(r|l|t|b)?-(\\d|auto|px)': 'p',
    '^m(y|x)?(r|l|t|b)?-(\\d|auto|px)': 'm',
    '^border(r|l|t|b)?(-\\d)?': 'border',
    '^w-(\\d|auto|px|full|screen)': 'w',
    '^min-h-': 'minHeight',
    '^max-w-': 'maxWidth',
    '^z-': 'z',
    '^rounded(r|l|t|b)?(-\\d)?': 'rounded',
    '^cursor-': 'cursor',
    '^opacity-': 'opacity',
    '^leading-': 'leading',
    '^btn-?': 'btn',
    '^tracking-': 'tracking',
    '^select-': 'select',
    '^text-f\\d': 'fontSize',
    '^text-(left|center|right|justify)': 'textAlign',
    '^text-': 'textColor',
    '^list-': 'list',
    '^overflow-': 'overflow',
    '^scrolling-': 'overflow',
    '^(top|bottom|right|left)-(\\d|auto)': 'positioning',
    '^inset-(\\d|y|x)?(-auto|\\d)?': 'positioning',
    '^place-content-|place-items-': 'grid',
    '^flex-?|items-|self-|justify-': 'flex',
    '^block|inline-?|table-?|hidden|contents|grid|flow-root': 'display',
    '^static|fixed|absolute|sticky|relative': 'position',
    '^fill': 'fill',
    '^(not-)?italic|(upper|lower|normal-)case|capitalize|(no-)?underline|line-through': 'typography',
    '^break-(normal|words|all)|truncate|whitespace-|break-text': 'textBreaks',
    '^font-': 'font',
    '^shadow-?': 'shadow',
    '^(subpixel-)?antialiased': 'fontSmoothing',
    '^(in)?visible': 'visibility',
};

const findGroupFromClass = (klass) => {
    const find = Object.entries(GROUP_MAP).find(([regex]) =>
        new RegExp(regex, 'g').test(klass)
    );

    return find ? find[1] : false;
};

/** Finds all classes in a .css file. */
const getAllClasses = async (filePath) => {
    if (!filePath.endsWith('.css')) {
        throw new Error(`${filePath} must be a .css file!`);
    }

    const css = await readFile(path.resolve(filePath));
    const root = postcss.parse(css);

    const classes = new Set();

    root.walkRules((rule) => {
        const match = rule.selector.match(CLASS_REGEX);

        if (match) {
            classes.add(match[1].trim());
        }
    });

    return [...classes];
};

/**
 * Groups an array of CSS utility classes by subject
 * according to the structure:
 *
 *   {
 *     [title: string]: {
 *          classes: string[]
 *          docsUrl?: string
 *     }
 *   }
 */
const groupClassesBySubject = (classes) => {
    const groups = classes.reduce(
        (acc, klass) => {
            const groupName = findGroupFromClass(klass);

            const section = CLASS_MAP[groupName];

            if (!section) {
                return {
                    ...acc,
                    Other: {
                        ...acc.Other,
                        classes: [...acc.Other.classes, klass],
                    },
                };
            }

            return acc[section.title]
                ? {
                      ...acc,
                      [section.title]: {
                          ...acc[section.title],
                          classes: [...acc[section.title].classes, klass],
                      },
                  }
                : {
                      ...acc,
                      [section.title]: {
                          docsUrl: section.docsUrl,
                          classes: [klass],
                      },
                  };
        },
        { Other: { classes: [] } }
    );

    // Transform to a sorted (alphabetically) array
    const arr = Object.keys(groups)
        .sort()
        .map((title) => ({
            ...groups[title],
            title,
        }));

    // Always put "Other" group at the bottom.
    const indexOfOther = arr.findIndex(
        (item) => item.title.toLowerCase() === 'other'
    );

    arrayMove(arr, indexOfOther, arr.length - 1);

    return arr;
};

module.exports = async () => {
    const classes = await getAllClasses(
        './node_modules/@lookback/lookbook/dist/lookbook.css'
    );

    const groupedClasses = groupClassesBySubject(classes);

    return { colors, version, classes, groupedClasses };
};
