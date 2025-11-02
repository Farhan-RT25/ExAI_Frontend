import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Clock, Bell, Megaphone, DollarSign, FileText, Users, Calendar } from "lucide-react";

const categories = [
  { name: "To Respond", icon: Mail, count: 145, color: "bg-info", active: true },
  { name: "Waiting Reply", icon: Clock, count: 89, color: "bg-warning", active: true },
  { name: "Notifications", icon: Bell, count: 267, color: "bg-primary", active: true },
  { name: "Marketing", icon: Megaphone, count: 412, color: "bg-success", active: true },
  { name: "Sales", icon: DollarSign, count: 178, color: "bg-danger", active: true },
  { name: "Admin", icon: FileText, count: 234, color: "bg-accent", active: true },
  { name: "HR", icon: Users, count: 56, color: "bg-secondary", active: false },
  { name: "Meeting/Event", icon: Calendar, count: 98, color: "bg-primary", active: true },
];

const Categorization = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Categories</h1>
        <p className="text-muted-foreground">
          Select which categories to use for organizing your emails
        </p>
      </div>

      <div className="grid gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="shadow-card hover:shadow-card-hover transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 ${category.color} rounded-lg`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} emails in this category
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {category.count}
                  </Badge>
                </div>
                <Switch defaultChecked={category.active} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-dashed">
        <CardHeader>
          <CardTitle className="text-center">Add Custom Category</CardTitle>
          <CardDescription className="text-center">
            Create a new category to organize your emails
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Custom Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categorization;
