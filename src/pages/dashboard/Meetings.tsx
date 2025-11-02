import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

const Meetings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-card-hover border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-6 bg-gradient-primary rounded-full mb-6">
            <Video className="h-12 w-12 text-primary-foreground" />
          </div>
          <Badge className="mb-4 text-lg px-4 py-2 bg-warning text-warning-foreground">
            Coming Soon
          </Badge>
          <h2 className="text-3xl font-bold mb-3">Meeting Intelligence</h2>
          <p className="text-lg text-muted-foreground text-center max-w-md">
            Record meetings, get transcripts, and AI-generated summaries automatically
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meetings;
