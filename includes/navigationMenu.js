export default () => ({
    menus: [
        {title: 'About me', icon: 'icon-user', link: '#about', newTab: false, ext: false},
        {title: 'Portfolio', icon: 'icon-briefcase', link: '#portfolio', newTab: false, ext: false},
        {title: 'Contact', icon: 'icon-mail-alt', link: '#contact', newTab: false, ext: false},
        {title: 'GitHub', icon: 'icon-github-circled', link: 'https://github.com/sdmarmon', newTab: true, ext: true},
        {title: 'LinkedIn', icon: 'icon-linkedin-squared', link: 'https://www.linkedin.com/in/sylvain-d-marmon', newTab: true, ext:true},
        {title: 'Resume', icon: 'icon-file-pdf', link: 'assets/Resume_Duhau-Marmon.pdf', newTab: true, ext: false}
    ]
})