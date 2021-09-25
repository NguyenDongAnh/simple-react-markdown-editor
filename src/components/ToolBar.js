import React, { useCallback, useContext } from 'react'
import CodeMirrorContext from '../context/CodeMirrorContext'
import { Icon } from '@iconify/react';


const ToolBar = ({ preview, setPreview, isSyncScroll, setIsSyncScroll, ...props }) => {

    const editor = useContext(CodeMirrorContext);

    const textFormat = useCallback(async (format) => {
        const cursor = editor.getCursor()
        const line = cursor.line
        const ch = cursor.ch
        const l = editor.getLine(line)
        const s = editor.getSelection();
        let t;
        switch (format) {
            case "bold":
                if (s) {
                    t = s.slice(0, 2) === '**' && s.slice(-2) === '**';
                    editor.replaceSelection(t ? s.slice(2, -2) : '**' + s + '**', 'around');
                } else {
                    editor.replaceRange('****', { line: line, ch: ch })
                    editor.setCursor({ line: line, ch: t ? ch - 2 : ch + 2 })
                    editor.focus()
                }
                break;
            case "italic":
                if (s) {
                    t = s.slice(0, 1) === '*' && s.slice(-1) === '*';
                    editor.replaceSelection(t ? s.slice(1, -1) : '*' + s + '*', 'around');
                } else {
                    editor.replaceRange('**', { line: line, ch: ch })
                    editor.setCursor({ line: line, ch: t ? ch - 1 : ch + 1 })
                    editor.focus()
                }
                break;
            case "strike":
                if (s) {
                    t = s.slice(0, 2) === '~~' && s.slice(-2) === '~~';
                    editor.replaceSelection(t ? s.slice(2, -2) : '~~' + s + '~~', 'around');
                } else {
                    editor.replaceRange('~~~~', { line: line, ch: ch })
                    editor.setCursor({ line: line, ch: t ? ch - 2 : ch + 2 })
                    editor.focus()
                }
                break;
            case "heading1":
                t = l.slice(0, 2) === '# '
                editor.replaceRange(t ? l.slice(2, l.length) : '# ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                editor.setCursor({ line: line, ch: t ? ch - 2 : ch + 2 })
                editor.focus()
                break;
            case "heading2":
                t = l.slice(0, 3) === '## '
                editor.replaceRange(t ? l.slice(3, l.length) : '## ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                editor.setCursor({ line: line, ch: t ? ch - 3 : ch + 3 })
                editor.focus()
                break;
            case "heading3":
                t = l.slice(0, 4) === '### '
                editor.replaceRange(t ? l.slice(4, l.length) : '### ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                editor.setCursor({ line: line, ch: t ? ch - 4 : ch + 4 })
                editor.focus()
                break;
            case "heading4":
                t = l.slice(0, 5) === '#### '
                editor.replaceRange(t ? l.slice(5, l.length) : '#### ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                editor.setCursor({ line: line, ch: t ? ch - 5 : ch + 5 })
                editor.focus()
                break;
            case "quote":
                t = l.slice(0, 2) === '> '
                editor.replaceRange(t ? l.slice(2, l.length).trim() : '> ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                editor.setCursor({ line: line, ch: t ? ch - 2 : ch + 2 })
                editor.focus()
                break;
            case "code":
                if (s) {
                    t = s.slice(0, 1) === '`' || (s.slice(0, 1) === '`' && s.slice(0, -1) === '`')
                    editor.replaceRange(t ? l.slice(2, l.length) : '> ' + l, { line: line, ch: 0 }, { line: line, ch: l.length });
                }
                break;
            default:
                break;
        }
    }, [editor])

    return (
        <div className="toolbar">
            <span className="toolbar__button" onClick={() => {
                editor.undo();
            }}>
                <Icon icon="ic:baseline-undo" width="20" />
            </span>
            <span className="toolbar__button" onClick={() => {
                editor.redo()
            }}>
                <Icon icon="ic:baseline-redo" width="20" />
            </span>
            <span className="toolbar__button" title="Bold" onClick={() => { textFormat("bold") }}>
                <Icon icon="ant-design:bold-outlined" width="20" />
            </span>
            <span className="toolbar__button" title="Italic" onClick={() => { textFormat("italic") }}>
                <Icon icon="ant-design:italic-outlined" width="20" />
            </span>
            <span className="toolbar__button" title="Strike" onClick={() => { textFormat("strike") }}>
                <Icon icon="ant-design:strikethrough-outlined" width="20" />
            </span>
            <span className="toolbar__button" title="Heading1" onClick={() => { textFormat("heading1") }}>
                <Icon icon="ci:heading-h1" width="20" />
            </span>
            <span className="toolbar__button" title="Heading2" onClick={() => { textFormat("heading2") }}>
                <Icon icon="ci:heading-h2" width="20" />
            </span>
            <span className="toolbar__button" title="Heading3" onClick={() => { textFormat("heading3") }}>
                <Icon icon="ci:heading-h3" width="20" />
            </span>
            <span className="toolbar__button" title="Heading4" onClick={() => { textFormat("heading4") }}>
                <Icon icon="ci:heading-h4" width="20" />
            </span>
            <span className="toolbar__button" title="Quote" onClick={() => { textFormat("quote") }}>
                <Icon icon="fontisto:quote-right" width="15" />
            </span>
            <span className="toolbar__button">
                <Icon icon="entypo:code" width="20" />
            </span>
            <span className="toolbar__button">
                <Icon icon="bi:link-45deg" width="20" />
            </span>
            <span className="toolbar__button">
                <Icon icon="bi:card-image" width="20" />
            </span>
            <span className="toolbar__button" title="Preview" onClick={() => { setPreview(!preview) }}>
                {preview ? <Icon icon="icon-park-outline:preview-open" width="20" />
                    : <Icon icon="icon-park-outline:preview-close-one" width="20" />}
            </span>
            {preview ? <span className="toolbar__button" title="Sync Scroll" onClick={() => { setIsSyncScroll(!isSyncScroll) }}>
                {isSyncScroll ? <Icon icon="fluent:arrow-sync-16-filled" width="20" />
                    : <Icon icon="fluent:arrow-sync-off-16-filled" width="20" />}
            </span> : ""}
            <span className="toolbar__button" >
                <Icon icon="bi:file-earmark-arrow-down-fill" width="20" />
            </span>
        </div>
    )
}

export default ToolBar
