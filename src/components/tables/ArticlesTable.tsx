
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";

interface Article {
  id: string;
  title: string;
  keyword: string;
  wordCount: number;
  createdOn: Date | string;
  status: "Generated" | "Published" | "Scheduled" | "Archived";
}

interface ArticlesTableProps {
  data: Article[];
  loading?: boolean;
}

export function ArticlesTable({ data, loading = false }: ArticlesTableProps) {
  const [sortField, setSortField] = useState<keyof Article>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle sorting
  const handleSort = (field: keyof Article) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date for display
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') return date;
    return date.toLocaleDateString();
  };

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];

    // Handle date sorting
    if (sortField === "createdOn") {
      if (fieldA === "---") return sortDirection === "asc" ? 1 : -1;
      if (fieldB === "---") return sortDirection === "asc" ? -1 : 1;
    }
    
    // Handle normal string/number sorting
    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead className="w-[40%]">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center font-medium"
                >
                  Article Title
                  {sortField === "title" && (
                    <>
                      {sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
              </TableHead>
              <TableHead className="w-[25%]">
                <button
                  onClick={() => handleSort("keyword")}
                  className="flex items-center font-medium"
                >
                  Keyword [Traffic]
                  {sortField === "keyword" && (
                    <>
                      {sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
              </TableHead>
              <TableHead className="w-[10%]">
                <button
                  onClick={() => handleSort("wordCount")}
                  className="flex items-center font-medium"
                >
                  Words
                  {sortField === "wordCount" && (
                    <>
                      {sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
              </TableHead>
              <TableHead className="w-[15%]">
                <button
                  onClick={() => handleSort("createdOn")}
                  className="flex items-center font-medium"
                >
                  Created On
                  {sortField === "createdOn" && (
                    <>
                      {sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
              </TableHead>
              <TableHead className="w-[10%] text-center">Action</TableHead>
              <TableHead className="w-[10%] text-center">Publish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 rounded-md mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full rounded-md" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-8 w-16 rounded-md mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="text-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.keyword}</TableCell>
                  <TableCell>{article.wordCount}</TableCell>
                  <TableCell>{formatDate(article.createdOn)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="w-16">
                      View
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Button variant="ghost" className="h-8 w-8 p-0 text-blue-500">
                        <svg
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="text-sm text-muted-foreground">
          Total {data.length} Article Titles | Show 
          <select className="mx-2 border rounded px-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select> 
          entries per page
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-sm text-muted-foreground">1 / 1</span>
        </div>
      </div>
    </div>
  );
}
