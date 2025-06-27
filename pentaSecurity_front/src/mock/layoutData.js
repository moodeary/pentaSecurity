export const sideMenu = [
  {
    type: 'header',
    label: '과제',
  },
  {
    type: 'expansion',
    icon: 'calendar_month',
    label: '게시글 관리',
    key: 'PostList',
    children: [
      {
        type: 'expansion',
        icon: 'celebration',
        label: '무한스크롤',
        key: 'scroll',
        to: '/scroll',
      },
      {
        type: 'expansion',
        icon: 'emoji_events',
        label: '페이징',
        key: 'page',
        to: '/page',
      },
    ],
  },
]
