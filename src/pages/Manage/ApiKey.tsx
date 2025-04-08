
import React from 'react';

const ApiKey: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">API Keys</h2>
      <p className="text-muted-foreground">
        Manage API keys for integrating with external systems
      </p>
      
      <div className="mt-6 rounded-md bg-background p-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">API key management will be available soon</p>
        </div>
      </div>
    </div>
  );
};

export default ApiKey;
