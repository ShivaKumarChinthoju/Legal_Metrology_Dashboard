import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/7cfa65a8-f1b1-436c-a535-d02fb995f38e.png" 
              alt="Garudalytics Logo" 
              className="h-6 w-auto object-contain"
            />
            <span className="text-sm text-muted-foreground">
              Powered by Garudalytics
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 Garudalytics & Upidx Private Limited. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;