import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    scrollBehavior() {
        return { top: 0 };
    },
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home.vue'),
        },
        // {
        //     path: '/chronic',
        //     component: Layout,
        //     children: [
        //         {
        //             path: 'list',
        //             name: 'Chronic List',
        //             component: () => import('@/views/chronic/list')
        //         },
        //         {
        //             path: 'add',
        //             name: 'Chronic Add',
        //             component: () => import('@/views/chronic/add')
        //         },
        //         {
        //             path: 'write/form/:form_uk',
        //             name: 'Chronic Form Write',
        //             component: () => import('@/views/chronic/write.form')
        //         },
        //         {
        //             path: 'write/view/:form_uk',
        //             name: 'Chronic View',
        //             component: () => import('@/views/chronic/view')
        //         }
        //     ]
    ]
});

export default router;
