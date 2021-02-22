const path = require('path');

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.ts', '.vue'],
            alias: {
                '@': path.join(__dirname, 'src/'),
                '@calendar': path.join(__dirname, 'src/modules/calendar/'),
            }
        }
    },
}
