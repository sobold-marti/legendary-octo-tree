import Navigation from './navigation.js';
import { gql } from "@apollo/client";
import client from '../../../lib/apolloClient.js';

const GET_NAVIGATION_MENU = gql`
  query GetNavigationMenu {
    siteLogo
    menu(id: "header-navigation", idType: SLUG) {
      menuItems {
        nodes {
          id
          label
          url
        }
      }
    }
  }
`;

export default async function NavigationWrapper() {
    const { data } = await client.query({ query: GET_NAVIGATION_MENU });
    const siteLogo = data?.siteLogo || '/fallback-logo.png';
    const menuItems = data?.menu?.menuItems?.nodes || [];
  
    return <Navigation siteLogo={siteLogo} menuItems={menuItems} />;
}
