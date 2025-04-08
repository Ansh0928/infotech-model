
import React from "react";
import { useUserContext } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, PlusCircle } from "lucide-react";

interface ProjectSwitcherProps {
  isCollapsed: boolean;
  showProjectSwitcher: boolean;
  setShowProjectSwitcher: (value: boolean) => void;
}

const ProjectSwitcher = ({ isCollapsed, showProjectSwitcher, setShowProjectSwitcher }: ProjectSwitcherProps) => {
  const { userData } = useUserContext();

  const projects = [
    { name: "InfoTech Brains", id: "1" },
    { name: "Digital Dynamics", id: "2" },
    { name: "Tech Solutions", id: "3" },
  ];

  return (
    <DropdownMenu open={showProjectSwitcher} onOpenChange={setShowProjectSwitcher}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`w-full justify-start p-2 h-auto text-start ${isCollapsed ? 'px-2' : ''}`}
        >
          <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'items-center gap-3'}`}>
            <Avatar className={`size-8 ${isCollapsed ? 'mb-1' : ''}`}>
              <AvatarImage src={userData?.name?.charAt(0) || 'U'} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {userData?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate max-w-[140px]">
                    {userData?.company || 'InfoTech Brains'}
                  </p>
                  <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                  {userData?.email || 'user@example.com'}
                </p>
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align={isCollapsed ? "center" : "start"}>
        <div className="p-2">
          <div className="text-sm font-medium">Projects</div>
          <div className="mt-2 space-y-1">
            {projects.map(project => (
              <DropdownMenuItem key={project.id} className="cursor-pointer">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">
                    {project.name[0]}
                  </div>
                  <span>{project.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="cursor-pointer mt-2">
              <div className="flex items-center text-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Create new project</span>
              </div>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSwitcher;
