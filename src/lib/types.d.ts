export type Tab = {
  id: string;
  name: string;
};
export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

export interface FileExplorerItemProps {
  item: FileItem;
  onFileSelect?: (item: FileItem) => void;
}

export interface Tab {
  id: string;
  name: string;
}
