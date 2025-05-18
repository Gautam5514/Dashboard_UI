
import { DataTable, User } from "@/components/tables/DataTable";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setUsers([
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@example.com",
          role: "Admin",
          status: "Active",
          lastActive: new Date(2023, 9, 15),
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          role: "Manager",
          status: "Active",
          lastActive: new Date(2023, 9, 14),
        },
        {
          id: "3",
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          lastActive: new Date(2023, 8, 20),
        },
        {
          id: "4",
          name: "Emily Davis",
          email: "emily.davis@example.com",
          role: "Editor",
          status: "Pending",
          lastActive: new Date(2023, 9, 5),
        },
        {
          id: "5",
          name: "David Wilson",
          email: "d.wilson@example.com",
          role: "Viewer",
          status: "Active",
          lastActive: new Date(2023, 9, 10),
        },
        {
          id: "6",
          name: "Jennifer Garcia",
          email: "jennifer.g@example.com",
          role: "Admin",
          status: "Active",
          lastActive: new Date(2023, 9, 12),
        },
        {
          id: "7",
          name: "Robert Martinez",
          email: "robert.m@example.com",
          role: "User",
          status: "Inactive",
          lastActive: new Date(2023, 7, 30),
        },
        {
          id: "8",
          name: "Lisa Anderson",
          email: "lisa.a@example.com",
          role: "Editor",
          status: "Active",
          lastActive: new Date(2023, 9, 8),
        },
      ]);
      setLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome to your dashboard. Here's an overview of your users.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {["Total Users", "Active Users", "Pending Users", "Inactive Users"].map(
          (stat, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">{stat}</h3>
              </div>
              <div className="text-2xl font-bold">
                {loading ? (
                  <div className="h-8 w-16 rounded-md bg-gray-200 animate-pulse" />
                ) : (
                  i === 0
                    ? users.length
                    : i === 1
                    ? users.filter((u) => u.status === "Active").length
                    : i === 2
                    ? users.filter((u) => u.status === "Pending").length
                    : users.filter((u) => u.status === "Inactive").length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {i === 0
                  ? "+20% from last month"
                  : i === 1
                  ? "+15% from last month"
                  : i === 2
                  ? "+5% from last month"
                  : "-3% from last month"}
              </p>
            </div>
          )
        )}
      </div>

      {/* User Table */}
      <DataTable data={users} loading={loading} />
    </div>
  );
}
