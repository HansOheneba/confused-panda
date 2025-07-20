import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold">Airban</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="hover:text-blue-200">
                Home
              </Link>
              <Link href="#" className="hover:text-blue-200">
                Our Doors
              </Link>
              <Link href="#" className="hover:text-blue-200">
                Properties
              </Link>
              <Link href="#" className="hover:text-blue-200">
                Company
              </Link>
              <Link href="#" className="hover:text-blue-200">
                About
              </Link>
            </nav>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
