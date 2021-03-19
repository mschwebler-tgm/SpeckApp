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
    ignorePatterns: [
        '**/dist/js/*.js',
        '**/dist/js/*.ts',
        '**/*.d.ts',
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-param-reassign': 'off',
        'prefer-destructuring': 'off',
        'class-methods-use-this': 'off',
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'max-len': ['error', { code: 120 }],
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
