module.exports = {
  siteMetadata: {
    // title: `Gatsby Default Starter`,
    // description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    // author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: true,
        isUsingColorMode: true,
        portalZIndex: 40,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-root-import',
    //   options: {
    //     src: path.join(__dirname, 'src'),
    //   },
    // },
    // // see, https://next.gatsbyjs.org/tutorial/part-eight/#-using-gatsby-plugin-manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Brian Patrick Kemper',
        short_name: 'Brian Kemper',
        start_url: '/',
        background_color: '#1c2131',
        theme_color: '#1c2131',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // see, https://next.gatsbyjs.org/tutorial/part-eight/#-using-gatsby-plugin-offline
    // 'gatsby-plugin-offline',
    // see, https://www.netlify.com/blog/2018/06/28/5-pro-tips-and-plugins-for-optimizing-your-gatsby---netlify-site/
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T4N486D',
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
  ],
};
