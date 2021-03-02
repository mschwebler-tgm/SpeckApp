module.exports = function removeHashingLoader(source) {
    return source.replace(/^#!.*\n/, '');
};
