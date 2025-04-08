
import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Notification Preferences</h2>
      <p className="text-muted-foreground">
        Customize how and when you receive system notifications
      </p>
      
      <div className="mt-6 rounded-md bg-background p-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">Notification preference settings will be available soon</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
