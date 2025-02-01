import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FileExplorer from "./components/file-explorer";
import CodeEditor from "./components/code-editor";
import Tabs from "./components/editor-tabs";
import { useEffect, useState } from "react";
import Header from "./components/header";
import { fileData } from "../mockData";
import { Tab } from "./lib/types";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import { WebContainer } from "@webcontainer/api";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", name: "App.tsx" },
    { id: "2", name: "index.tsx" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [terminal, setTerminal] = useState<Terminal | null>(null);

  const handleCloseTab = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[0]?.id || "");
    }
  };

  useEffect(() => {
    let webcontainerInstance: WebContainer | null = null;
    let shellProcess: {
      output: { pipeTo: (writable: WritableStream) => void };
      input: { getWriter: () => { write: (data: string) => void } };
      resize?: (dimensions: { cols: number; rows: number }) => void;
    } | null = null;

    async function startShell(terminal: Terminal) {
      shellProcess = await webcontainerInstance!.spawn("jsh", {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });

      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );

      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });

      return shellProcess;
    }

    async function installDependencies() {
      const installProcess = await webcontainerInstance!.spawn("touch", [
        "index.js",
      ]);
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal?.write(data);
          },
        })
      );
      return installProcess.exit;
    }

    async function bootWebContainer() {
      try {
        // Initialize terminal
        const term = new Terminal({
          convertEol: true,
        });
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        // Boot WebContainer
        webcontainerInstance = await WebContainer.boot();

        // Get terminal element
        const terminalEl = document.querySelector(".terminal-container");
        if (terminalEl) {
          term.open(terminalEl as HTMLElement);
          fitAddon.fit();
          setTerminal(term);

          // Start shell
          await installDependencies();
          await startShell(term);

          // Handle resize
          window.addEventListener("resize", () => {
            fitAddon.fit();
            if (shellProcess?.resize) {
              shellProcess.resize({
                cols: term.cols,
                rows: term.rows,
              });
            }
          });
        }

        setTerminalOutput("WebContainer started successfully!");
      } catch (error) {
        console.error("WebContainer boot error:", error);
        setTerminalOutput(`Error starting WebContainer: ${error}`);
      }
    }

    bootWebContainer();

    return () => {
      if (webcontainerInstance) {
        try {
          webcontainerInstance.teardown();
        } catch (error) {
          console.error("Error tearing down WebContainer:", error);
        }
      }
      if (terminal) {
        terminal.dispose();
      }
    };
  }, []);

  // In the terminal Panel section, update the content:
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
                        <div>Terminal</div>
                        <div className="terminal-container h-full" />
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
