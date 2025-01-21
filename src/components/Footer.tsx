//footer

import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
export const Footer = () => {
   return (
     <footer className="bg-[#171717] text-white py-8 border-t border-gray-600 ">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Column 1 */}
           <div>
             <h3 className="text-lg font-semibold">E-Governance</h3>
             <p className="mt-4 text-sm">
               Empowering education through digital transformation and
               innovative learning solutions.
             </p>
             <div className="flex space-x-4 mt-4">
               <a
                 href="#"
                 className="text-gray-400 hover:text-white"
                 aria-label="Facebook"
               >
                 <FontAwesomeIcon icon={faFacebookF} size="lg" />
               </a>
               <a
                 href="#"
                 className="text-gray-400 hover:text-white"
                 aria-label="Twitter"
               >
                 <FontAwesomeIcon icon={faTwitter} size="lg" />
               </a>
               <a
                 href="#"
                 className="text-gray-400 hover:text-white"
                 aria-label="LinkedIn"
               >
                 <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
               </a>
             </div>
           </div>

           {/* Column 2 */}
           <div>
             <h3 className="text-lg font-semibold">Quick Links</h3>
             <ul className="mt-4 space-y-2">
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Programs
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Admissions
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Courses
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Facilities
                 </a>
               </li>
             </ul>
           </div>

           {/* Column 3 */}
           <div>
             <h3 className="text-lg font-semibold">Support</h3>
             <ul className="mt-4 space-y-2">
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Student Portal
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Help Center
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Technical Support
                 </a>
               </li>
               <li>
                 <a href="#" className="text-gray-400 hover:text-white text-sm">
                   Contact Us
                 </a>
               </li>
             </ul>
           </div>

           {/* Column 4 */}
           <div>
             <h3 className="text-lg font-semibold">Newsletter</h3>
             <p className="mt-4 text-sm">
               Subscribe to our newsletter for updates
             </p>
             <div className="mt-4 flex">
               <input
                 type="email"
                 placeholder="Your email address"
                 className="w-full px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <Button
                 variant={"outline"}
                 className="ml-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-r-md"
               >
                 Subscribe
               </Button>
             </div>
           </div>
         </div>

         <div className="mt-8 border-t border-gray-400 pt-4 flex flex-col md:flex-row justify-between text-sm text-gray-500">
           <p>&copy; 2024 E-Governance. All rights reserved.</p>
           <div className="flex space-x-4">
             <a href="#" className="hover:underline">
               Privacy Policy
             </a>
             <a href="#" className="hover:underline">
               Terms of Service
             </a>
             <a href="#" className="hover:underline">
               Cookie Policy
             </a>
           </div>
         </div>
       </div>
     </footer>
   );
};



