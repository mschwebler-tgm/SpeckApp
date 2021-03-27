const path = require('path');

module.exports = {
    transpileDependencies: [
        'vuetify',
    ],
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.ts', '.vue'],
            alias: {
                '@': path.join(__dirname, 'src/'),
                '@auth': path.join(__dirname, 'src/modules/auth/'),
                '@calendar': path.join(__dirname, 'src/modules/calendar/'),
                '@models': path.join(__dirname, '../models/'),
            },
        },
    },
};
