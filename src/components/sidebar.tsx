import { Folder, Search } from "lucide-react";

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

export default Sidebar;
