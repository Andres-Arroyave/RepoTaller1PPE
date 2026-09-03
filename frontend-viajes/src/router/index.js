import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../services/auth.service';
import PaquetesView from '../views/PaquetesView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PaqueteFormView from '../views/PaqueteFormView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PaquetesView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/paquetes/crear',
    name: 'CrearPaquete',
    component: PaqueteFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/paquetes/editar/:id',
    name: 'EditarPaquete',
    component: PaqueteFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard de Vue Router (Requerimiento #13)
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
