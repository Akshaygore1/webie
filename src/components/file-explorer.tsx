import { useState } from "react";
import { File, Folder, ChevronRight, ChevronDown } from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

interface FileExplorerItemProps {
  item: FileItem;
  onFileSelect?: (item: FileItem) => void;
}

const FileExplorerItem: React.FC<FileExplorerItemProps> = ({
  item,
  onFileSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    } else if (onFileSelect) {
      onFileSelect(item);
    }
  };

  return (
    <div>
      <div
        className="flex items-center hover:bg-[#37373d] py-1 cursor-pointer text-[#cccccc] group"
        onClick={handleClick}
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
            <FileExplorerItem
              key={child.id}
              item={child}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FileExplorerProps {
  data?: FileItem[];
  onFileSelect?: (item: FileItem) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  data = [],
  onFileSelect,
}) => {
  return (
    <div className="h-[90vh] w-full flex flex-col">
      <div className="p-2">
        <div className="text-xs uppercase font-semibold">Explorer</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {data.map((item) => (
          <FileExplorerItem
            key={item.id}
            item={item}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
