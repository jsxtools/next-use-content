# next-mdx-content

```sh
npm install github:jsxtools/next-use-content
```

## Usage

From a file:

```tsx
import { createMDXContentFromFile } from 'next-mdx-content/server';
import { useMDXContent, MDXContentProps } from 'next-mdx-content/client';

export default function Page({ mdx: MDXContentProps }) {
  const MDXContent = useMDXContent(mdx, components);

  return <MDXContent />
}

export async function getStaticProps() {
  const mdx = await createMDXContentFromFile('/path/to/file.mdx', {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return { props: { mdx } };
}
```

From a string:

```tsx
import { createMDXContent } from 'next-mdx-content/server';
import { useMDXContent, MDXContentProps } from 'next-mdx-content/client';

export default function Page({ mdx: MDXContentProps }) {
  const MDXContent = useMDXContent(mdx, components);

  return <MDXContent />
}

export async function getStaticProps() {
  const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

  const mdx = await createMDXContent(mdxContents, {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return { props: { mdx } };
}
```

Return only the frontmatter data from a file:

```tsx
import { readMDXDataFromFileSync } from 'next-mdx-content/server';
// import { readMDXDataFromFile } from 'next-mdx-content/server';

const data = readMDXDataFromFileSync('/path/to/file.mdx')

// Object { "title": "Welcome aboard!" }
```


Return only the frontmatter data from a string:

```tsx
import { readMDXDataFrom } from 'next-mdx-content/server';

const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

const data = readMDXDataFrom(mdxContents)

// Object { "title": "Welcome aboard!" }
```
