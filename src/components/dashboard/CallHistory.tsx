import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, PhoneCall, Clock, Star, Search, Filter, Play, Download } from "lucide-react";

// Mock data - in real app this would come from API
const mockCalls = [
  {
    id: "1",
    customerName: "Kerstin Rakash",
    customerPhone: "+46 70 123 45 67",
    callType: "appointment",
    duration: "4:12",
    timestamp: "2024-01-15 14:30:00",
    status: "completed",
    satisfaction: 5,
    outcome: "Appointment booked for tomorrow 10:00 AM",
    transcript: "Customer called to book an appointment for electrical work at healthcare center...",
  },
  {
    id: "2",
    customerName: "Erik Johansson",
    customerPhone: "+46 70 234 56 78",
    callType: "inquiry",
    duration: "2:45",
    timestamp: "2024-01-15 11:15:00",
    status: "completed",
    satisfaction: 4,
    outcome: "Provided pricing information for office renovation",
    transcript: "Customer inquired about electrical installation costs for new office...",
  },
  {
    id: "3",
    customerName: "Anna Svensson",
    customerPhone: "+46 70 345 67 89",
    callType: "urgent",
    duration: "6:23",
    timestamp: "2024-01-14 16:45:00",
    status: "transferred",
    satisfaction: null,
    outcome: "Transferred to Johan for emergency service",
    transcript: "Customer reported electrical emergency, immediately transferred to owner...",
  },
  {
    id: "4",
    customerName: "Lars Andersson",
    customerPhone: "+46 70 456 78 90",
    callType: "appointment",
    duration: "3:18",
    timestamp: "2024-01-14 09:20:00",
    status: "completed",
    satisfaction: 5,
    outcome: "Rescheduled existing appointment",
    transcript: "Customer needed to reschedule appointment due to conflict...",
  },
  {
    id: "5",
    customerName: "Unknown Caller",
    customerPhone: "+46 70 567 89 01",
    callType: "spam",
    duration: "0:15",
    timestamp: "2024-01-13 13:30:00",
    status: "terminated",
    satisfaction: null,
    outcome: "Detected spam call, automatically terminated",
    transcript: "Automated marketing call detected and blocked...",
  },
];

const CallHistory = () => {
  const [calls] = useState(mockCalls);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCall, setSelectedCall] = useState<typeof mockCalls[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "transferred":
        return "bg-blue-500";
      case "terminated":
        return "bg-red-500";
      case "missed":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Clock className="h-4 w-4" />;
      case "inquiry":
        return <PhoneCall className="h-4 w-4" />;
      case "urgent":
        return <Phone className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call History
          </CardTitle>
          <CardDescription>
            Review all calls handled by your AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by customer name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Calls Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{call.customerName}</div>
                        <div className="text-sm text-muted-foreground">{call.customerPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCallTypeIcon(call.callType)}
                        <span className="capitalize">{call.callType}</span>
                      </div>
                    </TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>{formatTimestamp(call.timestamp)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {call.satisfaction ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{call.satisfaction}/5</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCall(call)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Call Details - {selectedCall?.customerName}</DialogTitle>
                          </DialogHeader>
                          {selectedCall && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Customer</Label>
                                  <p>{selectedCall.customerName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedCall.customerPhone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Call Details</Label>
                                  <p>Duration: {selectedCall.duration}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatTimestamp(selectedCall.timestamp)}
                                  </p>
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Outcome</Label>
                                <p className="mt-1">{selectedCall.outcome}</p>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Call Transcript</Label>
                                <div className="mt-1 p-3 bg-muted rounded-md">
                                  <p className="text-sm">{selectedCall.transcript}</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Play className="h-4 w-4 mr-1" />
                                  Play Recording
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCalls.length === 0 && (
            <div className="text-center py-8">
              <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No calls found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Your AI assistant hasn't handled any calls yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium ${className}`}>{children}</label>
);

export default CallHistory;