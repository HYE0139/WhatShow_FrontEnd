import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main.vue'
import MovieDetail from '../views/MovieDetail.vue'
import MovieSearch from '../views/MovieSearch.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/detail',
    name: 'detail',
    component: MovieDetail
  },
  {
    path: '/search',
    name: 'search',
    component: MovieSearch
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
