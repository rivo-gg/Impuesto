interface TextViewerProps {
  content: string;
}

export function TextViewer({ content }: TextViewerProps) {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {content}
      </pre>
    </div>
  );
}

