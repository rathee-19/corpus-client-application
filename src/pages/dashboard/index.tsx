// src/pages/dashboard/index.tsx
import React, { useState } from 'react';
import ContentSelector, { ContentType } from './contentSelector';
import UploadForm from './uploadForm';
import HorizontalTools from './HorizontalTools';

const DashBoardPage: React.FC = () => {
  const [selected, setSelected] = useState<ContentType | null>(null);

  return (
    <div>
      {/* <HorizontalTools /> */}
      <div style={{ padding: 20 }}>
        {!selected ? (
          <ContentSelector onSelect={t => setSelected(t)} />
        ) : (
          <UploadForm
            mediaType={selected}
            onDone={(record) => {
              console.log('record created', record);
              setSelected(null);
            }}
            onCancel={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
