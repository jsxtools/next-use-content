# next-mdx-content

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
