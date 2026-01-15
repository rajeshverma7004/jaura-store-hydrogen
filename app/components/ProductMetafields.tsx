// import React from "react";

// type Metafield = {
//   node: {
//     key: string;
//     value: string;
//   };
// };

// interface ProductMetafieldsProps {
//   metafields: Metafield[];
// }

// export function ProductMetafields({ metafields }: ProductMetafieldsProps) {
//   if (!metafields || metafields.length === 0) {
//     return <p className="text-gray-500">No metafields available.</p>;
//   }

//   return (
//     <div className="p-4 border rounded-lg shadow-sm bg-white">
//       <h2 className="text-lg font-semibold mb-2">Product Metafields</h2>
//       <ul className="space-y-1">
//         {metafields.map((field) => (
//           <li key={field.node.key} className="text-sm text-gray-700">
//             <span className="font-medium">{field.node.key}:</span>{" "}
//             {field.node.value}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





interface ProductMetafieldsProps {
  metafields: any[];
}

export default function ProductMetafields({metafields}: ProductMetafieldsProps) {
  if (!metafields || metafields.length === 0) return null;

  return (
    <div className="p-4 border rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-3">Product Metafields</h2>
      <ul className="space-y-2">
        {metafields.map(({node}: any, index: number) => (
          <li key={index} className="text-sm">
            <span className="font-medium">{node.key}:</span> {node.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
