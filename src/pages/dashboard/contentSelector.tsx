// src/pages/dashboard/ContentSelector.tsx
import React, { FC } from 'react';

export type ContentType = 'text' | 'audio' | 'video' | 'image' | 'document';

const items: { id: ContentType; title: string; subtitle: string }[] = [
  { id: 'text', title: 'Text', subtitle: 'Type your content' },
  { id: 'audio', title: 'Audio', subtitle: 'Record or upload audio' },
  { id: 'video', title: 'Video', subtitle: 'Record or upload video' },
  { id: 'image', title: 'Photo', subtitle: 'Take or upload photos' },
  { id: 'document', title: 'Document', subtitle: 'Upload PDF/DOCX' },
];

interface Props {
  onSelect: (t: ContentType) => void;
}

const ContentSelector: FC<Props> = ({ onSelect }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Create new</h2>
      <p>Choose a content type</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {items.map(it => (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            style={{
              minWidth: 160,
              padding: 16,
              borderRadius: 8,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600 }}>{it.title}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{it.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentSelector;
