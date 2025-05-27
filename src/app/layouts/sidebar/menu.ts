import { MenuItem } from './menu.model';
export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU', 
        isTitle: true
    },
    {
        id: 2,
        label: 'TABLEAUX DE BORD', 
        icon: 'bx-home-circle',
        roles: ['Administrateur', 'Client','Livreur'],
        subItems: [
            {
                id: 3,
                label: 'TABLEAU DE BORD PAR DÉFAUT', 
                link: 'charts/stats',
                parentId: 2,
                roles: ['Administrateur'],
            },
            {
                id: 4,
                label: 'TABLEAU DE BORD PAR DÉFAUT', 
                link: '/profilSummary',
                parentId: 2,
                 roles: ['Client','Livreur'],
            },

            {
                id: 5,
                label: 'Profile', 
                link: '/profil',
                parentId: 2,
                roles: ['Administrateur', 'Client','Livreur'],
            },
             {
                id: 6,
                label: 'Modifier Profile', 
                link: '/profilEdit',
                parentId: 2,
                roles: ['Administrateur', 'Client','Livreur'],
            },
            
           
        ]
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 8,
        label: 'APPLICATIONS', 
        isTitle: true
    },
    
    

    {
        id: 12,
        label: 'E-COMMERCE', 
        icon: 'bx-store',
         roles: ['Administrateur', 'Client'],
        subItems: [
            {
                id: 21,
                label: 'Produits', 
                subItems: [
                    {
                        id: 22,
                        label: 'Ajouter un Produit', 
                        link: '/ecommerce/add-product',
                        parentId: 21,
                         roles: ['Administrateur'],
                    },
                    {
                        id: 23,
                        label: 'Liste des Produits', 
                        link: '/ecommerce/products',
                        parentId: 21,
                         roles: ['Client'],
                    },
                      {
                        id: 23,
                        label: 'Modifier  Produit', 
                        link: '/ecommerce/editproduct',
                        parentId: 21,
                         roles: ['Administrateur'],
                    },
                  
                ]
            },
            {
                id: 25,
                label: 'Catégories', 
                link: '/ecommerce/categories',
                parentId: 12,
                roles: ['Administrateur'],
            },
            {
                id: 28,
                label: 'Commandes', 
                link: '/ecommerce/orders',
                parentId: 12,
                 roles: ['Administrateur'],
            },
            {
                id: 30,
                label: 'Livreurs',
                link :'/ecommerce/supplier',
                roles: ['Administrateur'],
            },
            {
                id: 33,
                label: 'Clients', 
                link: '/ecommerce/customers',
                roles: ['Administrateur'],
                    
             
            },
            {
                id: 31,
                label: 'Panier', 
                link: '/ecommerce/cart',
                parentId: 12,
                 roles: ['Client'],
            },
           
        ]
    },
    {
        id: 37,
        label: 'FACTURES', 
        icon: 'bx-receipt',
        roles: ['Client'],
        subItems: [
            {
                id: 38,
                label: 'Liste des Factures',
                link: '/invoices/list',
                parentId: 37,
                 roles: ['Client'],
            },
          
        ]
    },
    {
        id: 141,
        label: 'RECLAMATIONS', 
        icon: 'bx-chat',
         roles: ['Administrateur', 'Client','Livreur'],
        subItems: [
            {
                id: 143,
                label: 'Passer reclamation', 
                link: '/ecommerce/complaints',
                parentId: 141,
                 roles: ['Administrateur','Client','Livreur'],
            },
            {
                id: 144,
                label: 'Gestion reclamations', 
                link: '/ecommerce/listcomplaints',
                parentId: 141,
                 roles: ['Administrateur'],
            },
        ]
    },
    {
        id: 142,
        label: 'EVALUATION', 
        icon: 'bx-chat',
         roles: ['Administrateur', 'Client'],
        subItems: [
            {
                id: 143,
                label: 'Evaluer Service', 
                link: '/ecommerce/evaluation',
                parentId: 142,
                roles: ['Client'],
            },
            {
                id: 144,
                label: 'Statistiques concernant l\'evaluation', 
                link: '/ecommerce/evaluationStats',
                parentId: 142,
                 roles: ['Administrateur'],
            },
        ]
    },
    {
        id: 143,
        label: 'ACCIDENTS', 
        icon: 'bx-chat',
         roles: ['Administrateur','Livreur'],
        subItems: [
            {
                id: 143,
                label: 'Signaler Accident', 
                link: 'ecommerce/repportAccident',
                parentId: 143,
                 roles: ['Livreur'],
            },
            {
                id: 144,
                label: ' Consulter Accident', 
                link: 'ecommerce/listaccidents',
                parentId: 143,
                 roles: ['Administrateur'],
            },
        ]
    },
     
   
    {
        id: 66,
        label: 'PAGES', 
        isTitle: true
    },
    {
        id: 130,
        icon: 'bxs-bar-chart-alt-2',
        label: 'GRAPHIQUES', 
         roles: ['Administrateur'],
        subItems: [
            {
                id: 131,
                label: 'Statistiques', 
                link: '/charts/stats',
                parentId: 130,
                 roles: ['Administrateur'],
            },
          
        ]
    },
   
    {
        id: 140,
        label: 'Suivre Livraison',
        icon: 'bx-map',
         roles: ['Client','Livreur','Administrateur'],
        subItems: [
            {
                id: 142,
                label: 'Livreur Cart', 
                link: '/maps/livreur',
                parentId: 140,
                 roles: ['Livreur'],
            },
             {
                id: 143,
                label: 'Suivre ma livraison', 
                link: '/maps/suivi-livreur/:id',
                parentId: 140,
                 roles: ['Client'],
            },
             {
                id: 144,
                label: 'Suivre livraisons', 
                link: '/maps/admin-suivi',
                parentId: 140,
                 roles: ['Administrateur'],
            },
        ]
    },
    {
        id: 150,
        label: 'Livraison', 
        icon: 'bx-receipt',
         roles: ['Administrateur','Livreur'],
        subItems: [
            {
                id: 143,
                label: 'AdminAttribution',
                link: '/livraison/adminAttribution',
                parentId: 150,
                roles: ['Administrateur'],
            },
          
            {
                id: 145,
                label: 'Consulter Commande',
                link: '/livraison/livreurAcceptRefuse',
                parentId: 150,
                 roles: ['Livreur'],
            },
           
          
        ]
        
    },
 
    
];

