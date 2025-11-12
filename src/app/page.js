'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import * as XLSX from 'xlsx'

export default function Home() {
  const [sheets, setSheets] = useState([])       // will hold sheet names
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const disabledSheets = ['basic', 'job code', 'test arrayformula']
  // 🧩 Fetch sheet names from Excel in public folder
   useEffect(() => {
    async function loadSheetNames() {
      try {
        // For client-side, you'll need to use a public sheet or set up an API route
        // Since this is client-side, we'll use the public export method
        const sheetId = '1KmB55ZXF3o0bjomXFOAtksAOpUTUwZTuLbZWLuLYSYU'
        
        // Using the export method for public sheets
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`)
        const arrayBuffer = await response.arrayBuffer()
        
        // Import XLSX dynamically to avoid server-side issues
        const XLSX = await import('xlsx')
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const allSheets = workbook.SheetNames
        
        const filteredSheets = allSheets.filter(
          (name) => !disabledSheets.includes(name.toLowerCase())
        )
        
        console.log("Available sheets:", allSheets)
        console.log("Filtered sheets:", filteredSheets)
        
        setSheets(filteredSheets)
      } catch (error) {
        console.error('Error loading Google Sheet:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSheetNames()
  }, [])


  const handleCardClick = (sheet) => {
    router.push(`/cards/${sheet}`)
  }

  const formatSheetName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-800 mb-3">
            Project Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access and manage your project data across different datasets
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-light text-blue-600">
              {loading ? '...' : sheets.length}
            </div>
            <div className="text-sm text-gray-500">Data Sheets</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-light text-green-600">4</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-light text-purple-600">100%</div>
            <div className="text-sm text-gray-500">Available</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-light text-orange-600">0</div>
            <div className="text-sm text-gray-500">Issues</div>
          </div>
        </div>

        {/* Sheets Grid */}
        {loading ? (
          <div className="text-center text-gray-500">Loading sheets...</div>
        ) : sheets.length === 0 ? (
          <div className="text-center text-gray-500">No sheets found in Excel file.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sheets.map((sheet, index) => (
              <div
                key={sheet}
                onClick={() => handleCardClick(sheet)}
                className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index % 4 === 0
                          ? 'bg-blue-500'
                          : index % 4 === 1
                          ? 'bg-green-500'
                          : index % 4 === 2
                          ? 'bg-purple-500'
                          : 'bg-orange-500'
                      }`}
                    />
                    <div>
                      <h3 className="text-lg font-normal text-gray-800 group-hover:text-blue-600 transition-colors">
                        {formatSheetName(sheet)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Project dataset
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <span>Click to explore</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {sheet}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Select any dataset to view detailed project information
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
