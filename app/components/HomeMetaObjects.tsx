//  import React from "react";

type Field = {
  reference: any;
  key: string;
  value: string;
};

type MetaObject = {
  id: string;
  handle: string;
  type: string;
  fields: Field[];
};

export default function HomeMetaObjects({ metaObjects }: { metaObjects: MetaObject[] }) {
  if (!metaObjects?.length) {
    return <p>No home meta objects found.</p>;
  }
  return (
  <div className="bg-gray-900">
    <section className="mt-10 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          {["heading", "sub_heading", "description", "button_url"].map((fieldKey) => {
            const field = metaObjects[0].fields.find(f => f.key === fieldKey);
            if (!field) return null;
            switch (field.key) {
              case "heading":
                return <h1 key={field.key} className="text-white font-bold text-4xl xl:text-5xl">{field.value}</h1>;
              case "sub_heading":
                return <h3 key={field.key} className="text-indigo-400 text-xl">{field.value}</h3>;
              case "description":
                return <p key={field.key} className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">{field.value}</p>;
              case "button_url": {
                // parse JSON string
                const parsed = JSON.parse(field.value) as {text: string; url: string};
                return (
                  <div key={field.key} className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                  <a
                    href={parsed.url}
                    className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
                  >
                    {parsed.text}
                  </a>
                  </div>
                );
              }
              default:
                return null;
            }
          })}
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          {metaObjects[0].fields.map((field) => {
        switch (field.key) {
          case "hero_image":
            return (
              <img
                key={field.key}
                src={field.reference?.image?.url ?? ""}
                alt={field.reference?.image?.altText ?? "Hero image"}
                className="w-full mx-auto sm:w-10/12  lg:w-full"
              />
            );
          default:
            return null;
        }
      })}
        </div>
    </section>
</div>
  );
}