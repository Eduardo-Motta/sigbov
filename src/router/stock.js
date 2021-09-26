export default [
  { path: 'stock/product', component: () => import('pages/stock/product/Index.vue') },
  { path: 'stock/product-group', component: () => import('pages/stock/product_group/Index.vue') },
  { path: 'stock/warehouse', component: () => import('pages/stock/warehouse/Index.vue') }
]
