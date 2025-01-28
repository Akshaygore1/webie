import { Folder, Search } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FileExplorer from "./components/file-explorer";
import CodeEditor from "./components/code-editor";
import Tabs from "./components/editor-tabs";
import { useState } from "react";

function App() {
  const [tabs, setTabs] = useState([
    { id: "1", name: "App.tsx" },
    { id: "2", name: "index.tsx" },
  ]);
  const [activeTab, setActiveTab] = useState("1");

  const handleCloseTab = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[0]?.id || "");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
        {/* Top Bar */}
        <div className="h-12 bg-primary flex items-center px-4">
          <div className="text-[#cccccc] text-sm">Web IDE</div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Icon Sidebar */}
          <div className="w-10 bg-primary flex flex-col items-center ">
            <div className="p-2 text-primary text-white hover:bg-[#444653] cursor-pointer rounded-md">
              <Folder width={16} height={16} />
            </div>
            <div className="p-2 text-primary text-white hover:bg-[#444653] cursor-pointer mt-2 rounded-md">
              <Search width={16} height={16} />
            </div>
          </div>

          <div className="bg-secondary w-full h-full">
            <PanelGroup direction="horizontal">
              <Panel defaultSize={20} minSize={15}>
                <div className="h-full bg-black rounded-md">
                  <FileExplorer />
                </div>
              </Panel>

              <PanelResizeHandle className="w-2" />

              {/* Editor and Terminal Stack */}
              <Panel defaultSize={80}>
                <PanelGroup direction="vertical">
                  {/* Editor Area */}
                  <Panel defaultSize={70} minSize={30}>
                    <div className="h-full bg-black rounded-md ">
                      <div>
                        <div className="text-sm p-2">
                          <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onClose={handleCloseTab}
                            onSelect={setActiveTab}
                          />
                        </div>
                      </div>
                      <CodeEditor />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="h-2" />

                  {/* Terminal Area */}
                  <Panel defaultSize={30} minSize={15}>
                    <div className="h-full bg-black p-2 rounded-md">
                      <div className="p-2 text-[#cccccc] font-mono text-sm">
                        Terminal
                      </div>
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>

        <footer className="bg-primary h-6 flex items-center justify-between px-4 py-2 text-xs text-[#8c8c8c]">
          <div className="flex items-center gap-2">
            <span>© 2023 Web IDE</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hover:text-white cursor-pointer">Feedback</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
