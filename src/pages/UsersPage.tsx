
import { useState, useEffect } from "react";
import { DataTable, User } from "@/components/tables/DataTable";

export default function UsersPage() {
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
        {
          id: "9",
          name: "Thomas Taylor",
          email: "thomas.t@example.com",
          role: "User",
          status: "Active",
          lastActive: new Date(2023, 9, 11),
        },
        {
          id: "10",
          name: "Jessica Moore",
          email: "jessica.m@example.com",
          role: "Manager",
          status: "Pending",
          lastActive: new Date(2023, 9, 13),
        },
      ]);
      setLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Users Management</h2>
        <p className="text-muted-foreground">
          Manage user accounts, roles and permissions.
        </p>
      </div>

      {/* User Table */}
      <DataTable data={users} loading={loading} />
    </div>
  );
}
