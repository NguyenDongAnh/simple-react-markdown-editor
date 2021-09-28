import React, { useState, useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import ToolBar from './ToolBar';
import Preview from './Preview';
import CodeMirrorContext from '../context/CodeMirrorContext';
import 'codemirror/theme/nord.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/php/php'
import 'codemirror/mode/yaml/yaml'

const MardownEditor = () => {
    const [preview, setPreview] = useState(true);
    const [isSyncScroll, setIsSyncScroll] = useState(true);
    const [editor, setEditor] = useState(null);

    const textArea = useRef(null)


    useEffect(() => {
        const cm = CodeMirror.fromTextArea(textArea.current, {
            lineNumbers: true,
            mode: {
                name: "gfm",
                highlightFormatting: true
            },
            theme: "nord",
            lineWrapping: true,
            tabSize: 2
        },
        );
        setEditor(cm);
        return () => {
        }
    }, [])

    useEffect(() => {
        const editorScroll = document.querySelector('.CodeMirror-vscrollbar')
        const previewScroll = document.querySelector('.preview')

        const syncScrollPosition = (scrolledPane, pane) => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrolledPane

            const scrollTopOffset = scrollHeight - clientHeight
            /* Calculate the actual pane height */
            const paneHeight = pane.scrollHeight - clientHeight
            /* Adjust the scrollTop position of it accordingly */
            if (scrollTopOffset > 0) {
                pane.scrollTop = (paneHeight * scrollTop) / scrollTopOffset
            }
        }

        const removeEvents = (leftPane, rightPane) => {
            leftPane.onscroll = null;
            if (isSyncScroll && preview)
                rightPane.onscroll = null;
        }

        const handleSyncScroll = (leftPane, rightPane) => {
            syncScrollPosition(leftPane, rightPane)
            let isSyncLeftScroll = false;
            let isSyncRightScroll = false;
            leftPane.onscroll = function () {
                if (!isSyncLeftScroll) {
                    isSyncRightScroll = true;
                    syncScrollPosition(leftPane, rightPane)
                }
                isSyncLeftScroll = false;
            }

            rightPane.onscroll = function () {
                if (!isSyncRightScroll) {
                    isSyncLeftScroll = true;
                    syncScrollPosition(rightPane, leftPane)
                }
                isSyncRightScroll = false;
            }
        }

        isSyncScroll && preview ? handleSyncScroll(editorScroll, previewScroll) : removeEvents(editorScroll, previewScroll);

        return () => {

        }

    }, [isSyncScroll, preview])

    return (
        <CodeMirrorContext.Provider value={editor}>
            <div style={{ position: "relative", height: "100%" }}>
                <ToolBar preview={preview} setPreview={setPreview} isSyncScroll={isSyncScroll} setIsSyncScroll={setIsSyncScroll} />
                <div className="layout__panel">
                    <div className="editor" style={{ maxWidth: preview ? "50%" : "100%" }}>
                        <textarea style={{ display: "none" }} ref={textArea}
                            value={
                                `# A demo of \`react-markdown\`
            
\`react-markdown\` is a markdown component for React.
            
👉 Changes are re-rendered as you type.
            
👈 Try writing some markdown on the left.
            
## Overview
            
* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins
            
## Table of contents
            
Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.
            
## Syntax highlighting
            
Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).
            
\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
            
ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`
            
Pretty neat, eh?
            
## GitHub flavored markdown (GFM)
            
For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.
            
These features **do not work by default**.
👆 Use the toggle above to add the plugin.
            
| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |
            
~~strikethrough~~
            
* [ ] task list
* [x] checked item
            
https://example.com
            
## HTML in markdown
            
⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).
            
<blockquote>
👆 Use the toggle above to add the plugin.
</blockquote>
            
## Components
            
You can pass components to change things:
            
\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'
            
ReactDOM.render(
  <ReactMarkdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr: ({node, ...props}) => <MyFancyRule {...props}/>;
  }}
  # Your markdown here
  </ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`
            
## More info?
            
Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!
            
***
            
A component by [Espen Hovlandsdal](https://espen.codes/)
`
                            }
                            readOnly
                        >
                        </textarea>
                    </div>
                    {preview ? <Preview /> : ""}
                </div>
            </div >
        </CodeMirrorContext.Provider>
    )
}

export default MardownEditor
