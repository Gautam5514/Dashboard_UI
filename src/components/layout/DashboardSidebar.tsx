
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Settings,
  Search,
  FilePenLine,
  BookOpen,
  Target,
  Bot,
  RefreshCw,
  ExternalLink,
  Download,
  Clipboard,
  Headphones,
  User,
  MessageSquare,
  Bell,
  ChevronDown
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const location = useLocation();

  const routes = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Articles",
      href: "/articles",
      icon: FileText,
    },
    {
      name: "Create Article",
      href: "/create-article",
      icon: FilePenLine,
    },
    {
      name: "Keyword Projects",
      href: "/keyword-projects",
      icon: Target,
    },
    {
      name: "AI Keyword to Article",
      href: "/ai-keyword-to-article",
      icon: Bot,
    },
    {
      name: "Steal Competitor Keyword",
      href: "/steal-competitor-keyword",
      icon: RefreshCw,
    },
    {
      name: "Import Keyword from GSC",
      href: "/import-keyword-gsc",
      icon: Download,
    },
    {
      name: "Manual Keyword to Article",
      href: "/manual-keyword-to-article",
      icon: Clipboard,
    },
    {
      name: "Bulk Keyword to Article",
      href: "/bulk-keyword-to-article",
      icon: Clipboard,
    },
    {
      name: "Longtail Keyword to Article",
      href: "/longtail-keyword-to-article",
      icon: Clipboard,
    },
    {
      name: "Article Settings",
      href: "/article-settings",
      icon: Settings,
    },
    {
      name: "Auto Blog",
      href: "/auto-blog",
      icon: BookOpen,
    },
    {
      name: "Internal Links",
      href: "/internal-links",
      icon: ExternalLink,
    },
    {
      name: "Free Backlinks",
      href: "/free-backlinks",
      icon: ExternalLink,
    },
    {
      name: "Integrations",
      href: "/integrations",
      icon: RefreshCw,
    },
    {
      name: "Subscription",
      href: "/subscription",
      icon: Bell,
    },
    {
      name: "Affiliate Program",
      href: "/affiliate-program",
      icon: RefreshCw,
    },
    {
      name: "Help Center",
      href: "/help-center",
      icon: Headphones,
    },
    {
      name: "Updates",
      href: "/updates",
      icon: RefreshCw,
    },
    {
      name: "Live Chat Support",
      href: "/live-chat-support",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-white transition-all duration-300 dark:bg-slate-900 md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
            <span className="text-lg font-bold">A</span>
          </div>
          {isOpen && (
            <span className="text-lg font-semibold">abun</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Site Selector */}
      {isOpen && (
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
            <div className="h-6 w-6 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium flex-1">amazon.com</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={isOpen ? "Search..." : ""}
            className="w-full rounded-md border border-border bg-background py-2 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="grid gap-1">
          {routes.map((route, i) => {
            const isActive = location.pathname === route.href;
            return (
              <li key={i}>
                <Link
                  to={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {isOpen && <span>{route.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
