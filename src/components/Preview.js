import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGFM from "remark-gfm";
// import remarkSlug from "remark-slug";
// import remarkToc from "remark-toc"
import rehypeRaw from "rehype-raw";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import 'katex/dist/katex.min.css';
import rehypeKatex from "rehype-katex";
// import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'

const Preview = ({ markdown, ...props }) => {
    return (
        <div className="preview">
            <div className="markdown-body">
                <ReactMarkdown
                    {...props}
                    children={markdown}
                    remarkPlugins={[remarkGFM, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { ignoreMissing: true, subset: true }]]}
                />
            </div>
        </div>
    )
}

export default Preview
