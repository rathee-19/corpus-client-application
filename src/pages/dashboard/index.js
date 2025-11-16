import { jsx as _jsx } from "react/jsx-runtime";
// src/pages/dashboard/index.tsx
import { useState } from 'react';
import ContentSelector from './contentSelector';
import UploadForm from './uploadForm';
const DashBoardPage = () => {
    const [selected, setSelected] = useState(null);
    return (_jsx("div", { children: _jsx("div", { style: { padding: 20 }, children: !selected ? (_jsx(ContentSelector, { onSelect: t => setSelected(t) }, void 0)) : (_jsx(UploadForm, { mediaType: selected, onDone: (record) => {
                    console.log('record created', record);
                    setSelected(null);
                }, onCancel: () => setSelected(null) }, void 0)) }, void 0) }, void 0));
};
export default DashBoardPage;
