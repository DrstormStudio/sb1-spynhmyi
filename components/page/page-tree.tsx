"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronRight, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageCreateButton } from "./page-create-button";

interface PageTreeProps {
  workspaceId: string;
  pages: {
    id: string;
    title: string;
    children?: Array<{
      id: string;
      title: string;
      children?: Array<any>;
    }>;
  }[];
}

export function PageTree({ workspaceId, pages }: PageTreeProps) {
  const params = useParams();
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

  const renderTree = (pages: PageTreeProps["pages"], level = 0) => {
    return pages.map((page) => {
      const hasChildren = page.children && page.children.length > 0;
      const isExpanded = expanded.has(page.id);
      const isActive = params.pageId === page.id;

      return (
        <div key={page.id}>
          <div
            className={cn(
              "flex items-center py-1 px-2 hover:bg-accent rounded-md cursor-pointer",
              { "bg-accent": isActive }
            )}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
          >
            <div
              className="flex items-center flex-1"
              onClick={() => hasChildren && toggleNode(page.id)}
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
              <Link
                href={`/workspace/${workspaceId}/page/${page.id}`}
                className="flex-1 truncate"
              >
                {page.title}
              </Link>
            </div>
            <PageCreateButton workspaceId={workspaceId} parentId={page.id} />
          </div>
          {hasChildren && isExpanded && renderTree(page.children!, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-semibold">Pages</h2>
        <PageCreateButton workspaceId={workspaceId} />
      </div>
      <div className="space-y-1">{renderTree(pages)}</div>
    </div>
  );
}