"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Power, PowerOff, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createCause, toggleCauseStatus, deleteCause, getAllCauses } from "@/app/actions/causes";
import { DonationCause } from "@/types";

export default function AdminCausesPage() {
  const [causes, setCauses] = useState<DonationCause[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCause, setNewCause] = useState({
    title: "",
    description: "",
    target_amount: "",
  });

  async function loadCauses() {
    const data = await getAllCauses();
    setCauses(data);
  }

  useEffect(() => {
    loadCauses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCause({
        title: newCause.title,
        description: newCause.description,
        target_amount: parseFloat(newCause.target_amount),
      });
      toast.success("Cause created successfully");
      setIsAdding(false);
      setNewCause({ title: "", description: "", target_amount: "" });
      loadCauses();
    } catch (error) {
      toast.error("Failed to create cause");
    }
  };

  const handleToggle = async (id: string, status: boolean) => {
    try {
      await toggleCauseStatus(id, status);
      toast.success("Status updated");
      loadCauses();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cause?")) return;
    try {
      await deleteCause(id);
      toast.success("Cause deleted");
      loadCauses();
    } catch (error) {
      toast.error("Failed to delete cause");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Donation Causes</h2>
          <p className="text-muted-foreground">Manage fundraising goals and public donation targets.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          <Plus className="h-4 w-4" />
          {isAdding ? "Cancel" : "Add New Cause"}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-secondary/20 shadow-xl max-w-2xl">
          <CardHeader>
            <CardTitle>Create New Fundraising Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Cause Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Building Fund 2026" 
                  value={newCause.title}
                  onChange={e => setNewCause({...newCause, title: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Briefly describe what this is for..." 
                  value={newCause.description}
                  onChange={e => setNewCause({...newCause, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount (KES)</Label>
                <Input 
                  id="target" 
                  type="number" 
                  placeholder="1,000,000" 
                  value={newCause.target_amount}
                  onChange={e => setNewCause({...newCause, target_amount: e.target.value})}
                  required 
                />
              </div>
              <Button type="submit" variant="gold" className="w-full font-bold">Create Cause</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {causes.map(item => {
          const percentage = Math.min(Math.round((item.current_amount / item.target_amount) * 100), 100);
          return (
            <Card key={item.id} className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-bold text-xl text-primary">{item.title}</h3>
                    <Badge variant={item.is_active ? "default" : "secondary"}>
                      {item.is_active ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => handleToggle(item.id, item.is_active)}
                    >
                      {item.is_active ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-bold">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>KES {item.current_amount.toLocaleString()}</span>
                    <span className="text-muted-foreground">Target: KES {item.target_amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t flex gap-4">
                  <div className="flex-1 text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Contributed</p>
                    <p className="text-sm font-bold text-primary">KES {item.current_amount.toLocaleString()}</p>
                  </div>
                  <div className="w-px bg-slate-100" />
                  <div className="flex-1 text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Status</p>
                    <p className="text-sm font-bold text-secondary">
                      {percentage >= 100 ? "Goal Met!" : "Ongoing"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {causes.length === 0 && !isAdding && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-muted-foreground">No active donation causes yet. Create one to start fundraising!</p>
        </div>
      )}
    </div>
  );
}
