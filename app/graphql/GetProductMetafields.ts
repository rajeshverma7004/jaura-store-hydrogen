// export const GET_PRODUCT_METAFIELDS = `#graphql
//   query GetProductMetafields($id: ID!) {
//     product(id: $id) {
//       id
//       title
//       metafields(first: 20) {
//         edges {
//           node {
//             key
//             value
//           }
//         }
//       }
//     }
//   }
// `;



import {gql} from 'graphql-tag';

export const GET_PRODUCT_METAFIELDS = gql`
  query GetProductMetafields($id: ID!) {
    product(id: $id) {
      id
      title
      metafields(first: 20) {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`;
