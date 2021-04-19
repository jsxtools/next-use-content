# next-mdx-content

```sh
npm install next-use-content
```

## Usage

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
