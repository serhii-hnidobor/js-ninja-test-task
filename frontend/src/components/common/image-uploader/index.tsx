import { useState } from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@dropzone-ui/react';

interface Props {
  onFileSelect: (files: ExtFile[]) => void;
  accept?: string;
  maxFileSize?: number;
  maxFiles?: number;
}

export default function ({ onFileSelect, maxFiles, maxFileSize, accept }: Props) {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
    onFileSelect(incommingFiles);
  };

  return (
    <Dropzone onChange={updateFiles} value={files} maxFiles={maxFiles} maxFileSize={maxFileSize} accept={accept}>
      {files.map((file) => (
        <FileMosaic {...file} key={file.id} preview />
      ))}
    </Dropzone>
  );
}
