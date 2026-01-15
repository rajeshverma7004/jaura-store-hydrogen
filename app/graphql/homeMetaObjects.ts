export const GET_HOME_META_OBJECTS = `#graphql
  query GetHomeMetaObjects {
    metaobjects(type: "home_meta_object", first: 10) {
      nodes {
        id
        handle
        type
        fields {
          key
          value
          reference {
          ... on MediaImage {
            image {
              altText
              url
            }
          }
        }
        }
      }
    }
  }
`;