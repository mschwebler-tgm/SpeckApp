module.exports = {
    root: true,

    overrides: [
        {
            files: [
                '**/__tests__/*.{j}s?(x)',
                '**/tests/unit/**/*.spec.{j}s?(x)',
            ],
            excludedFiles: '**/src/**/*.ts',
            env: {
                jest: true,
            },
        },
    ],

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.vue'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    ignorePatterns: ['**/dist/js/*.js', '**/dist/js/*.ts'],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        indent: [
            'error',
            4,
        ],
        'vue/script-indent': [
            'error',
            4,
        ],
        'vue/html-indent': [
            'error',
            4,
        ],
    },
};
