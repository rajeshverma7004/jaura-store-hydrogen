import { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { GET_HOME_META_OBJECTS } from "~/graphql/homeMetaObjects";

export async function loadHomeMetaObjects({ context }: LoaderFunctionArgs) {
  const response = await context.storefront.query(GET_HOME_META_OBJECTS);

  // Handle missing data gracefully
  if (!response || !response.metaobjects) {
    console.warn("No metaobjects found:", response);
    return [];
  }

  return response.metaobjects.nodes ?? [];
}
