import { Activity } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-header-bg shadow-md p-4 bg-header-bg">
      <div className="flex items-center gap-4">
        <Activity className="size-10 text-blue-100 bg-blue-400 p-1 rounded-full" />

        <h1 className="text-xl">Risk | Health Risk Assessment</h1>
      </div>
    </header>
  );
}
export default Header;
