module.exports = {
    cssDest: './dist/atomic.css',
    options: {
        namespace: '#atomic',
        minimize: true
    },
    configs: {
        breakPoints: {
            sm: '@media screen(min-width=750px)',
            md: '@media(min-width=1000px)',
            lg: '@media(min-width=1200px)'
        },
        classNames: []
    }
}