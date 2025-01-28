import { Editor, Monaco } from "@monaco-editor/react";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { MonacoBinding } from "y-monaco";
// import { useEffect, useRef } from "react";
// import type * as monaco from "monaco-editor";

const CodeEditor = () => {
  // const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // const docRef = useRef<Y.Doc | null>(null);
  // const wsProviderRef = useRef<WebsocketProvider | null>(null);
  // const monacoBindingRef = useRef<MonacoBinding | null>(null);

  // useEffect(() => {
  //   return () => {
  //     // Cleanup on component unmount
  //     wsProviderRef.current?.destroy();
  //     monacoBindingRef.current?.destroy();
  //     docRef.current?.destroy();
  //   };
  // }, []);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("my-dark-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#000000",
      },
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
    });
  };

  // const handleEditorDidMount = (
  //   editor: monaco.editor.IStandaloneCodeEditor
  // ) => {
  //   editorRef.current = editor;

  //   // Initialize YJS document
  //   const doc = new Y.Doc();
  //   docRef.current = doc;

  //   // Connect to WebSocket server
  //   const wsProvider = new WebsocketProvider(
  //     "ws://localhost:1234",
  //     "monaco-demo",
  //     doc
  //   );
  //   wsProviderRef.current = wsProvider;

  //   // Get the shared text type from YJS
  //   const ytext = doc.getText("monaco");

  //   // Get Monaco editor model
  //   const model = editor.getModel();
  //   if (!model) {
  //     console.error("Editor model not found");
  //     return;
  //   }

  //   // Bind YJS to Monaco
  //   monacoBindingRef.current = new MonacoBinding(
  //     ytext,
  //     model,
  //     new Set([editor]),
  //     wsProvider.awareness
  //   );
  // };

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      defaultValue={`const App: React.FC = () => {\n  return <div>Hello TypeScript</div>;\n}`}
      beforeMount={handleEditorWillMount}
      // onMount={handleEditorDidMount}
      theme="my-dark-theme"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontFamily: "JetBrains Mono, monospace",
        fontLigatures: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
        padding: { top: 16, bottom: 16 },
        formatOnType: true,
        formatOnPaste: true,
        autoIndent: "full",
        quickSuggestions: {
          strings: true,
          comments: true,
          other: true,
        },
      }}
    />
  );
};

export default CodeEditor;
