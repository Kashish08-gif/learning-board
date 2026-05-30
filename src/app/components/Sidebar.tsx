import { Home, BookOpen, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="bg-zinc-900 rounded-3xl p-4 min-h-screen">
      <nav className="flex flex-col items-center gap-8 mt-8">
        <Home size={28} />
        <BookOpen size={28} />
        <User size={28} />
      </nav>
    </aside>
  );
}