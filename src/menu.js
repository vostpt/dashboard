const Menu = [
    {
        heading: 'VOST Portugal',
    },
    {
        name: 'Página principal',
        path: '/home',
        icon: 'icon-home'
    },
    {
        name: 'Ocorrências',
        icon: 'icon-speedometer',
        submenu: [
            {
                name: 'Ocorrências',
                path: '/occurrences',
            }]
    },
    {
        name: 'Informação',
        icon: 'icon-info',
        submenu: [
            {
                name: 'Tipos de Ocorrências',
                path: '/occurrence-types',
            }
        ]
    }
];

export default Menu;