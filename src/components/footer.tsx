const Footer = () => {
  return (
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
  );
};

export default Footer;
