# next-mdx-content

```sh
npm install github:jsxtools/next-use-content
```

## Usage

From a file:

```tsx
import { createMDXContentFromFile } from 'next-mdx-content/server';
import { useMDXContent, MDXContentProps } from 'next-mdx-content/client';

export default function Page(props: MDXContentProps) {
  const MDXContent = useMDXContent(props, components);

  return <MDXContent />
}

export async function getStaticProps() {
  const props = await createMDXContentFromFile('/path/to/file.mdx', {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return { props };
}
```

From a string:

```tsx
import { createMDXContent } from 'next-mdx-content/server';
import { useMDXContent, MDXContentProps } from 'next-mdx-content/client';

export default function Page(props: MDXContentProps) {
  const MDXContent = useMDXContent(props, components);

  return <MDXContent />
}

export async function getStaticProps() {
  const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

  const props = await createMDXContent(mdxContents, {
    components: {},
    remarkPlugins: [],
    rehypePlugins: []
  });

  return { props };
}
```

Return only the frontmatter data:

```tsx
import { readMDXDataFrom } from 'next-mdx-content/server';

const mdxContents = '---\ntitle: Welcome aboard!\n---\n\n# {title}'

const data = readMDXDataFrom(mdxContents)

// Object { "title": "Welcome aboard!" }
```
