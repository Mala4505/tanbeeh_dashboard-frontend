import React, { useState } from "react";
import { Tabs, Tab, Button, Switch, Typography, Tooltip } from "@mui/material";
import { roles, accessMatrixDefaults } from "../utils/accessConfig";
import { useAuth } from "../context/AuthContext";

const DataAccess = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState("Prefect");
  const [accessMatrix, setAccessMatrix] = useState(accessMatrixDefaults);
  const [previewRole, setPreviewRole] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const dataSections = Object.keys(accessMatrixDefaults[selectedRole]);

  const handleToggle = (section) => {
    const updated = {
      ...accessMatrix,
      [selectedRole]: {
        ...accessMatrix[selectedRole],
        [section]: !accessMatrix[selectedRole][section],
      },
    };
    setAccessMatrix(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: persist accessMatrix to backend
    setHasChanges(false);
  };

  const handleReset = () => {
    setAccessMatrix(accessMatrixDefaults);
    setHasChanges(false);
  };

  const handlePreview = () => {
    setPreviewRole(selectedRole);
  };

  return (
    // <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded shadow">
    <div className="p-6 space-y-6">
      <Typography variant="h5" gutterBottom>
        Data Access
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-6">
        Control which roles can view or interact with specific data sections.
      </Typography>

      {/* Role Tabs */}
      <Tabs
        value={selectedRole}
        onChange={(e, newRole) => setSelectedRole(newRole)}
        variant="scrollable"
        scrollButtons="auto"
        className="mb-6"
      >
        {roles.map((role) => (
          <Tab key={role} label={role} value={role} />
        ))}
      </Tabs>

      {/* Access Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {dataSections.map((section) => (
          <div
            key={section}
            className="flex items-center justify-between bg-gray-100 p-3 rounded"
          >
            <Tooltip title={`Toggle access to ${section}`} arrow>
              <Typography variant="body1">{section}</Typography>
            </Tooltip>
            <Switch
              checked={accessMatrix[selectedRole][section]}
              onChange={() => handleToggle(section)}
              color="primary"
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="contained"
          color="primary"
          disabled={!hasChanges}
          onClick={handleSave}
        >
          Save Changes
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button variant="text" onClick={handlePreview}>
          Preview as {selectedRole}
        </Button>
      </div>

      {/* Preview Mode */}
      {previewRole && (
        <div className="mt-8 border-t pt-4">
          <Typography variant="subtitle1" gutterBottom>
            Previewing as <strong>{previewRole}</strong>
          </Typography>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {Object.entries(accessMatrix[previewRole])
              .filter(([_, hasAccess]) => hasAccess)
              .map(([section]) => (
                <li key={section}>{section}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataAccess;
