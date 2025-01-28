import { useState } from "react";
import { File, Folder, ChevronRight, ChevronDown } from "lucide-react";

type FileItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
};

const dummyData: FileItem[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "file-explorer.tsx", type: "file" },
          { id: "4", name: "editor.tsx", type: "file" },
        ],
      },
      { id: "5", name: "App.tsx", type: "file" },
      { id: "6", name: "index.tsx", type: "file" },
    ],
  },
  {
    id: "7",
    name: "public",
    type: "folder",
    children: [
      { id: "8", name: "index.html", type: "file" },
      { id: "9", name: "favicon.ico", type: "file" },
    ],
  },
];

const FileExplorerItem = ({ item }: { item: FileItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center hover:bg-[#37373d] py-1 cursor-pointer text-[#cccccc] group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center w-full px-4">
          {item.type === "folder" ? (
            <span className="mr-1 shrink-0">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          ) : (
            <span className="mr-2 shrink-0"></span>
          )}
          {item.type === "folder" ? (
            <Folder size={16} className="mr-2 shrink-0" />
          ) : (
            <File size={16} className="mr-2 shrink-0" />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </div>
      </div>
      {isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child) => (
            <FileExplorerItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  return (
    <div className="h-[90vh] w-full flex flex-col">
      <div className="p-2">
        <div className="text-xs uppercase font-semibold">Explorer</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {dummyData.map((item) => (
          <FileExplorerItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
