import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-between gap-24">
        {/* Filters */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="flex space-x-4 font-extralight">
            <p className="text-sm">All</p>
            <p className="text-sm">Logo</p>
          </div>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm font-extralight">About Us</p>
          <p className="text-sm mt-1 font-extralight">Contact</p>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3 mt-1">
            <div className="bg-indigo-800 text-white p-2 rounded-full">
              <Facebook size={16} />
            </div>
            <div className="bg-indigo-800 text-white p-2 rounded-full">
              <Twitter size={16} />
            </div>
            <div className="bg-indigo-800 text-white p-2 rounded-full">
              <Instagram size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
     <div className="bg-indigo-900 text-sm text-white py-3">
  <div className="max-w-6xl mx-auto px-4">
    <p className="text-left">© 2024 American</p>
  </div>
</div>
    </footer>
  );
}

