module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer'),
        require('postcss-modules')({
            globalModulePaths: ["src\/global_styles.scss"],
        })
    ]
}