const API_BASE = import.meta.env.VITE_API_BASE;

// Types
export interface MeetingParticipant {
  name: string;
  avatar: string;
  email?: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: MeetingParticipant[];
  status: "completed" | "upcoming" | "recording" | "processing";
  hasTranscript: boolean;
  hasSummary: boolean;
  tag: string;
  description: string;
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string[];
  transcript?: string;
  summary?: string;
  meeting_id?: number;
  event_id?: number;
}

export interface MeetingDetails {
  meeting_id: number;
  event: {
    event_id: number;
    event_title: string;
    event_description?: string;
    event_start_time: string;
    event_end_time: string;
    location?: string;
    organizer_email?: string;
    attendees?: string; // JSON string
    meeting_link?: string;
  };
  meeting_start_time: string;
  meeting_end_time?: string;
  meeting_duration?: number;
  transcript_text?: string;
  key_points_summary?: string;
  action_items: Array<{
    task: string;
    assignee?: string;
    due_date?: string;
    priority?: string;
  }>;
  recording_status: string;
  processing_status: string;
  notes: Array<{
    note_id: number;
    note_text: string;
    note_type: string;
    created_at: string;
    updated_at: string;
  }>;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const meetingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (meetingDate.getTime() === today.getTime()) {
    return "Today";
  } else if (meetingDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }
};

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

// Helper function to format duration
const formatDuration = (minutes?: number): string => {
  if (!minutes) return "0m";
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Helper function to parse attendees
const parseAttendees = (attendeesStr?: string): MeetingParticipant[] => {
  if (!attendeesStr) return [];
  try {
    const attendees = JSON.parse(attendeesStr);
    return attendees.map((att: any) => ({
      name: att.name || att.email?.split('@')[0] || 'Unknown',
      avatar: (att.name || att.email?.split('@')[0] || 'U').substring(0, 2).toUpperCase(),
      email: att.email
    }));
  } catch {
    return [];
  }
};

// Helper function to extract key points from summary
const extractKeyPoints = (summary?: string): string[] => {
  if (!summary) return [];
  const keyPointsMatch = summary.match(/KEY POINTS:?\s*([\s\S]*?)(?=DECISIONS|NEXT STEPS|$)/i);
  if (keyPointsMatch) {
    return keyPointsMatch[1]
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(line => line.length > 0);
  }
  return [];
};

// Helper function to extract next steps from summary
const extractNextSteps = (summary?: string): string[] => {
  if (!summary) return [];
  const nextStepsMatch = summary.match(/NEXT STEPS:?\s*([\s\S]*?)$/i);
  if (nextStepsMatch) {
    return nextStepsMatch[1]
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(line => line.length > 0);
  }
  return [];
};

// Transform backend meeting details to frontend meeting format
const transformMeetingDetails = (details: MeetingDetails): Meeting => {
  if (!details.event) {
    // Fallback if event is missing
    return {
      id: details.meeting_id,
      title: "Untitled Meeting",
      date: details.meeting_start_time ? formatDate(details.meeting_start_time) : "Unknown",
      time: details.meeting_start_time ? formatTime(details.meeting_start_time) : "Unknown",
      duration: formatDuration(details.meeting_duration),
      participants: [],
      status: details.recording_status === "completed" ? "completed" : "processing",
      hasTranscript: !!details.transcript_text,
      hasSummary: !!details.key_points_summary,
      tag: "Meeting",
      description: details.key_points_summary?.split('\n')[0] || "",
      keyPoints: extractKeyPoints(details.key_points_summary),
      actionItems: details.action_items.map(item => item.task),
      nextSteps: extractNextSteps(details.key_points_summary),
      transcript: details.transcript_text,
      summary: details.key_points_summary,
      meeting_id: details.meeting_id
    };
  }

  const startTime = new Date(details.event.event_start_time);
  const endTime = details.event.event_end_time ? new Date(details.event.event_end_time) : null;
  
  // Calculate duration
  let duration = "0m";
  if (endTime) {
    const minutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    duration = formatDuration(minutes);
  } else if (details.meeting_duration) {
    duration = formatDuration(details.meeting_duration);
  }
  
  // Parse attendees
  const participants = parseAttendees(details.event.attendees);
  
  // Determine status
  let status: "completed" | "upcoming" | "recording" | "processing" = "completed";
  if (details.recording_status === "recording") {
    status = "recording";
  } else if (details.processing_status === "processing") {
    status = "processing";
  } else if (startTime > new Date()) {
    status = "upcoming";
  }
  
  // Extract key points and next steps
  const keyPoints = extractKeyPoints(details.key_points_summary);
  const nextSteps = extractNextSteps(details.key_points_summary);
  
  // Format action items
  const actionItems = details.action_items.map(item => item.task);
  
  // Get tag from event description or default
  const tag = details.event.event_description?.split(' ')[0] || "Meeting";
  
  return {
    id: details.meeting_id,
    title: details.event.event_title,
    date: formatDate(details.event.event_start_time),
    time: endTime 
      ? `${formatTime(details.event.event_start_time)} - ${formatTime(details.event.event_end_time)}`
      : formatTime(details.event.event_start_time),
    duration,
    participants,
    status,
    hasTranscript: !!details.transcript_text,
    hasSummary: !!details.key_points_summary,
    tag,
    description: details.event.event_description || details.key_points_summary?.split('\n')[0] || "",
    keyPoints,
    actionItems,
    nextSteps,
    transcript: details.transcript_text,
    summary: details.key_points_summary,
    meeting_id: details.meeting_id,
    event_id: details.event.event_id
  };
};

/**
 * Get all meetings for the current user
 */
export const getMeetings = async (
  limit: number = 50,
  offset: number = 0,
  statusFilter?: string
): Promise<Meeting[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  // Check if API_BASE is configured
  if (!API_BASE || API_BASE.trim() === '') {
    console.error('VITE_API_BASE is not configured. Current value:', API_BASE);
    throw new Error('API base URL is not configured. Please set VITE_API_BASE in your .env file (e.g., VITE_API_BASE=http://localhost:8000)');
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  
  if (statusFilter) {
    params.append('status_filter', statusFilter);
  }

  const url = `${API_BASE}/calendar/meetings?${params}`;
  console.log('Fetching meetings from:', url);
  console.log('API_BASE value:', API_BASE);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning page
    },
  });

  // Check content type before parsing
  const contentType = response.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');

  console.log('Response status:', response.status, 'Content-Type:', contentType, 'OK:', response.ok);

  if (!response.ok) {
    // 404 means no meetings found - return empty array instead of error
    if (response.status === 404) {
      console.log('No meetings found (404) - returning empty array');
      return [];
    }
    
    let errorMessage = 'Failed to fetch meetings';
    if (isJSON) {
      try {
        const error = await response.json();
        errorMessage = error.detail || error.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use default message
      }
    } else {
      // If response is HTML (like an error page), get status text
      const text = await response.text();
      console.error('Non-JSON error response. Status:', response.status);
      console.error('Response preview:', text.substring(0, 500));
      console.error('Full URL that was called:', url);
      errorMessage = response.statusText || `HTTP ${response.status}: ${errorMessage}`;
      
      if (response.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      }
    }
    throw new Error(errorMessage);
  }

  if (!isJSON) {
    const text = await response.text();
    console.error('Non-JSON response received. Status:', response.status);
    console.error('Response preview:', text.substring(0, 500));
    console.error('Full URL that was called:', url);
    
    // Check if it's the ngrok warning page
    if (text.includes('ngrok') && (text.includes('Visit Site') || text.includes('You are about to visit') || text.includes('ngrok.io') || text.includes('ngrok-free.app'))) {
      throw new Error(
        `Ngrok warning page detected. The request is being blocked by ngrok's browser warning page.\n\n` +
        `Solutions:\n` +
        `1. Make sure the backend is running and accessible at: ${API_BASE}\n` +
        `2. Verify the ngrok URL is pointing to your backend (port 8000), not frontend\n` +
        `3. Check CORS configuration on backend allows your frontend origin\n` +
        `4. Try accessing ${API_BASE}/docs in browser to verify backend is accessible\n\n` +
        `The ngrok-skip-browser-warning header has been added, but if the backend isn't running on this URL, you'll still get HTML.`
      );
    }
    
    // Check if it's a 404 or frontend route
    if (response.status === 200 && text.includes('<!DOCTYPE')) {
      if (text.includes('root') || text.includes('index.html') || text.includes('vite')) {
        throw new Error(
          `The API request is hitting the frontend instead of backend.\n` +
          `VITE_API_BASE is likely pointing to the frontend URL.\n\n` +
          `Current API_BASE: ${API_BASE}\n` +
          `Expected: Backend URL (e.g., http://localhost:8000 or your backend ngrok URL)\n` +
          `Got: Frontend HTML page\n\n` +
          `Please check your .env file and set VITE_API_BASE to your backend URL.`
        );
      }
      
      throw new Error(
        `API endpoint returned HTML instead of JSON.\n` +
        `This usually means the endpoint doesn't exist or there's a routing issue.\n\n` +
        `Current API_BASE: ${API_BASE}\n` +
        `Called URL: ${url}\n\n` +
        `Please verify the backend endpoint exists and is properly registered.`
      );
    }
    
    throw new Error(`Invalid response format. Expected JSON but received ${contentType || 'unknown format'}. Status: ${response.status}`);
  }

  try {
    const data: MeetingDetails[] = await response.json();
    return data.map(transformMeetingDetails);
  } catch (e) {
    console.error('Error parsing meetings response:', e);
    throw new Error('Failed to parse meetings response');
  }
};

/**
 * Get a single meeting by ID
 */
export const getMeetingById = async (meetingId: number): Promise<Meeting> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  // Check if API_BASE is configured
  if (!API_BASE) {
    console.error('VITE_API_BASE is not configured');
    throw new Error('API base URL is not configured. Please check your environment variables.');
  }

  const url = `${API_BASE}/calendar/meetings/${meetingId}`;
  console.log('Fetching meeting from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning page
    },
  });

  // Check content type before parsing
  const contentType = response.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');

  if (!response.ok) {
    let errorMessage = 'Meeting not found';
    if (isJSON) {
      try {
        const error = await response.json();
        errorMessage = error.detail || error.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use default message
      }
    } else {
      const text = await response.text();
      console.error('Non-JSON error response:', text.substring(0, 200));
      errorMessage = response.statusText || `HTTP ${response.status}: ${errorMessage}`;
    }
    throw new Error(errorMessage);
  }

  if (!isJSON) {
    const text = await response.text();
    console.error('Non-JSON response received:', text.substring(0, 200));
    
    // Check if it's the ngrok warning page
    if (text.includes('ngrok') && (text.includes('Visit Site') || text.includes('You are about to visit'))) {
      throw new Error('Ngrok warning page detected. Please verify the backend is running on the ngrok URL.');
    }
    
    throw new Error(`Invalid response format. Expected JSON but received ${contentType || 'unknown format'}. Status: ${response.status}`);
  }

  try {
    const data: MeetingDetails = await response.json();
    return transformMeetingDetails(data);
  } catch (e) {
    console.error('Error parsing meeting response:', e);
    throw new Error('Failed to parse meeting response');
  }
};

/**
 * Get meeting statistics
 */
export const getMeetingStats = async (): Promise<{
  totalMeetings: number;
  transcriptsGenerated: number;
  timeSaved: number;
  keyPointsExtracted: number;
}> => {
  try {
    const meetings = await getMeetings(100, 0);
    
    const totalMeetings = meetings.length;
    const transcriptsGenerated = meetings.filter(m => m.hasTranscript).length;
    
    // Calculate total time saved (assuming 5 minutes per meeting saved)
    const timeSaved = transcriptsGenerated * 5; // minutes
    
    // Count total key points
    const keyPointsExtracted = meetings.reduce((sum, m) => sum + m.keyPoints.length, 0);
    
    return {
      totalMeetings,
      transcriptsGenerated,
      timeSaved,
      keyPointsExtracted
    };
  } catch (error) {
    console.error('Error fetching meeting stats:', error);
    // Return default stats instead of throwing
    // This allows the UI to still render even if stats fail
    return {
      totalMeetings: 0,
      transcriptsGenerated: 0,
      timeSaved: 0,
      keyPointsExtracted: 0
    };
  }
};

/**
 * Start a meeting recording
 */
export const startMeetingRecording = async (eventId: number): Promise<{
  message: string;
  meeting_id: number;
  event_title: string;
}> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE}/calendar/meetings/start`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({ event_id: eventId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to start recording' }));
    throw new Error(error.detail || 'Failed to start recording');
  }

  return response.json();
};

/**
 * Stop a meeting recording
 */
export const stopMeetingRecording = async (meetingId: number): Promise<{
  message: string;
  meeting_id: number;
  duration_minutes: number;
}> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE}/calendar/meetings/stop`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({ meeting_id: meetingId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to stop recording' }));
    throw new Error(error.detail || 'Failed to stop recording');
  }

  return response.json();
};

/**
 * Add a note to a meeting
 */
export const addMeetingNote = async (
  meetingId: number,
  noteText: string,
  noteType: string = "user"
): Promise<any> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE}/calendar/meetings/${meetingId}/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({
      note_text: noteText,
      note_type: noteType
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to add note' }));
    throw new Error(error.detail || 'Failed to add note');
  }

  return response.json();
};

/**
 * Get upcoming calendar events from email platforms
 */
export const getUpcomingEvents = async (limit: number = 50, daysAhead: number = 30): Promise<any[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const url = `${API_BASE}/calendar/events/upcoming?limit=${limit}&days_ahead=${daysAhead}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return []; // No events found
    }
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch upcoming events' }));
    throw new Error(error.detail || 'Failed to fetch upcoming events');
  }

  return response.json();
};

/**
 * Sync calendar events from email platform
 */
export const syncCalendarEvents = async (
  emailAccountId: number,
  startDate?: string,
  endDate?: string,
  maxResults: number = 100
): Promise<{
  message: string;
  synced_count: number;
  total_fetched: number;
  provider: string;
}> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const params = new URLSearchParams({
    max_results: maxResults.toString(),
  });
  
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  const response = await fetch(`${API_BASE}/calendar/sync/${emailAccountId}?${params}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to sync calendar events' }));
    throw new Error(error.detail || 'Failed to sync calendar events');
  }

  return response.json();
};

/**
 * Generate Meeting Pre-Prep Guide for a calendar event
 */
export const generateMeetingPrepGuide = async (eventId: number): Promise<any> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE}/calendar/meetings/prep-guide/${eventId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to generate prep guide' }));
    throw new Error(error.detail || 'Failed to generate prep guide');
  }

  return response.json();
};

