import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Users, FileText, Play, Search, Filter, ChevronRight, Mic, Brain, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample meetings data
const meetings = [
  {
    id: 1,
    title: "Weekly Team Standup",
    date: "Today",
    time: "9:00 AM - 9:30 AM",
    participants: ["John D.", "Sarah M.", "Mike R."],
    status: "completed",
    hasTranscript: true,
    keyPoints: ["Sprint progress reviewed", "Blocker identified on API integration", "Demo scheduled for Friday"],
  },
  {
    id: 2,
    title: "Client Review - Project Alpha",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    participants: ["Client Team", "Product Manager"],
    status: "upcoming",
    hasTranscript: false,
    keyPoints: [],
  },
  {
    id: 3,
    title: "Design Review Session",
    date: "Yesterday",
    time: "11:00 AM - 12:00 PM",
    participants: ["Design Team", "Stakeholders"],
    status: "completed",
    hasTranscript: true,
    keyPoints: ["New dashboard approved", "Minor revisions on mobile view", "Launch date confirmed"],
  },
  {
    id: 4,
    title: "Quarterly Planning",
    date: "Dec 1, 2025",
    time: "10:00 AM - 11:30 AM",
    participants: ["Leadership Team"],
    status: "completed",
    hasTranscript: true,
    keyPoints: ["Q1 goals defined", "Budget allocation discussed", "Hiring plan approved"],
  },
];

const Meetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState(meetings[0]);

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Meeting Intelligence</h1>
          <p className="text-muted-foreground mt-1">AI-powered meeting notes and transcripts</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Video className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Meetings this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/20">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Transcripts generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/20">
                <Clock className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">12h</p>
                <p className="text-sm text-muted-foreground">Time saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/20">
                <Brain className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Key points extracted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meetings List */}
        <Card className="lg:col-span-1 border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">All Meetings</CardTitle>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  onClick={() => setSelectedMeeting(meeting)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                    selectedMeeting?.id === meeting.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">{meeting.date} • {meeting.time}</p>
                    </div>
                    <Badge 
                      variant={meeting.status === 'completed' ? 'default' : 'secondary'}
                      className={meeting.status === 'completed' ? 'bg-success' : ''}
                    >
                      {meeting.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {meeting.participants.length} participants
                    </span>
                    {meeting.hasTranscript && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <FileText className="h-3 w-3 text-primary" />
                        <span className="text-xs text-primary">Transcript</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meeting Details */}
        <Card className="lg:col-span-2 border">
          {selectedMeeting ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold">{selectedMeeting.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedMeeting.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedMeeting.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedMeeting.participants.length} participants
                      </span>
                    </div>
                  </div>
                  {selectedMeeting.status === 'upcoming' && (
                    <Button className="bg-success hover:bg-success/90">
                      <Play className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI Features Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="h-5 w-5 text-primary" />
                      <span className="font-medium">Notetaker</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedMeeting.hasTranscript ? 'AI notes available' : 'Will be active during meeting'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">Transcript</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedMeeting.hasTranscript ? 'Full transcript ready' : 'Generated post-meeting'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-info" />
                      <span className="font-medium">Key Points</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedMeeting.keyPoints.length > 0 ? `${selectedMeeting.keyPoints.length} points extracted` : 'Extracted automatically'}
                    </p>
                  </div>
                </div>

                {/* Key Points */}
                {selectedMeeting.keyPoints.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI-Generated Key Points
                    </h3>
                    <div className="space-y-2">
                      {selectedMeeting.keyPoints.map((point, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                        >
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transcript Preview */}
                {selectedMeeting.hasTranscript && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Transcript Preview
                    </h3>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-primary font-medium">John D. (00:02:15)</p>
                          <p className="text-sm text-muted-foreground">Let's start with the sprint progress. Sarah, can you give us an update?</p>
                        </div>
                        <div>
                          <p className="text-xs text-info font-medium">Sarah M. (00:02:28)</p>
                          <p className="text-sm text-muted-foreground">Sure! We've completed 8 out of 12 stories. The remaining ones are in progress...</p>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 w-full sm:w-auto">
                        View Full Transcript
                      </Button>
                    </div>
                  </div>
                )}

                {/* Participants */}
                <div>
                  <h3 className="font-semibold mb-3">Participants</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.participants.map((participant, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[400px]">
              <p className="text-muted-foreground">Select a meeting to view details</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Meetings;
