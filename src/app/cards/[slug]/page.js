'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// Fallback data in case JSON files are missing
const fallbackData = {
  sheet1: [
    {
      sl: 1,
      "Project Name": "Education Development Program",
      Country: "Bangladesh",
      "Donor Name": "World Bank",
      "Client Name": "Ministry of Education",
      Sector: "Education",
      Lead: "John Smith",
      "Lead Status": "Active",
      Budget: 2500000,
      Deadline: "2024-12-31",
      "Project Code": "EDP-001",
      Duration: "24 months",
      Process: "Implementation",
      Partner: "Local NGO",
      Status: "In Progress",
      Challenges: "Funding delays",
      Comments: "Good progress so far"
    }
  ],
  sheet2: [
    {
      sl: 1,
      "Project Name": "Agricultural Development",
      Country: "India",
      "Donor Name": "Asian Development Bank",
      "Client Name": "Ministry of Agriculture",
      Sector: "Agriculture",
      Lead: "Mike Chen",
      "Lead Status": "Active",
      Budget: 3200000,
      Deadline: "2025-03-15",
      "Project Code": "AGRI-001",
      Duration: "36 months",
      Process: "Implementation",
      Partner: "Local Farmers Association",
      Status: "Ongoing",
      Challenges: "Weather conditions",
      Comments: "Successful pilot phase"
    }
  ]
}

// Card Detail Component
function ProjectDetail({ project, onClose }) {
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false)

  useEffect(() => {
    if (project.deadline) {
      setIsDeadlinePassed(new Date(project.deadline) < new Date())
    }
  }, [project.deadline])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
              <p className="text-gray-600">{project.projectCode}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project ID:</span>
                  <span className="font-medium">{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sector:</span>
                  <span className="font-medium">{project.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {project.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Financial Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium text-green-600">${project.budget?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className={`font-medium ${isDeadlinePassed ? 'text-red-600' : 'text-gray-800'}`}>
                    {project.deadline}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Process:</span>
                  <span className="font-medium">{project.process}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stakeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Stakeholders</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block mb-1">Donor:</span>
                  <span className="font-medium">{project.donor}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Client:</span>
                  <span className="font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Partner:</span>
                  <span className="font-medium">{project.partner}</span>
                </div>
              </div>
            </div>

            {/* Project Team */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Project Team</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block mb-1">Lead:</span>
                  <span className="font-medium">{project.lead}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Lead Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    project.leadStatus === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : project.leadStatus === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.leadStatus}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Project Status:</span>
                  <span className="font-medium">{project.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Challenges & Comments */}
          <div className="space-y-6">
            {project.challenges && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Challenges</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{project.challenges}</p>
                </div>
              </div>
            )}

            {project.comments && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Comments</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">{project.comments}</p>
                </div>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Project Summary</h3>
            <p className="text-sm text-gray-600">
              {project.name} is a {project.sector?.toLowerCase()} project in {project.country} with a budget of ${project.budget?.toLocaleString()}. 
              The project is currently {project.status?.toLowerCase()} and led by {project.lead}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, onClick }) {
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false)

  useEffect(() => {
    if (project.deadline) {
      setIsDeadlinePassed(new Date(project.deadline) < new Date())
    }
  }, [project.deadline])

  return (
    <div 
      onClick={() => onClick(project)}
      className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 bg-white cursor-pointer transform hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-800 text-lg leading-tight">
            {project.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{project.projectCode}</p>
        </div>
        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800">
          {project.id}
        </span>
      </div>

      {/* Basic Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Country</span>
          <span className="font-medium text-gray-800">{project.country}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Sector</span>
          <span className="font-medium text-gray-800">{project.sector}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Donor</span>
          <span className="font-medium text-gray-800 text-sm">{project.donor}</span>
        </div>
      </div>

      {/* Status & Budget */}
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Deadline</span>
          <span className={`text-sm font-medium ${isDeadlinePassed ? 'text-red-600' : 'text-gray-800'}`}>
            {project.deadline}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="text-sm font-medium text-green-600">
            ${project.budget?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            project.leadStatus === 'Active' 
              ? 'bg-green-100 text-green-800'
              : project.leadStatus === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.leadStatus}
          </span>
        </div>
      </div>

      {/* Challenges & Comments Preview */}
      {(project.challenges || project.comments) && (
        <div className="border-t border-gray-100 pt-3 mt-3">
          {project.challenges && (
            <div className="text-xs text-red-600 mb-1 truncate">
              <strong>Challenge:</strong> {project.challenges}
            </div>
          )}
          {project.comments && (
            <div className="text-xs text-blue-600 truncate">
              <strong>Comment:</strong> {project.comments}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2 text-center">
            Click to view full details
          </div>
        </div>
      )}
    </div>
  )
}

export default function CardComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)
  const params = useParams()
  const router = useRouter()
  const sheetName = params.slug

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)
        
        // Try to fetch from JSON file first
        const url = `/data/${sheetName}.json`
        console.log('Fetching data from:', url)
        
        const response = await axios.get(url, {
          timeout: 5000,
          validateStatus: function (status) {
            return status === 200 // Only accept 200 status
          }
        })
        
        setData(response.data)
        console.log('Data loaded successfully from JSON file')
        
      } catch (err) {
        console.error('Error fetching data from JSON:', err)
        
        // If JSON file not found, use fallback data
        if (fallbackData[sheetName]) {
          console.log('Using fallback data for:', sheetName)
          setData(fallbackData[sheetName])
          setUsingFallback(true)
          setError(`Note: Using sample data. To use your own data, create public/data/${sheetName}.json`)
        } else {
          setError(`Data not found for "${sheetName}". Please create public/data/${sheetName}.json file.`)
          setData([])
        }
      } finally {
        setLoading(false)
      }
    }

    if (sheetName) {
      fetchData()
    } else {
      setError('No sheet name provided')
      setLoading(false)
    }
  }, [sheetName])

  const handleBack = () => {
    router.back()
  }

  const handleCardClick = (project) => {
    setSelectedProject(project)
  }

  const handleCloseDetail = () => {
    setSelectedProject(null)
  }

  // Function to extract projects from your specific data structure
  const getProjects = () => {
    if (!data) return []
    
    if (Array.isArray(data)) {
      return data.map(item => ({
        id: item.sl || item.id || 'N/A',
        name: item["Project Name"] || item["Project name"] || item.projectName || 'Unnamed Project',
        deadline: item["Confirmation Deadline"] || item.Deadline || item.deadline || 'No deadline',
        country: item.Country || item.country || 'Unknown',
        donor: item["Donor Name"] || item.Donor || item.donor || 'Unknown donor',
        client: item["Client Name"] || item.Client || item.client || 'Unknown client',
        sector: item.Sector || item.sector || 'General',
        lead: item.Lead || item.lead || 'Unassigned',
        leadStatus: item["Lead Status"] || item.Status || item.status || 'Unknown',
        partner: item.Partner || item.partner || 'No partner',
        status: item.Status || item.status || item["Project Status"] || 'Unknown',
        projectCode: item["Project Code"] || item.Code || item.code || 'N/A',
        budget: parseFloat(item["Assigned To Budget"] || item.Budget || item.budget || 0),
        duration: item.Duration || item.duration || 'Not specified',
        process: item.Process || item.process || 'Not specified',
        challenges: item.challanges || item.Challenges || item.challenges || '',
        comments: item.Coments || item.Comments || item.comments || ''
      }))
    }
    
    return []
  }

  const projects = getProjects()

  // Calculate statistics
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.leadStatus?.toLowerCase().includes('active')).length,
    pending: projects.filter(p => p.leadStatus?.toLowerCase().includes('pending')).length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  }

  if (error && !usingFallback) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">Data File Not Found</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-3 text-sm text-red-700 text-left bg-red-100 p-4 rounded-lg">
              <p><strong>To fix this issue:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Create <code>public/data/{sheetName}.json</code> file</li>
                <li>Add valid JSON data to the file</li>
                <li>Redeploy your application</li>
                <li>Make sure the file name matches exactly: <strong>{sheetName}.json</strong></li>
              </ul>
            </div>
            <div className="mt-6 space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <div className="text-lg text-gray-600">Loading {sheetName} data...</div>
            <div className="text-sm text-gray-500">Loading from: /data/{sheetName}.json</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Card Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold capitalize text-gray-800">
                {sheetName?.replace(/([A-Z])/g, ' $1')} 
              </h1>
              <p className="text-gray-600 mt-1">Project Data Overview</p>
              <p className="text-sm text-gray-500">
                Data source: {usingFallback ? 'Sample Data' : `/data/${sheetName}.json`}
              </p>
            </div>
          </div>

          {/* Warning message if using fallback */}
          {usingFallback && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-yellow-800">
                  Using sample data. To use your own data, create <code>public/data/{sheetName}.json</code>
                </span>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
              <div className="text-sm text-blue-600">Total Projects</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-800">{stats.active}</div>
              <div className="text-sm text-green-600">Active Leads</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
              <div className="text-sm text-yellow-600">Pending Leads</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-800">
                ${(stats.totalBudget / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-purple-600">Total Budget</div>
            </div>
          </div>

          {/* Projects List */}
          {projects.length > 0 ? (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id || index} 
                    project={project} 
                    onClick={handleCardClick}
                  />
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Showing {projects.length} projects • Click on any card to view details
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm">No project data available in {sheetName}</p>
              <button
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleCloseDetail} 
        />
      )}
      <Footer />
    </div>
  )
}