import { Folder, Terminal } from "lucide-react";

interface HeaderProps {
  isTerminalVisible: boolean;
  setIsTerminalVisible: (isTerminalVisible: boolean) => void;
  isFileExplorerVisible: boolean;
  setIsFileExplorerVisible: (isFileExplorerVisible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isTerminalVisible,
  setIsTerminalVisible,
  isFileExplorerVisible,
  setIsFileExplorerVisible,
}) => {
  return (
    <div className="h-10 bg-primary flex items-center justify-between px-4">
      <div className="text-[#cccccc] text-sm">Web IDE</div>
      <div className="flex items-center gap-2">
        <button
          className={`p-1 hover:bg-[#444653] rounded-sm ${
            isTerminalVisible ? "bg-[#444653]" : ""
          }`}
          onClick={() => setIsTerminalVisible(!isTerminalVisible)}
        >
          <Terminal width={16} height={16} />
        </button>
        <button
          className={`p-1 hover:bg-[#444653] rounded-sm ${
            isFileExplorerVisible ? "bg-[#444653]" : ""
          }`}
          onClick={() => setIsFileExplorerVisible(!isFileExplorerVisible)}
        >
          <Folder width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default Header;
