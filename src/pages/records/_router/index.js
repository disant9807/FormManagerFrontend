
export default {
  name: 'Form',
  path: '/',
  component: () => import('@/pages/records/index'),
  meta: { title: 'Звенья' },
  children: [
    {
      path: '/',
      name: 'dataRecords',
      component: () => import('@/pages/records/_components/List'),
      children: [
        {
          path: 'add',
          name: 'CardAdd',
          component: () => import('@/pages/records/_components/Card'),
          meta: { title: 'Пользователи', add: true }
        },
        {
          path: ':id',
          name: 'Card',
          component: () => import('@/pages/records/_components/Card'),
          meta: { title: 'Пользователи', add: false},
          props: true
        }
      ]
    }
  ]
}
