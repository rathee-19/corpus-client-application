// ContentSelector.tsx
import React, { FC } from 'react';
import './contentSelector.less';

export type ContentType = 'text' | 'audio' | 'video' | 'image' | 'document';

type Item = {
  id: ContentType;
  title: string;
  subtitle: string;
  description?: string;
  color: string;
  icon: JSX.Element;
};

interface Props {
  onSelect: (t: ContentType) => void;
}

const items: Item[] = [
  {
    id: 'text',
    title: 'Text',
    subtitle: 'Type your content',
    description: 'Write text, paste content, or use rich editing tools after selecting this option.',
    color: '#6366F1',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 7h10M7 11h10M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'audio',
    title: 'Audio',
    subtitle: 'Record or upload audio',
    description: 'Record directly from your mic or upload mp3/wav files.',
    color: '#EF4444',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 9v6a3 3 0 0 0 6 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'video',
    title: 'Video',
    subtitle: 'Record or upload video',
    description: 'Capture video or upload clips; trim and preview before upload.',
    color: '#10B981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M22 8l-6 4v0l6 4V8z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'image',
    title: 'Photo',
    subtitle: 'Take or upload photos',
    description: 'Upload images or use the camera to add photos to your content.',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 11l2 2 3-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'document',
    title: 'Document',
    subtitle: 'Upload PDF / DOCX',
    description: 'Attach documents; we’ll extract text to make them searchable.',
    color: '#7C3AED',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const ContentSelector: FC<Props> = ({ onSelect }) => {
  const onCardKey = (e: React.KeyboardEvent<HTMLDivElement>, id: ContentType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div className="contentSelector-container">
      <div className="contentSelector-header">
        <h2 className="contentSelector-header .title">Create new</h2>
        <p className="contentSelector-header .lead">Choose a content type to get started</p>
      </div>

      <div className="contentSelector-grid">
        {items.map(it => (
          <div
            key={it.id}
            role="button"
            tabIndex={0}
            className={`contentSelector-card contentSelector-card--${it.id}`}
            onClick={() => onSelect(it.id)}
            onKeyDown={e => onCardKey(e, it.id)}
            aria-label={`Create ${it.title}`}
          >
            <div className="top">
            <div className="icon">
            {it.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div className="titleText">{it.title}</div>
                <div className="subText">{it.subtitle}</div>
              </div>

              <div style={{ marginLeft: 10 }}>
                <span className="pill">{it.id}</span>
              </div>
            </div>

            <div className="desc">{it.description}</div>

            <div className="footer">
              <button
                className="selectBtn"
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onSelect(it.id);
                }}
              >
                Select →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSelector;
