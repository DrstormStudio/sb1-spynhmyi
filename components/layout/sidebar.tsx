"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
}

export function Sidebar() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([]));

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expanded);
    if (expanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const renderTree = (node: TreeNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-accent rounded-md cursor-pointer",
            { "bg-accent": isExpanded }
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => toggleNode(node.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
            )
          ) : (
            <File className="h-4 w-4 mr-1 flex-shrink-0" />
          )}
          <span className="text-sm truncate">{node.title}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Example data
  const treeData: TreeNode = {
    id: "1",
    title: "Documentation",
    children: [
      {
        id: "2",
        title: "Getting Started",
        children: [
          { id: "3", title: "Installation" },
          { id: "4", title: "Configuration" },
        ],
      },
      {
        id: "5",
        title: "Guides",
        children: [
          { id: "6", title: "Basic Usage" },
          { id: "7", title: "Advanced Topics" },
        ],
      },
    ],
  };

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-start">
              <Folder className="mr-2 h-4 w-4" />
              Select Workspace
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Create Workspace
            </DropdownMenuItem>
            <DropdownMenuItem>Workspace 1</DropdownMenuItem>
            <DropdownMenuItem>Workspace 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto px-2 py-2">
        {renderTree(treeData)}
      </div>
    </div>
  );
}