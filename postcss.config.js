module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // needed to scope tailwind styles
        require('postcss-nested'),

        // css purge must happen after `postcss-nested`
        // when using tailwind's built-in purge, it happens immediately after and before `postcss-nested`
        // and all the nested classes like `.cpg-leaflet-app.sm .sm:{selector}` will get dropped
        //...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
    ]
};