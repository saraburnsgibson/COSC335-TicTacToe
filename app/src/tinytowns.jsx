// tinytowns.js
import React from 'react';
import create from 'zustand';

// Define five possible resources.
const resources = ['Wood', 'Brick', 'Sheep', 'Wheat', 'Ore'];

// This function computes the active resource based on widget selections.
// For simplicity, we use the first widget's value modulo the available resources.
function computeActiveResource(widgetSelections) {
  if (!widgetSelections || widgetSelections.length === 0) return null;
  return resources[widgetSelections[0] % resources.length];
}

// Create a Zustand store to manage the game state.
export const useTownStore = create((set, get) => ({
  // A 4x4 grid (16 cells) representing the town layout.
  grid: Array(16).fill(null),
  
  // Three widget selections (using numeric indices for resource reference).
  widgetSelections: [0, 0, 0],
  
  // Derived state: the active resource (computed from the widget selections).
  activeResource: computeActiveResource([0, 0, 0]),
  
  // Update a specific widget selection and re-compute the active resource.
  updateWidget: (widgetIndex, value) => {
    const widgetSelections = [...get().widgetSelections];
    widgetSelections[widgetIndex] = value;
    set({
      widgetSelections,
      activeResource: computeActiveResource(widgetSelections)
    });
  },
  
  // Place the active resource into the grid cell if it's empty.
  placeResource: (cellIndex) => {
    const { grid, activeResource } = get();
    if (grid[cellIndex] !== null || !activeResource) return;
    const newGrid = [...grid];
    newGrid[cellIndex] = activeResource;
    set({ grid: newGrid });
  },
  
  // Reset the grid (clear the town).
  resetGrid: () => set({ grid: Array(16).fill(null) })
}));

// The main TinyTowns component.
export function TownBoard() {
  // Subscribe to the necessary parts of the store.
  const { grid, activeResource, widgetSelections, updateWidget, placeResource, resetGrid } = useTownStore(state => ({
    grid: state.grid,
    activeResource: state.activeResource,
    widgetSelections: state.widgetSelections,
    updateWidget: state.updateWidget,
    placeResource: state.placeResource,
    resetGrid: state.resetGrid,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TinyTowns</h1>
      
      {/* Widget selection panel */}
      <div className="mb-4">
        <h2 className="text-xl">Select Widgets</h2>
        <div className="flex space-x-4">
          {widgetSelections.map((sel, idx) => (
            <select
              key={idx}
              value={sel}
              onChange={(e) => updateWidget(idx, parseInt(e.target.value))}
              className="border rounded p-1"
            >
              {resources.map((res, i) => (
                <option key={i} value={i}>
                  {res}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      
      {/* Display active resource */}
      <div className="mb-4">
        <p>Active Resource: {activeResource}</p>
      </div>
      
      {/* Render the town grid as a 4x4 block of buttons */}
      <div className="grid grid-cols-4 gap-2">
        {grid.map((cell, i) => (
          <button
            key={i}
            onClick={() => placeResource(i)}
            className="w-20 h-20 border flex justify-center items-center"
          >
            {cell || ''}
          </button>
        ))}
      </div>
      
      {/* Reset Town button */}
      <div className="mt-4">
        <button onClick={resetGrid} className="bg-green-500 px-4 py-2 rounded">
          Reset Town
        </button>
      </div>
    </div>
  );
}
