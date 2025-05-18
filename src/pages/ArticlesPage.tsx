
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArticlesTable } from "@/components/tables/ArticlesTable";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  keyword: string;
  wordCount: number;
  createdOn: Date | string;
  status: "Generated" | "Published" | "Scheduled" | "Archived";
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("generated");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setArticles([
        {
          id: "1",
          title: "How to Improve Your Skills in League of Legends",
          keyword: "league of legends [2400000]",
          wordCount: 4675,
          createdOn: "20 hours ago",
          status: "Generated"
        },
        {
          id: "2",
          title: "How to Master Last Hitting in League of Legends",
          keyword: "league of legends [2400000]",
          wordCount: 3480,
          createdOn: "21 hours ago",
          status: "Generated"
        },
        {
          id: "3",
          title: "7 Tips for Better Teamplay in League of Legends",
          keyword: "league of legends [2400000]",
          wordCount: 2076,
          createdOn: "a day ago",
          status: "Generated"
        },
        {
          id: "4",
          title: "Top Virtual Executive Assistant Services (2024)",
          keyword: "virtual executive assistant [2900]",
          wordCount: 2408,
          createdOn: "1 Oct, 24",
          status: "Generated"
        },
        {
          id: "5",
          title: "Unlimited Graphics Design Solutions",
          keyword: "unlimited graphic design services [290]",
          wordCount: 1793,
          createdOn: "---",
          status: "Published"
        },
        {
          id: "6",
          title: "Top Amazon Payment Methods for Quick Access to Funds",
          keyword: "amazon payment methods [3600]",
          wordCount: 2647,
          createdOn: "---",
          status: "Published"
        },
        {
          id: "7",
          title: "Backlinks 101: What are backlinks and why they're important [Free Template]",
          keyword: "backlinks [8100]",
          wordCount: 2261,
          createdOn: "---",
          status: "Scheduled"
        },
        {
          id: "8",
          title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
          keyword: "ai seo software [880]",
          wordCount: 1543,
          createdOn: "---",
          status: "Scheduled"
        },
        {
          id: "9",
          title: "Unlimited Graphic Design Services You Can Rely On",
          keyword: "unlimited graphic design services [290]",
          wordCount: 1874,
          createdOn: "---",
          status: "Archived"
        },
      ]);
      setLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Filter articles based on active tab and search term
  const filteredArticles = articles.filter((article) => {
    const matchesTab = 
      activeTab === "all" || 
      article.status.toLowerCase() === activeTab;
    
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Articles</h2>
        <p className="text-muted-foreground">
          Manage your articles and their publishing status.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs defaultValue="generated" className="w-full sm:w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="generated">Generated Articles</TabsTrigger>
              <TabsTrigger value="published">Published Articles</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Articles</TabsTrigger>
              <TabsTrigger value="archived">Archived Articles</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search for Title & Keywords..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ArticlesTable data={filteredArticles} loading={loading} />
      </div>
    </div>
  );
}
