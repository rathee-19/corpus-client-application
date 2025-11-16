import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const items = [
    { id: 'text', title: 'Text', subtitle: 'Type your content' },
    { id: 'audio', title: 'Audio', subtitle: 'Record or upload audio' },
    { id: 'video', title: 'Video', subtitle: 'Record or upload video' },
    { id: 'image', title: 'Photo', subtitle: 'Take or upload photos' },
    { id: 'document', title: 'Document', subtitle: 'Upload PDF/DOCX' },
];
const ContentSelector = ({ onSelect }) => {
    return (_jsxs("div", { style: { padding: 20 }, children: [_jsx("h2", { children: "Create new" }, void 0), _jsx("p", { children: "Choose a content type" }, void 0), _jsx("div", { style: { display: 'flex', gap: 12, flexWrap: 'wrap' }, children: items.map(it => (_jsxs("button", { onClick: () => onSelect(it.id), style: {
                        minWidth: 160,
                        padding: 16,
                        borderRadius: 8,
                        border: '1px solid #ddd',
                        background: '#fff',
                        cursor: 'pointer',
                    }, children: [_jsx("div", { style: { fontWeight: 600 }, children: it.title }, void 0), _jsx("div", { style: { fontSize: 12, color: '#666' }, children: it.subtitle }, void 0)] }, it.id))) }, void 0)] }, void 0));
};
export default ContentSelector;
