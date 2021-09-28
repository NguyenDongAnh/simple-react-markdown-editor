import React, { useState, useEffect, useContext } from 'react'
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

import CodeMirrorContext from '../context/CodeMirrorContext';
import { lowlight } from 'lowlight';
import { toHtml } from 'hast-util-to-html';
import parseReact from 'html-react-parser';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from '@iconify/react';

const Preview = (props) => {
    const editor = useContext(CodeMirrorContext)
    const [content, setContent] = useState('');
    useEffect(() => {
        const renderContent = () => {
            setContent(editor.doc.getValue())
            editor.on('change', (editor) => {
                setTimeout(() => { setContent(editor.doc.getValue()) })
            })
        }
        if (editor) {
            renderContent();
        }

        return () => {

        }
    }, [editor])
    return (
        <div className="preview">
            <div className="markdown-body">
                <ReactMarkdown
                    {...props}
                    children={content}
                    remarkPlugins={[remarkGFM, remarkMath]}
                    // rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { ignoreMissing: true, subset: true }]]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                    components={{
                        code({ node, children, inline, className, ...props }) {
                            if (!inline) {
                                const tree = lowlight.highlightAuto(children[0])
                                return (
                                    <>
                                        {children ? (
                                            <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                                                <div className="clipboard" onClick={
                                                    (e) => {
                                                        e.target.classList.add("tooltipped");
                                                        setTimeout(() => {
                                                            e.target.classList.remove("tooltipped");
                                                        }, 2000)
                                                    }
                                                }>
                                                    <Icon icon="bx:bxs-copy" />

                                                </div>
                                            </CopyToClipboard>) : ""}
                                        <code className={"hljs " + className} {...props}>
                                            {parseReact(toHtml(tree))}
                                        </code>
                                    </>
                                )
                            }
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Preview
