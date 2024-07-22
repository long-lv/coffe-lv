import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const MyEditor = ({placeholder,height,onChange}) => {
  const [content, setContent] = useState('');
  const handleChange = (content) => {
    setContent(content);
    onChange(content);
  };

  return (
    <div>
      <SunEditor
        placeholder={placeholder}
        height={height}
        setOptions={{
          buttonList: [
            ['formatBlock', 'font', 'fontSize', 'fontColor', 'bold', 'underline', 'italic'],
            ['align', 'horizontalRule', 'list', 'table'],
            ['link', 'image', 'video'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['undo', 'redo', 'removeFormat']
          ]
        }}
        onChange={handleChange}
        setContents={content}
      />
    </div>
  );
};

export default MyEditor;