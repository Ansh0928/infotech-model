
import { useState } from "react";
import Layout from "@/components/Layout";
import { FolderKanban, PlusCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
}

export default function Projects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "InfoTech Brains",
      description: "Customer messaging platform for business automation",
      lastUpdated: "2025-04-05T12:30:00Z"
    },
    {
      id: "2",
      name: "Digital Dynamics",
      description: "Marketing automation for e-commerce clients",
      lastUpdated: "2025-04-01T09:15:00Z"
    },
    {
      id: "3",
      name: "Tech Solutions",
      description: "Enterprise communication tools",
      lastUpdated: "2025-03-28T14:45:00Z"
    }
  ]);
  
  const [newProject, setNewProject] = useState({
    name: "",
    description: ""
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }
    
    const project: Project = {
      id: `${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      lastUpdated: new Date().toISOString()
    };
    
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "New project created successfully"
    });
  };
  
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Manage your projects and create new ones</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to your workspace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Project Name</label>
                  <Input 
                    id="name" 
                    placeholder="Enter project name" 
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input 
                    id="description" 
                    placeholder="Brief project description" 
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map(project => (
            <Card key={project.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="mt-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>Last updated:</span>
                  <span>{formatDate(project.lastUpdated)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Open Project</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
