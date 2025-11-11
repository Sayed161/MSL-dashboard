"use client";
import Image from "next/image";
import logo from "../Images/word_map_location (1).png";
import { Mail, Linkedin, Globe, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0A2538] text-white"   style={{ fontFamily:" 'Inter', sans-serif" }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-8 h-0.5 bg-red-500"></span>
              <h3 className="text-sm font-semibold text-white">Address</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start text-gray-300 text-sm">
                <p className="leading-relaxed">
                  <span className="text-xl text-red-500 font-bold">
                    {" "}
                    Bangladesh Office
                  </span>
                  <br />
                  Maxwell Stamp Ltd.
                  <br />
                  House # 2 (Ground Floor)
                  <br />
                  Road # 119, Gulshan-2
                  <br />
                  Dhaka – 1212, Bangladesh
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex flex-col  text-gray-300">
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-3" />
                    +88 02 8834384
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-3" />
                    +88 02 222291236
                  </span>
                </p>
                <p className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3" />
                  info@maxwellstampltd.com

                </p>
              </div>
            </div>
          </div>

          {/* Our Location */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-8 h-0.5 bg-red-500"></span>
              <h3 className="text-sm font-semibold  text-white">
                Our Location
              </h3>
            </div>
            <span className="text-xl text-red-500 font-bold">We are here</span>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={logo}
                alt="Company location map"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <p className="text-sm text-gray-400">
              Find us easily with our interactive map
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-8 h-0.5 bg-red-500"></span>
              <h3 className="text-sm font-semibold  text-white">Quick Links</h3>
            </div>
            <div className="flex flex-col space-y-2 text-sm ">
              <a
                href="/faq"
                className="text-gray-300 hover:text-white transition-colors duration-200 py-1 hover:translate-x-2 transform transition-transform"
              >
                FAQ
              </a>
              <a
                href="/services"
                className="text-gray-300 hover:text-white transition-colors duration-200 py-1 hover:translate-x-2 transform transition-transform"
              >
                Our Services
              </a>
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors duration-200 py-1 hover:translate-x-2 transform transition-transform"
              >
                Dashboard MSL
              </a>
              <a
                href="/careers"
                className="text-gray-300 hover:text-white transition-colors duration-200 py-1 hover:translate-x-2 transform transition-transform"
              >
                Careers & Opportunities
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-8 h-0.5 bg-red-500"></span>
              <h3 className="text-sm font-semibold  text-white">
                Get In Touch
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Stay connected with the latest updates and opportunities. Follow
                us on our social channels.
              </p>

              <div className="flex space-x-4">
                <a
                  href="mailto:info@maxwellstampltd.com"
                  className="text-white hover:text-white transition-colors duration-200 bg-red-500 p-2 rounded-lg hover:bg-blue-600"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/maxwellstampltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors duration-200 bg-red-500 p-2 rounded-lg hover:bg-blue-600"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://maxwellstampltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors duration-200 bg-red-500 p-2 rounded-lg hover:bg-blue-600"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>

              <div className="pt-4">
                <p className="text-gray-400 text-xs">
                  Business Hours:
                  <br />
                  sun-Thus: 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} {" "}
              <span className="text-black font-bold">Maxwell Stamp Ltd.</span>{" "}
              All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
