
import React from 'react';

const Billing: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Billing & Usage</h2>
      <p className="text-muted-foreground">
        Manage your subscription, billing information, and view usage statistics
      </p>
      
      <div className="mt-6 rounded-md bg-background p-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">Billing and usage information will be available soon</p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
