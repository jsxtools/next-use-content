# next-mdx-content

**next-mdx-content** lets you load MDX content through [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) in [NextJS](https://nextjs.org).

```sh
npm install github:jsxtools/next-use-content
```

## Usage

#### From a file

```tsx
import { createMDXContentFromFile } from 'next-mdx-content/server';
import { useMDXContent, MDXData } from 'next-mdx-content/client';

export default function Page({ data: MDXData }) {
  const MDXContent = useMDXContent(data, components);

  return (
    <>
      <h1>{data.title}</h1>
      <MDXContent />
    </>
  )
}

export async function getStaticProps() {
  const data = await createMDXContentFromFile('/path/to/file.mdx', {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return {
    props: {
      data: {
        title: 'Fallback',
        ...data
      }
    }
  };
}
```

#### From a file

```tsx
import { createMDXContent } from 'next-mdx-content/server';
import { useMDXContent, MDXData } from 'next-mdx-content/client';

export default function Page({ data: MDXData }) {
  const MDXContent = useMDXContent(data, components);

  return (
    <>
      <h1>{data.title}</h1>
      <MDXContent />
    </>
  )
}

export async function getStaticProps() {
  const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

  const data = await createMDXContent(mdxContents, {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return {
    props: {
      data: {
        title: 'Fallback',
        ...data
      }
    }
  };
}
```

#### Get Frontmatter data from a file

```tsx
import { readMDXDataFromFileSync } from 'next-mdx-content/server';
// import { readMDXDataFromFile } from 'next-mdx-content/server';

const data = readMDXDataFromFileSync('/path/to/file.mdx')
```

#### Get Frontmatter data from a string

```tsx
import { readMDXDataFrom } from 'next-mdx-content/server';

const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

const data = readMDXDataFrom(mdxContents)

// Object { "title": "Welcome aboard!" }
```

## How it works

This package is a remix of [@mdx-js/mdx](https://www.npmjs.com/package/@mdx-js/mdx).
It is changed to convert an MDX file into a [Function Component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) written in plain JavaScript using `createMDXContent`.
The serialized constructor arguments for this component are sent over as static props and reassembled by `useMDXContent`.

Additionally, [Front Matter](https://jekyllrb.com/docs/front-matter/) is
extracted from the MDX file, available as data to the application and the MDX file itself.
