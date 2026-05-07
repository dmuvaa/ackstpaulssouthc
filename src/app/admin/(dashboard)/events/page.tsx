"use client";

import { Calendar, Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Events Management</h2>
        <p className="text-muted-foreground">Schedule and manage upcoming parish activities and special services.</p>
      </div>

      <Card className="border-dashed border-2 bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <Calendar className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <Construction className="h-5 w-5 text-secondary" />
              CMS Integration Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We are building a robust event management system. Soon you will be able to manage registrations and service schedules with ease.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
