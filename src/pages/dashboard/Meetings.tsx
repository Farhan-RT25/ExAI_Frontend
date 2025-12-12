import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Users, FileText, Play, Search, Filter, ChevronRight, Mic, Brain, MessageSquare, Plus, Eye, EyeOff, ExternalLink, Upload, CheckCircle2, TrendingUp, BarChart3, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample meetings data
const meetings = [
  {
    id: 1,
    title: "SmartSync feature launch",
    date: "Mon, Apr 28 2025",
    time: "4:45 PM",
    duration: "45m",
    participants: [
      { name: "John D.", avatar: "JD" },
      { name: "Sarah M.", avatar: "SM" },
      { name: "Mike R.", avatar: "MR" },
    ],
    status: "completed",
    hasTranscript: true,
    hasSummary: true,
    tag: "Strategic planning",
    description: "The team convened for a focused discussion on the upcoming launch of the SmartSync feature, a pivotal update designed to enhance real-time...",
    keyPoints: ["Project progress reviewed", "Frontend development progressing well", "Backend development tasks authenticated"],
    actionItems: ["Review progress with stakeholders", "Backend development tasks (authentication)"],
    nextSteps: ["Follow-up meeting scheduled to review progress", "Clear roadmap established"],
  },
  {
    id: 2,
    title: "Weekly dev sync",
    date: "Mon, Apr 28 2025",
    time: "3:00 PM - 4:00 PM",
    duration: "1h",
    participants: [
      { name: "Client Team", avatar: "CT" },
      { name: "Product Manager", avatar: "PM" },
      { name: "Alex B.", avatar: "AB" },
      { name: "Rachel K.", avatar: "RK" },
    ],
    status: "completed",
    hasTranscript: true,
    hasSummary: true,
    tag: "Development",
    description: "The team discussed project progress, highlighting near completion of backend and frontend development. They addressed challenges...",
    keyPoints: ["Sprint progress reviewed", "Blocker identified on API integration", "Demo scheduled for Friday"],
    actionItems: ["Finalize authentication module", "Test third-party integrations"],
    nextSteps: ["Progress check-in scheduled", "Collaboration efforts finalized"],
  },
  {
    id: 3,
    title: "Design review session",
    date: "Yesterday",
    time: "11:00 AM - 12:00 PM",
    duration: "1h",
    participants: [
      { name: "Design Team", avatar: "DT" },
      { name: "Stakeholders", avatar: "SH" },
    ],
    status: "completed",
    hasTranscript: true,
    hasSummary: true,
    tag: "Design",
    description: "New dashboard approved with minor revisions on mobile view. Launch date confirmed for next quarter.",
    keyPoints: ["New dashboard approved", "Minor revisions on mobile view", "Launch date confirmed"],
    actionItems: ["Update mobile designs", "Prepare launch materials"],
    nextSteps: ["Final review next week", "Start development sprint"],
  },
  {
    id: 4,
    title: "Product marketing meeting",
    date: "Today",
    time: "10:30 AM - 11:30 AM",
    duration: "1h",
    participants: [
      { name: "Jane Cooper", avatar: "JC" },
    ],
    status: "upcoming",
    hasTranscript: false,
    hasSummary: false,
    tag: "Marketing",
    description: "",
    keyPoints: [],
    actionItems: [],
    nextSteps: [],
  },
  {
    id: 5,
    title: "User research discussion",
    date: "Today",
    time: "2:30 PM - 3:30 PM",
    duration: "1h",
    participants: [
      { name: "Darrell Steward", avatar: "DS" },
    ],
    status: "upcoming",
    hasTranscript: false,
    hasSummary: false,
    tag: "Research",
    description: "",
    keyPoints: [],
    actionItems: [],
    nextSteps: [],
  },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "pt", label: "Portuguese" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
];

const Meetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [meetingsTab, setMeetingsTab] = useState("upcoming");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingMeetings = filteredMeetings.filter(m => m.status === "upcoming");
  const pastMeetings = filteredMeetings.filter(m => m.status === "completed");

  // If a meeting is selected, show detail view
  if (selectedMeeting) {
    return (
      <div className="space-y-6">
        {/* Back button and header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelectedMeeting(null)}
            className="shrink-0"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{selectedMeeting.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {selectedMeeting.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {selectedMeeting.time} ({selectedMeeting.duration})
              </span>
              <Badge className="bg-primary/80 text-white">
                {selectedMeeting.tag}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">
              <Brain className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="transcript">
              <FileText className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="notes">
              <MessageSquare className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="snippets">
              <Video className="h-4 w-4 mr-2" />
              Snippets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedMeeting.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Key Points */}
                {selectedMeeting.keyPoints.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Key points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-3 text-sm">Project progress</h4>
                          <ul className="space-y-2">
                            {selectedMeeting.keyPoints.slice(0, 2).map((point, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-sm">Challenges faced</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              Difficulty integrating a third-party API for geolocation services
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              Discussion on potential data privacy concerns
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Items & Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedMeeting.actionItems.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          Action items
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedMeeting.actionItems.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded border-2 border-muted-foreground mt-0.5 shrink-0" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Michael</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedMeeting.nextSteps.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Next steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedMeeting.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Video Preview */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                        {selectedMeeting.participants.slice(0, 4).map((participant, index) => (
                          <div key={index} className="bg-muted/50 rounded flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                              {participant.avatar}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-center gap-4">
                        <Button size="icon" variant="ghost">
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Users className="h-5 w-5" />
                        </Button>
                        <Button size="icon" className="w-12 h-12 rounded-full bg-primary">
                          <Play className="h-6 w-6 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Clock className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Video className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="text-center text-xs text-muted-foreground">
                        00:00 / {selectedMeeting.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Speakers & Filters */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Speakers
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMeeting.participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                            {participant.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{participant.name}</p>
                            <p className="text-xs text-muted-foreground">Frontend developer</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">16d</p>
                          <p className="text-xs text-muted-foreground">28m</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-primary">John D. (00:02:15)</p>
                    <p className="text-sm text-muted-foreground">Let's start with the sprint progress. Sarah, can you give us an update on where we are with the current sprint?</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-blue-600">Sarah M. (00:02:28)</p>
                    <p className="text-sm text-muted-foreground">Sure! We've completed 8 out of 12 stories. The remaining ones are in progress, and we're on track to finish by the end of the week.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-green-600">Mike R. (00:03:10)</p>
                    <p className="text-sm text-muted-foreground">I wanted to flag a blocker we encountered with the API integration. It's taking longer than expected, but we have a workaround in place.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center py-12">
                  No notes have been added yet. Start taking notes during your meetings.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="snippets" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center py-12">
                  No video snippets available for this meeting.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Main meetings list view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <p className="text-muted-foreground">AI-powered meeting notes and transcripts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="gap-2"
          >
            {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showStats ? "Hide" : "Show"} Stats
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Meeting
          </Button>
        </div>
      </div>

      {/* Stats Cards - Toggleable */}
      {showStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
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
                <div className="p-3 rounded-xl bg-success/10">
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
                <div className="p-3 rounded-xl bg-info/10">
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
                <div className="p-3 rounded-xl bg-warning/10">
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
      )}

      {/* New Meeting Section */}
      <Card className="border border-border/50 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            New meeting
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="secondary" className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all">
              <Video className="h-4 w-4" />
              Online meeting
            </Button>
            <Button variant="secondary" className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all">
              <Users className="h-4 w-4" />
              In-person meeting
            </Button>
            <Button variant="secondary" className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all">
              <Upload className="h-4 w-4" />
              Upload meeting
            </Button>
          </div>
          <div className="space-y-4">
            <Input placeholder="Paste your meeting URL here" className="bg-background/50 border-border/50 h-11" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Name your meeting (optional)" className="bg-background/50 border-border/50 h-11" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-background/50 border-border/50 h-11">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                value="Nyx AI" 
                readOnly 
                className="bg-muted/50 border-border/50 h-11 text-muted-foreground cursor-not-allowed" 
              />
            </div>
          </div>
          <Button className="mt-6 bg-primary hover:bg-primary/90 h-11 px-6">
            <Play className="h-4 w-4 mr-2" />
            Start capturing
          </Button>
        </CardContent>
      </Card>

      {/* Meetings Tabs - Upcoming & Past */}
      <Tabs value={meetingsTab} onValueChange={setMeetingsTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="upcoming" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="h-4 w-4" />
              Upcoming ({upcomingMeetings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="h-4 w-4" />
              Past ({pastMeetings.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="mt-0">
          {upcomingMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingMeetings.map((meeting) => (
                <Card 
                  key={meeting.id}
                  className="border border-border/50 hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-card to-card/80"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {meeting.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {meeting.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {meeting.duration}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {meeting.tag}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex -space-x-2">
                        {meeting.participants.slice(0, 3).map((participant, index) => (
                          <div
                            key={index}
                            className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-semibold"
                          >
                            {participant.avatar}
                          </div>
                        ))}
                      </div>
                      {meeting.participants.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{meeting.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border/50 bg-muted/20">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming meetings scheduled</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          {pastMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastMeetings.map((meeting) => (
                <Card 
                  key={meeting.id}
                  className="border border-border/50 hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-card to-card/80"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {meeting.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {meeting.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {meeting.duration}
                          </span>
                          {meeting.hasTranscript && (
                            <>
                              <span>•</span>
                              <FileText className="h-3 w-3 text-success" />
                            </>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-success/30">
                        {meeting.tag}
                      </Badge>
                    </div>

                    {meeting.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {meeting.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {meeting.participants.slice(0, 3).map((participant, index) => (
                          <div
                            key={index}
                            className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-semibold"
                          >
                            {participant.avatar}
                          </div>
                        ))}
                      </div>
                      {meeting.participants.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{meeting.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border/50 bg-muted/20">
              <CardContent className="p-12 text-center">
                <History className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No past meetings yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Meetings;