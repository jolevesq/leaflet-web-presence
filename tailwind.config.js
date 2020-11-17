module.exports = {
    purge: false,
    theme: {
        // remove all breakpoints because will depend on the shell size, not the size of the window/page
        screens: {
        },
        spacing: {
            '-32': '-32px',
            '-2': '-2px',
            '0': '0px',
            '1': '1px',
            '2': '2px',
            '3': '3px',
            '4': '4px',
            '5': '5px',
            '6': '6px',
            '8': '8px',
            '10': '10px',
            '12': '12px',
            '14': '14px',
            '15': '15px',
            '16': '16px',
            '18': '18px',
            '20': '20px',
            '24': '24px',
            '25': '25px',
            '26': '26px',
            '28': '28px',
            '30': '30px',
            '32': '32px',
            '36': '36px',
            '38': '38px',
            '40': '40px',
            '44': '44px',
            '48': '48px',
            '56': '56px',
            '64': '64px',
            '75': '75px',
            '80': '80px',
            '100': '100px',
            '116': '116px',
            '180': '180px',
            '256': '256px',
            '500': '500px'
        },
        zIndex: {
            '0': 0,
            '10': 10,
            '20': 20,
            '30': 30,
            '40': 40,
            '50': 50,
            '25': 25,
            '50': 50,
            '75': 75,
            '100': 100,
            '400': 400,
            '425': 425,
            '500': 500,
            '850': 850,
            '1100': 1100,
            'auto': 'auto',
        },
        extend: {
            inset: {
                '-9': '-9px',
                '1': '1px',
                '32': '32px',
                '64': '64px',
                '200': '200px',
                '1/2': '50%',
                full: '100%'
            },
            colors: {
                'black-75': 'rgba(0, 0, 0, 0.75)',
                'white-75': 'rgba(255, 255, 255, 0.75)',
                'grey-test': 'rgba(150,150,150,0.7);'
            },
            boxShadow: {
                tm: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1)'
            }
        }
    },
    variants: {

    },
    corePlugins: {
        preflight: true // since all tailwind styles will be scoped under `v-application`, it's safe to enable preflight CSS reset
    },
    plugins: [
    ]
};
