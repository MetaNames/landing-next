import Link from "next/link";
import { Button } from "@/components/Button";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-white/70 text-xl mb-4">
          Page not found
        </p>
        <p className="text-white/50 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button
              variant="primary"
              icon={<FaHome />}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
