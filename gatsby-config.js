const colors = require('./src/constants/colors');
// console.log(colors);

module.exports = {
  siteMetadata: {
    // title: 'Gatsby Default Starter',
  },
  plugins: [
    // SEE: https://next.gatsbyjs.org/tutorial/part-eight/#-using-gatsby-plugin-manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Brian Patrick Kemper",
        short_name: "Brian Kemper",
        start_url: "/",
        background_color: colors.DARK_BLUE,
        theme_color: colors.DARK_BLUE,
        display: "minimal-ui",
        icon: "src/images/logo.png"
      }
    },
    // SEE: https://next.gatsbyjs.org/tutorial/part-eight/#-using-gatsby-plugin-offline
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T4N486D',
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/logo.png',
        injectHTML: true,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ],
}
