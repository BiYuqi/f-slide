module.exports = {
  title: 'MDPPT',
  description: 'A framework for easily creating beautiful presentations using Markdown.',
  base: '/mdppt-docs/',
  port: 9091,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    navBar: false,
    repo: 'https://github.com/ftbjs/mdppt',
    editLinks: false,
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: genEssentialsSidebar()
        }
        // {
        //   title: '进阶',
        //   collapsable: false,
        //   children: genAdvancedSidebar('/zh')
        // },
        // {
        //   title: '其它',
        //   collapsable: false,
        //   children: [
        //     '/zh/guide/other/faq.md',
        //     '/zh/guide/other/release-notes.md'
        //   ]
        // }
      ]
    }
  }
}

function genEssentialsSidebar(type = '') {
  const mapArr = ['/guide/', '/guide/install/install.md']
  return mapArr.map(i => {
    return type + i
  })
}
