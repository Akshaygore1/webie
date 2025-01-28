import { X, FileCode, FileJson, FileText } from "lucide-react";

type Tab = {
  id: string;
  name: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab?: string;
  onClose: (id: string) => void;
  onSelect: (id: string) => void;
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "tsx":
    case "ts":
    case "jsx":
    case "js":
      return <FileCode size={14} className="shrink-0" />;
    case "json":
      return <FileJson size={14} className="shrink-0" />;
    default:
      return <FileText size={14} className="shrink-0" />;
  }
};

const Tabs = ({ tabs, activeTab, onClose, onSelect }: TabsProps) => {
  return (
    <div className="flex gap-2">
      {tabs.length ? (
        tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-[#2d2d2d] group ${
              activeTab === tab.id ? "bg-[#1e1e1e]" : "bg-black"
            }`}
            onClick={() => onSelect(tab.id)}
          >
            {getFileIcon(tab.name)}
            <span className="text-sm text-[#cccccc]">{tab.name}</span>
            {activeTab === tab.id ? (
              <button
                className="p-1 hover:bg-[#444653] rounded-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
              >
                <X size={14} />
              </button>
            ) : (
              <button
                className="p-1 hover:bg-[#444653] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tabs;
