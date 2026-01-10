// src/layouts/AuthenticatedLayout.tsx
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthenticatedLayoutProps {
  children: ReactNode;
  userType: string | null;
}

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({
  children,
  userType,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Side navigation for authenticated pages */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:top-16 bg-card border-r border-border">
          <div className="flex flex-col flex-1 min-h-0 pt-5 pb-4">
            <nav className="flex-1 px-4 space-y-2">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/resume-builder"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Resume
              </Link>
              <Link
                to="/analysis"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Analysis
              </Link>
              <Link
                to="/jobs"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Jobs
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Mobile navigation bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex justify-around py-3">
            <Link
              to="/profile"
              className="flex flex-col items-center gap-1 text-xs"
            >
              Profile
            </Link>
            <Link
              to="/resume-builder"
              className="flex flex-col items-center gap-1 text-xs"
            >
              Resume
            </Link>
            <Link
              to="/analysis"
              className="flex flex-col items-center gap-1 text-xs"
            >
              Analysis
            </Link>
            <Link
              to="/jobs"
              className="flex flex-col items-center gap-1 text-xs"
            >
              Jobs
            </Link>
            <Link
              to="/settings"
              className="flex flex-col items-center gap-1 text-xs"
            >
              Settings
            </Link>
          </div>
        </nav>

        {/* Main content area */}
        <main className="flex-1 md:ml-64 p-6 pb-20 md:pb-6">{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
