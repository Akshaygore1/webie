import { Folder, Search } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FileExplorer from "./components/file-explorer";
import CodeEditor from "./components/code-editor";
import Tabs from "./components/editor-tabs";
import { useState } from "react";
import Header from "./components/header";
import { fileData } from "../mockData";
import { Tab } from "./lib/types";
import Footer from "./components/footer";

function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", name: "App.tsx" },
    { id: "2", name: "index.tsx" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(true);

  const handleCloseTab = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[0]?.id || "");
    }
  };

  const Sidebar = () => (
    <div className="w-10 bg-primary flex flex-col items-center">
      <div className="p-2 text-primary text-white hover:bg-[#444653] cursor-pointer rounded-md">
        <Folder width={16} height={16} />
      </div>
      <div className="p-2 text-primary text-white hover:bg-[#444653] cursor-pointer mt-2 rounded-md">
        <Search width={16} height={16} />
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
        <Header
          isTerminalVisible={isTerminalVisible}
          setIsTerminalVisible={setIsTerminalVisible}
          isFileExplorerVisible={isFileExplorerVisible}
          setIsFileExplorerVisible={setIsFileExplorerVisible}
        />

        <div className="flex flex-1">
          <Sidebar />
          <div className="bg-secondary w-full h-full">
            <PanelGroup direction="horizontal">
              <Panel
                defaultSize={20}
                minSize={15}
                className={!isFileExplorerVisible ? "hidden" : ""}
              >
                <div className="h-full bg-black rounded-md">
                  <FileExplorer data={fileData} />
                </div>
              </Panel>

              {isFileExplorerVisible && <PanelResizeHandle className="w-2" />}

              <Panel defaultSize={80}>
                <PanelGroup direction="vertical">
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
                  {isTerminalVisible && <PanelResizeHandle className="h-2" />}
                  <Panel
                    defaultSize={30}
                    minSize={15}
                    className={!isTerminalVisible ? "hidden" : ""}
                  >
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

        <Footer />
      </div>
    </div>
  );
}

export default App;
