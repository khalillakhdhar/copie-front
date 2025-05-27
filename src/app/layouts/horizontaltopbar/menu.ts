import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'TABLEAU DE BORD', // MENUITEMS.DASHBOARDS.TEXT
        icon: 'bx-home-circle',
        isCollapsed: false,
        subItems: [
            {
                id: 2,
                label: 'Tableau de Bord Par Défaut', // MENUITEMS.DASHBOARDS.LIST.DEFAULT
                link: '/dashboard',
                parentId: 1
            },
            {
                id: 3,
                label: 'Tableau de Bord SaaS', // MENUITEMS.DASHBOARDS.LIST.SAAS
                link: '/dashboards/saas',
                parentId: 1
            },
            {
                id: 5,
                label: 'Blog', // MENUITEMS.DASHBOARDS.LIST.BLOG
                link: '/dashboards/blog',
                parentId: 1
            },
        ]
    },
    {
        id: 30,
        label: 'APPLICATIONS', // MENUITEMS.APPS.TEXT
        icon: 'bx-customize',
        isCollapsed: false,
        subItems: [
            {
                id: 31,
                label: 'Calendrier', // MENUITEMS.CALENDAR.TEXT
                link: '/calendar',
                parentId: 30
            },
           
            {
                id: 34,
                label: 'Email', // MENUITEMS.EMAIL.TEXT
                isCollapsed: false,
                parentId: 30,
                subItems: [
                    {
                        id: 35,
                        label: 'Boîte de Réception', // MENUITEMS.EMAIL.LIST.INBOX
                        link: '/email/inbox',
                        parentId: 34
                    },
                    {
                        id: 36,
                        label: 'Email Lu', // MENUITEMS.EMAIL.LIST.READEMAIL
                        link: '/email/read',
                        parentId: 34
                    },
                    {
                        id: 37,
                        label: 'Modèles d\'Email', // MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT
                        parentId: 34,
                        subItems: [
                            {
                                id: 38,
                                label: 'Modèle de Base', // MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC
                                link: '/email/basic',
                                parentId: 37
                            },
                            {
                                id: 39,
                                label: 'Modèle d\'Alerte', // MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT
                                link: '/email/alert',
                                parentId: 37
                            },
                            {
                                id: 40,
                                label: 'Modèle de Facturation', // MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING
                                link: '/email/billing',
                                parentId: 37
                            }
                        ]
                    }
                ]
            },
            {
                id: 41,
                label: 'E-commerce', // MENUITEMS.ECOMMERCE.TEXT
                isCollapsed: false,
                parentId: 30, // Si c'est un enfant d'un autre menu
                subItems: [
                    {
                        id: 42,
                        label: 'Produits', // Section des produits
                        isCollapsed: true, // Indique si ce sous-menu est initialement replié
                        subItems: [
                            {
                                id: 43,
                                label: 'Ajouter un Produit', // MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT
                                link: '/ecommerce/add-product',
                                parentId: 42
                            },
                            {
                                id: 44,
                                label: 'Liste des Produits', // MENUITEMS.ECOMMERCE.LIST.PRODUCTS
                                link: '/ecommerce/products',
                                parentId: 42
                            },
                            {
                                id: 45,
                                label: 'Détails du Produit', // MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL
                                link: '/ecommerce/product-detail/1',
                                parentId: 42
                            }
                        ]
                    },
                    {
                        id: 46,
                        label: 'Catégories', // Section des catégories
                        isCollapsed: true, // Indique si ce sous-menu est initialement replié
                        subItems: [
                            {
                                id: 47,
                                label: 'Ajouter Catégorie', 
                                link: '/ecommerce/new-category',
                                parentId: 46
                            },
                            {
                                id: 48,
                                label: 'Liste des Catégories', 
                                link: '/ecommerce/categories',
                                parentId: 46
                            }
                        ]
                    },
                    {
                        id: 49,
                        label: 'Fournisseurs', // Section pour les fournisseurs
                        isCollapsed: true, // Indique si ce sous-menu est initialement replié
                        subItems: [
                            {
                                id: 50,
                                label: 'Ajouter un Fournisseur', 
                                link: '/ecommerce/add-supplier',
                                parentId: 49
                            },
                            {
                                id: 51,
                                label: 'Liste des Fournisseurs', 
                                link: '/ecommerce/suppliers',
                                parentId: 49
                            }
                        ]
                    },
                    {
                        id: 52,
                        label: 'Commandes', // MENUITEMS.ECOMMERCE.LIST.ORDERS
                        link: '/ecommerce/orders',
                        parentId: 41
                    },
                    {
                        id: 53,
                        label: 'Clients', // MENUITEMS.ECOMMERCE.LIST.CUSTOMERS
                        link: '/ecommerce/customers',
                        parentId: 41
                    },
                    {
                        id: 54,
                        label: 'Panier', // MENUITEMS.ECOMMERCE.LIST.CART
                        link: '/ecommerce/cart',
                        parentId: 41
                    },
                    {
                        id: 55,
                        label: 'Caisse', // MENUITEMS.ECOMMERCE.LIST.CHECKOUT
                        link: '/ecommerce/checkout',
                        parentId: 41
                    }
                ]
            },
            {
                id: 67,
                label: 'CONTACTS', // MENUITEMS.CONTACTS.TEXT
                isCollapsed: false,
                icon: 'bxs-user-detail',
                parentId: 30,
                subItems: [
                   
                    {
                        id: 70,
                        label: 'Profil', // MENUITEMS.CONTACTS.LIST.PROFILE
                        link: '/contacts/profile',
                        parentId: 67
                    },
                    {
                        id: 71,
                        label: 'Éditer Profil', // MENUITEMS.CONTACTS.LIST.EDITPROFILE
                        link: '/contacts/edit-profile',
                        parentId: 67
                    }
                ]
            },
            {
                id: 71,
                label: 'BLOG', // MENUITEMS.BLOG.TEXT
                isCollapsed: false,
                parentId: 30,
                subItems: [
                    {
                        id: 72,
                        label: 'Liste de Blogs', // MENUITEMS.BLOG.LIST.BLOGLIST
                        link: '/blog/list',
                        parentId: 71
                    },
                    {
                        id: 73,
                        label: 'Grille de Blogs', // MENUITEMS.BLOG.LIST.BLOGGRID
                        link: '/blog/grid',
                        parentId: 71
                    },
                    {
                        id: 74,
                        label: 'Détails du Blog', // MENUITEMS.BLOG.LIST.DETAIL
                        link: '/blog/detail',
                        parentId: 71
                    },
                ]
            },
             
        ]
    },
    {
        id: 84,
        icon: 'bx-collection',
        label: 'COMPOSANTS', // MENUITEMS.COMPONENTS.TEXT
        isCollapsed: false,
        subItems: [
            {
                id: 99,
                label: 'GRAPHIQUES', // MENUITEMS.CHARTS.TEXT
                parentId: 84,
                subItems: [
                    {
                        id: 100,
                        label: 'Apex', // MENUITEMS.CHARTS.LIST.APEX
                        link: '/charts/apex',
                        parentId: 99
                    },
                    {
                        id: 101,
                        label: 'Chart.js', // MENUITEMS.CHARTS.LIST.CHARTJS
                        link: '/charts/chartjs',
                        parentId: 99
                    },
                    {
                        id: 102,
                        label: 'Chartist', // MENUITEMS.CHARTS.LIST.CHARTIST
                        link: '/charts/chartist',
                        parentId: 99
                    },
                    {
                        id: 103,
                        label: 'Echart', // MENUITEMS.CHARTS.LIST.ECHART
                        link: '/charts/echart',
                        parentId: 99
                    }
                ]
            },
            {
                id: 109,
                label: 'Suivre Livraison', // MENUITEMS.MAPS.TEXT
                parentId: 84,
                subItems: [
                    {
                        id: 111,
                        label: 'Carte Leaflet', // MENUITEMS.MAPS.LIST.LEAFLETMAP
                        link: '/maps/leaflet',
                        parentId: 109
                    }
                ]
            }
        ]
    },
    {
        id: 112,
        label: 'PAGES SUPPLÉMENTAIRES', // HEADER.EXTRA_PAGES.TITLE
        icon: 'bx-file',
        subItems: [
            {
                id: 113,
                label: 'FACTURES', // MENUITEMS.INVOICES.TEXT
                parentId: 112,
                subItems: [
                    {
                        id: 114,
                        label: 'Liste de Factures', // MENUITEMS.INVOICES.LIST.INVOICELIST
                        link: '/invoices/list',
                        parentId: 113
                    },
                   
                ]
            },
        ]
    }
];
