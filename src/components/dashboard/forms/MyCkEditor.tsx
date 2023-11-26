// components/MyCKEditor.tsx
import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface MyCKEditorProps {
  onChange: (data: string) => void;
}

const MyCKEditor = ({ onChange }: MyCKEditorProps) => {
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  };

  return <CKEditor editor={ClassicEditor} onChange={handleEditorChange} />;
};

export default MyCKEditor;
