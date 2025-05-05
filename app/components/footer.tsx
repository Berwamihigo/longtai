export default function Footer() {
    return (
      <footer className="bg-gray-200 w-full flex flex-col  px-6 py-8 md:px-20 md:py-12">
        <div className="flex justify-around ">
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            <img alt="Longtai" src="/assets/longtai.png" className="h-40 w-40" />
  
            {/* Row 1 Links */}
            <ul className="flex flex-wrap gap-4 text-sm text-gray-700">
              <li className="hover:underline cursor-pointer">Contact Us</li>
              <li className="hover:underline cursor-pointer">Language</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
  
            {/* Company Info */}
            <p className="text-sm font-semibold text-gray-700">
              Longtai Corporation Rwanda
            </p>
  
            {/* Row 2 Links */}
            <ul className="flex flex-wrap gap-4 text-sm text-gray-700">
              <li className="hover:underline cursor-pointer">Terms & Conditions</li>
              <li className="hover:underline cursor-pointer">Privacy Notice</li>
              <li className="hover:underline cursor-pointer">Site Map</li>
            </ul>
          </div>
  
          {/* Right Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-[#F2A900] ">Quick Links</h2>
            <ul className="flex flex-col gap-3 text-sm text-gray-700 mb-6">
              <li className="hover:underline cursor-pointer">Vehicles</li>
              <li className="hover:underline cursor-pointer">Shopping Tools</li>
              <li className="hover:underline cursor-pointer">Owners</li>
              <li className="hover:underline cursor-pointer">Search Inventory</li>
              <li className="hover:underline cursor-pointer">Favorites</li>
              <li className="hover:underline cursor-pointer">My Account</li>
              <li></li>
            </ul>
          </div>
        </div>
  
        {/* Optional Divider */}
        <hr className="my-8 border-t border-gray-300" />
  
        {/* Footer Note */}
        <div className="text-center flex align-center justify-center mt-7 text-sm text-gray-500">Powered by LUTIASC</div>
      </footer>
    );
  }
  