import Vue from 'vue'
import Router from 'vue-router'

// Layouts
import Layout from '@/components/Layout/Layout'
import LayoutHorizontal from '@/components/Layout/LayoutHorizontal'
import LayoutPage from '@/components/Layout/LayoutPage'

// Occurrences
const OccurrencesIndex = () => import('@/views/Occurrences/Index.vue')
const OccurrencesList = () => import('@/views/Occurrences/List.vue')
const OccurrencesSingle = () => import('@/views/Occurrences/Single.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/home'
    },
        // Admin Pages
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/home',
                    component: OccurrencesIndex
                }, {
                    path: '/occurrences',
                    component: OccurrencesList,
                }, {
                    path: '/occurrences/:id',
                    component: OccurrencesSingle,
                }
            ]
        },
        // Not found route
        {
            path: '*',
            redirect: '/'
        }
    ]
})