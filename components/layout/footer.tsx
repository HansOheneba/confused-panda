import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* ... Footer content ... */}
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#" className="hover:text-white">
                Terms & Privacy
              </Link>
              <Link href="#" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                Facebook
              </Link>
              <Link href="#" className="hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
