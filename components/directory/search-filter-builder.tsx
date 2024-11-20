"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface SearchFilterBuilderProps {
  availableFilters: { id: string; title: string }[];
  searchBarFilters: string[];
  searchPageFilters: string[];
  onSearchBarFiltersChange: (filters: string[]) => void;
  onSearchPageFiltersChange: (filters: string[]) => void;
}

export function SearchFilterBuilder({
  availableFilters,
  searchBarFilters,
  searchPageFilters,
  onSearchBarFiltersChange,
  onSearchPageFiltersChange,
}: SearchFilterBuilderProps) {
  const addFilter = (container: "searchBar" | "searchPage", filterId: string) => {
    if (container === "searchBar") {
      if (!searchBarFilters.includes(filterId)) {
        onSearchBarFiltersChange([...searchBarFilters, filterId]);
      }
    } else {
      if (!searchPageFilters.includes(filterId)) {
        onSearchPageFiltersChange([...searchPageFilters, filterId]);
      }
    }
  };

  const removeFilter = (container: "searchBar" | "searchPage", filterId: string) => {
    if (container === "searchBar") {
      onSearchBarFiltersChange(searchBarFilters.filter(id => id !== filterId));
    } else {
      onSearchPageFiltersChange(searchPageFilters.filter(id => id !== filterId));
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceContainer = result.source.droppableId;
    const destinationContainer = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceContainer === destinationContainer) {
      const items = sourceContainer === "searchBar" ? [...searchBarFilters] : [...searchPageFilters];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, removed);

      if (sourceContainer === "searchBar") {
        onSearchBarFiltersChange(items);
      } else {
        onSearchPageFiltersChange(items);
      }
    } else {
      const sourceItems = sourceContainer === "searchBar" ? [...searchBarFilters] : [...searchPageFilters];
      const destItems = destinationContainer === "searchBar" ? [...searchBarFilters] : [...searchPageFilters];
      const [removed] = sourceItems.splice(sourceIndex, 1);
      destItems.splice(destinationIndex, 0, removed);

      if (sourceContainer === "searchBar") {
        onSearchBarFiltersChange(sourceItems);
        onSearchPageFiltersChange(destItems);
      } else {
        onSearchBarFiltersChange(destItems);
        onSearchPageFiltersChange(sourceItems);
      }
    }
  };

  const getAvailableFilters = (container: "searchBar" | "searchPage") => {
    const usedFilters = [...searchBarFilters, ...searchPageFilters];
    return availableFilters.filter(filter => !usedFilters.includes(filter.id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Search Bar Filters</CardTitle>
            <Select onValueChange={(value) => addFilter("searchBar", value)}>
              <SelectTrigger className="w-[180px]">
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Filter</span>
              </SelectTrigger>
              <SelectContent>
                {getAvailableFilters("searchBar").map((filter) => (
                  <SelectItem key={filter.id} value={filter.id}>
                    {filter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Droppable droppableId="searchBar">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {searchBarFilters.map((id, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 bg-background border rounded-md"
                        >
                          <span>{availableFilters.find(f => f.id === id)?.title}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFilter("searchBar", id)}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Search Page Filters</CardTitle>
            <Select onValueChange={(value) => addFilter("searchPage", value)}>
              <SelectTrigger className="w-[180px]">
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Filter</span>
              </SelectTrigger>
              <SelectContent>
                {getAvailableFilters("searchPage").map((filter) => (
                  <SelectItem key={filter.id} value={filter.id}>
                    {filter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Droppable droppableId="searchPage">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {searchPageFilters.map((id, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 bg-background border rounded-md"
                        >
                          <span>{availableFilters.find(f => f.id === id)?.title}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFilter("searchPage", id)}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      </div>
    </DragDropContext>
  );
}