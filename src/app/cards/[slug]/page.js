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
    "sl": 1,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "World Bank",
    "Client Name": "Ministry of Education",
    "Project Name": "Digital Learning for All",
    "Sector": "Education",
    "Lead": "Sheikh Rahman",
    "Lead Status": "Active",
    "Partner": "TechVision Ltd",
    "Confirmation Deadline": "2024-05-20",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "EDU-2401",
    "Assigned To Budget": 600000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-05-10",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Delay in hardware shipment",
    "Coments": "Implementation 30% completed"
  },
  {
    "sl": 2,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "UNDP",
    "Client Name": "Ministry of Health",
    "Project Name": "Rural Health Support",
    "Sector": "Health",
    "Lead": "Anita Das",
    "Lead Status": "Active",
    "Partner": "MediServe Pvt Ltd",
    "Confirmation Deadline": "2024-07-01",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "HLT-2402",
    "Assigned To Budget": 800000,
    "Duration": "18 months",
    "Clarification Deadline": "2024-06-25",
    "Selection method Submission Prep (RFP)": "Closed Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Cleared",
    "Compliance (RFP)": "Compliant",
    "challanges": "Shortage of field staff",
    "Coments": "Strong donor interest"
  },
  {
    "sl": 3,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "ADB",
    "Client Name": "Nepal Education Board",
    "Project Name": "eSchool Initiative",
    "Sector": "Education",
    "Lead": "Rohit Lama",
    "Lead Status": "Pending",
    "Partner": "BrightLearn Pvt Ltd",
    "Confirmation Deadline": "2024-09-15",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "EDU-2403",
    "Assigned To Budget": 500000,
    "Duration": "10 months",
    "Clarification Deadline": "2024-09-05",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Submitted",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Connectivity issues in rural areas",
    "Coments": "Waiting for donor evaluation"
  },
  {
    "sl": 4,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "WHO",
    "Client Name": "Health Department",
    "Project Name": "Immunization Drive 2024",
    "Sector": "Health",
    "Lead": "Saima Rauf",
    "Lead Status": "Active",
    "Partner": "CareHealth Pvt",
    "Confirmation Deadline": "2024-03-10",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "HLT-2404",
    "Assigned To Budget": 400000,
    "Duration": "9 months",
    "Clarification Deadline": "2024-03-05",
    "Selection method Submission Prep (RFP)": "Restricted Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Cold storage logistics",
    "Coments": "Good team performance"
  },
  {
    "sl": 5,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "UNICEF",
    "Client Name": "Ministry of Primary Education",
    "Project Name": "School Nutrition Improvement",
    "Sector": "Education",
    "Lead": "Tasnim Hossain",
    "Lead Status": "Active",
    "Partner": "FoodCare BD",
    "Confirmation Deadline": "2024-10-01",
    "Process": "Proposal",
    "Status": "Awarded",
    "Project Code": "EDU-2405",
    "Assigned To Budget": 350000,
    "Duration": "11 months",
    "Clarification Deadline": "2024-09-25",
    "Selection method Submission Prep (RFP)": "Direct Selection",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "High food prices",
    "Coments": "Need donor extension"
  },
  {
    "sl": 6,
    "Year": 2024,
    "Country": "Sri Lanka",
    "Donor Name": "UNESCO",
    "Client Name": "Education Council",
    "Project Name": "Teacher Training Upgrade",
    "Sector": "Education",
    "Lead": "Kavya Perera",
    "Lead Status": "Pending",
    "Partner": "SkillBoost Solutions",
    "Confirmation Deadline": "2024-08-10",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "EDU-2406",
    "Assigned To Budget": 450000,
    "Duration": "8 months",
    "Clarification Deadline": "2024-08-05",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Training location unconfirmed",
    "Coments": "Will finalize after budget approval"
  },
  {
    "sl": 7,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "Save the Children",
    "Client Name": "Education Trust Nepal",
    "Project Name": "Child Learning Enhancement",
    "Sector": "Education",
    "Lead": "Rina Tamang",
    "Lead Status": "Active",
    "Partner": "NextGen Nepal",
    "Confirmation Deadline": "2024-07-20",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "EDU-2407",
    "Assigned To Budget": 300000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-07-15",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Transport issues",
    "Coments": "Smooth field operation"
  },
  {
    "sl": 8,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "DFID",
    "Client Name": "Technical Education Board",
    "Project Name": "Vocational Skills Boost",
    "Sector": "Education",
    "Lead": "Farhan Alam",
    "Lead Status": "Active",
    "Partner": "SkillBridge BD",
    "Confirmation Deadline": "2024-09-05",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "EDU-2408",
    "Assigned To Budget": 700000,
    "Duration": "15 months",
    "Clarification Deadline": "2024-08-30",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Submitted",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Slow approval process",
    "Coments": "Awaiting fund release"
  },
  {
    "sl": 9,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "World Bank",
    "Client Name": "State Education Board",
    "Project Name": "Smart Classroom Project",
    "Sector": "Education",
    "Lead": "Ravi Kumar",
    "Lead Status": "Active",
    "Partner": "EduSmart Pvt Ltd",
    "Confirmation Deadline": "2024-06-10",
    "Process": "Bidding",
    "Status": "Awarded",
    "Project Code": "EDU-2409",
    "Assigned To Budget": 950000,
    "Duration": "20 months",
    "Clarification Deadline": "2024-05-30",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Software license issues",
    "Coments": "Phase 1 started"
  },
  {
    "sl": 10,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "UNESCO",
    "Client Name": "Ministry of Education",
    "Project Name": "Digital Literacy for Girls",
    "Sector": "Education",
    "Lead": "Sadia Khan",
    "Lead Status": "Pending",
    "Partner": "Learn4All Ltd",
    "Confirmation Deadline": "2024-11-10",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "EDU-2410",
    "Assigned To Budget": 250000,
    "Duration": "6 months",
    "Clarification Deadline": "2024-10-25",
    "Selection method Submission Prep (RFP)": "Direct Selection",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Delayed response from client",
    "Coments": "Follow-up scheduled next week"
  }
]
,
  sheet2: [
  {
    "sl": 1,
    "Year": 2025,
    "Country": "Bangladesh",
    "Donor Name": "Asian Development Bank",
    "Client Name": "Road Transport Authority",
    "Project Name": "Dhaka–Chittagong Highway Expansion",
    "Sector": "Infrastructure",
    "Lead": "Tanvir Hossain",
    "Lead Status": "Active",
    "Partner": "BuildRight Ltd",
    "Confirmation Deadline": "2025-04-30",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "INF-2501",
    "Assigned To Budget": 2400000,
    "Duration": "30 months",
    "Clarification Deadline": "2025-04-15",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Monsoon construction delays",
    "Coments": "Progress at 40%"
  },
  {
    "sl": 2,
    "Year": 2025,
    "Country": "India",
    "Donor Name": "World Bank",
    "Client Name": "Energy Board of India",
    "Project Name": "Solar Park Development Phase III",
    "Sector": "Energy",
    "Lead": "Ravi Kumar",
    "Lead Status": "Active",
    "Partner": "SunPower Solutions",
    "Confirmation Deadline": "2025-03-25",
    "Process": "Proposal",
    "Status": "Awarded",
    "Project Code": "ENG-2502",
    "Assigned To Budget": 1800000,
    "Duration": "24 months",
    "Clarification Deadline": "2025-03-15",
    "Selection method Submission Prep (RFP)": "Competitive Bidding",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Equipment import delays",
    "Coments": "Funding cleared"
  },
  {
    "sl": 3,
    "Year": 2025,
    "Country": "Nepal",
    "Donor Name": "JICA",
    "Client Name": "Ministry of Transport",
    "Project Name": "Mountain Tunnel Development",
    "Sector": "Infrastructure",
    "Lead": "Rohit Lama",
    "Lead Status": "Pending",
    "Partner": "GeoBuild Corp",
    "Confirmation Deadline": "2025-06-15",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "INF-2503",
    "Assigned To Budget": 1300000,
    "Duration": "28 months",
    "Clarification Deadline": "2025-06-10",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Submitted",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Terrain and landslide risks",
    "Coments": "Awaiting environmental clearance"
  },
  {
    "sl": 4,
    "Year": 2025,
    "Country": "Sri Lanka",
    "Donor Name": "UNDP",
    "Client Name": "Urban Development Authority",
    "Project Name": "Colombo Water Supply Upgrade",
    "Sector": "Infrastructure",
    "Lead": "Kavya Perera",
    "Lead Status": "Active",
    "Partner": "HydroWorks Ltd",
    "Confirmation Deadline": "2025-05-20",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "INF-2504",
    "Assigned To Budget": 950000,
    "Duration": "18 months",
    "Clarification Deadline": "2025-05-10",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Water pipeline sourcing issues",
    "Coments": "Phase 1 completed"
  },
  {
    "sl": 5,
    "Year": 2025,
    "Country": "Pakistan",
    "Donor Name": "World Bank",
    "Client Name": "Energy Department",
    "Project Name": "Wind Power Expansion",
    "Sector": "Energy",
    "Lead": "Sadia Khan",
    "Lead Status": "Pending",
    "Partner": "WindTech Solutions",
    "Confirmation Deadline": "2025-07-05",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "ENG-2505",
    "Assigned To Budget": 2000000,
    "Duration": "26 months",
    "Clarification Deadline": "2025-06-25",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "High maintenance cost",
    "Coments": "Requires technical review"
  },
  {
    "sl": 6,
    "Year": 2025,
    "Country": "Bangladesh",
    "Donor Name": "UN ESCAP",
    "Client Name": "Power Grid Company of Bangladesh",
    "Project Name": "Smart Grid Infrastructure Upgrade",
    "Sector": "Energy",
    "Lead": "Shakil Ahmed",
    "Lead Status": "Active",
    "Partner": "GridLink Ltd",
    "Confirmation Deadline": "2025-09-10",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENG-2506",
    "Assigned To Budget": 1500000,
    "Duration": "22 months",
    "Clarification Deadline": "2025-09-01",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Supply-chain disruption",
    "Coments": "Phase 2 starting soon"
  },
  {
    "sl": 7,
    "Year": 2025,
    "Country": "India",
    "Donor Name": "ADB",
    "Client Name": "Transport Department",
    "Project Name": "Electric Bus Fleet Deployment",
    "Sector": "Energy",
    "Lead": "Ravi Kumar",
    "Lead Status": "Active",
    "Partner": "Evolt Mobility",
    "Confirmation Deadline": "2025-10-15",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENG-2507",
    "Assigned To Budget": 2200000,
    "Duration": "20 months",
    "Clarification Deadline": "2025-10-05",
    "Selection method Submission Prep (RFP)": "Competitive Bidding",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Battery import approval",
    "Coments": "Pilot city testing underway"
  },
  {
    "sl": 8,
    "Year": 2025,
    "Country": "Nepal",
    "Donor Name": "UNDP",
    "Client Name": "Energy Board",
    "Project Name": "Micro Hydro Expansion",
    "Sector": "Energy",
    "Lead": "Rohit Lama",
    "Lead Status": "Pending",
    "Partner": "GreenHydro Nepal",
    "Confirmation Deadline": "2025-08-20",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "ENG-2508",
    "Assigned To Budget": 800000,
    "Duration": "16 months",
    "Clarification Deadline": "2025-08-10",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Low river flow in dry season",
    "Coments": "Feasibility study in progress"
  },
  {
    "sl": 9,
    "Year": 2025,
    "Country": "Sri Lanka",
    "Donor Name": "UN Habitat",
    "Client Name": "Urban Council",
    "Project Name": "Sustainable City Lighting",
    "Sector": "Infrastructure",
    "Lead": "Kavya Perera",
    "Lead Status": "Active",
    "Partner": "LightWay Solutions",
    "Confirmation Deadline": "2025-11-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "INF-2509",
    "Assigned To Budget": 900000,
    "Duration": "14 months",
    "Clarification Deadline": "2025-10-25",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Import tax issues",
    "Coments": "Procurement phase"
  },
  {
    "sl": 10,
    "Year": 2025,
    "Country": "Bangladesh",
    "Donor Name": "World Bank",
    "Client Name": "Power Development Board",
    "Project Name": "Rooftop Solar Program",
    "Sector": "Energy",
    "Lead": "Tanvir Hossain",
    "Lead Status": "Pending",
    "Partner": "SolarHub BD",
    "Confirmation Deadline": "2025-12-15",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "ENG-2510",
    "Assigned To Budget": 1700000,
    "Duration": "18 months",
    "Clarification Deadline": "2025-12-01",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Solar panel price increase",
    "Coments": "Awaiting approval from board"
  }
]
,sheet3:[
  {
    "sl": 1,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "FAO",
    "Client Name": "Department of Agriculture",
    "Project Name": "Smart Farming Pilot",
    "Sector": "Agriculture",
    "Lead": "Arif Chowdhury",
    "Lead Status": "Active",
    "Partner": "AgroTech BD",
    "Confirmation Deadline": "2024-05-05",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "AGR-2401",
    "Assigned To Budget": 500000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-04-25",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Farmer training delays",
    "Coments": "Good community feedback"
  },
  {
    "sl": 2,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "World Bank",
    "Client Name": "Ministry of Forestry",
    "Project Name": "Forest Restoration Initiative",
    "Sector": "Environment",
    "Lead": "Ravi Kumar",
    "Lead Status": "Active",
    "Partner": "EcoGreen India",
    "Confirmation Deadline": "2024-06-20",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENV-2402",
    "Assigned To Budget": 900000,
    "Duration": "18 months",
    "Clarification Deadline": "2024-06-10",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Seedling supply shortage",
    "Coments": "Reforestation underway"
  },
  {
    "sl": 3,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "UNDP",
    "Client Name": "Environmental Ministry",
    "Project Name": "Mountain Biodiversity Protection",
    "Sector": "Environment",
    "Lead": "Rohit Lama",
    "Lead Status": "Active",
    "Partner": "Nature Nepal",
    "Confirmation Deadline": "2024-07-05",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "ENV-2403",
    "Assigned To Budget": 400000,
    "Duration": "14 months",
    "Clarification Deadline": "2024-06-25",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Remote area access",
    "Coments": "Proposal under evaluation"
  },
  {
    "sl": 4,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "ADB",
    "Client Name": "Water Resources Board",
    "Project Name": "Flood Management System",
    "Sector": "Environment",
    "Lead": "Tanvir Hossain",
    "Lead Status": "Active",
    "Partner": "HydroSafe Solutions",
    "Confirmation Deadline": "2024-08-10",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENV-2404",
    "Assigned To Budget": 850000,
    "Duration": "20 months",
    "Clarification Deadline": "2024-08-01",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Rainfall prediction error",
    "Coments": "Satellite integration pending"
  },
  {
    "sl": 5,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "FAO",
    "Client Name": "Agriculture Development Authority",
    "Project Name": "Soil Fertility Monitoring",
    "Sector": "Agriculture",
    "Lead": "Sadia Khan",
    "Lead Status": "Active",
    "Partner": "AgroData Labs",
    "Confirmation Deadline": "2024-05-25",
    "Process": "Proposal",
    "Status": "Awarded",
    "Project Code": "AGR-2405",
    "Assigned To Budget": 600000,
    "Duration": "10 months",
    "Clarification Deadline": "2024-05-15",
    "Selection method Submission Prep (RFP)": "Closed Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Data collection delays",
    "Coments": "Pilot in progress"
  },
  {
    "sl": 6,
    "Year": 2024,
    "Country": "Sri Lanka",
    "Donor Name": "UNEP",
    "Client Name": "Environmental Council",
    "Project Name": "Plastic Waste Reduction Program",
    "Sector": "Environment",
    "Lead": "Kavya Perera",
    "Lead Status": "Active",
    "Partner": "CleanOcean Lanka",
    "Confirmation Deadline": "2024-09-10",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENV-2406",
    "Assigned To Budget": 700000,
    "Duration": "16 months",
    "Clarification Deadline": "2024-09-01",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Community engagement issues",
    "Coments": "Awareness campaign launched"
  },
  {
    "sl": 7,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "World Bank",
    "Client Name": "Irrigation Authority",
    "Project Name": "Efficient Water Usage System",
    "Sector": "Agriculture",
    "Lead": "Rina Tamang",
    "Lead Status": "Pending",
    "Partner": "AquaNepal Pvt",
    "Confirmation Deadline": "2024-07-25",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "AGR-2407",
    "Assigned To Budget": 300000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-07-15",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Technical feasibility checks",
    "Coments": "Awaiting feedback"
  },
  {
    "sl": 8,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "ADB",
    "Client Name": "Rural Development Board",
    "Project Name": "Organic Farming Promotion",
    "Sector": "Agriculture",
    "Lead": "Ravi Kumar",
    "Lead Status": "Active",
    "Partner": "AgroPure Co",
    "Confirmation Deadline": "2024-10-15",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "AGR-2408",
    "Assigned To Budget": 750000,
    "Duration": "18 months",
    "Clarification Deadline": "2024-10-05",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Farmer adoption rate low",
    "Coments": "Workshops ongoing"
  },
  {
    "sl": 9,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "UNDP",
    "Client Name": "Department of Environment",
    "Project Name": "Mangrove Restoration Program",
    "Sector": "Environment",
    "Lead": "Tanvir Hossain",
    "Lead Status": "Active",
    "Partner": "GreenRoots BD",
    "Confirmation Deadline": "2024-11-20",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENV-2409",
    "Assigned To Budget": 650000,
    "Duration": "15 months",
    "Clarification Deadline": "2024-11-10",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Coastal erosion issues",
    "Coments": "Replanting started"
  },
  {
    "sl": 10,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "World Bank",
    "Client Name": "Forestry Department",
    "Project Name": "Green Belt Expansion",
    "Sector": "Environment",
    "Lead": "Sadia Khan",
    "Lead Status": "Active",
    "Partner": "EcoLife Solutions",
    "Confirmation Deadline": "2024-12-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "ENV-2410",
    "Assigned To Budget": 780000,
    "Duration": "17 months",
    "Clarification Deadline": "2024-11-25",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Logistics during monsoon",
    "Coments": "Good donor feedback"
  }
]
,
sheet4:[
  {
    "sl": 1,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "UNICEF",
    "Client Name": "Ministry of Health",
    "Project Name": "Maternal Health Improvement",
    "Sector": "Health",
    "Lead": "Shaila Rahman",
    "Lead Status": "Active",
    "Partner": "MediLink BD",
    "Confirmation Deadline": "2024-04-15",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "HLT-2411",
    "Assigned To Budget": 820000,
    "Duration": "14 months",
    "Clarification Deadline": "2024-04-05",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Staff shortage in rural hospitals",
    "Coments": "Strong collaboration with local NGOs"
  },
  {
    "sl": 2,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "World Bank",
    "Client Name": "State Education Board",
    "Project Name": "STEM for Rural Schools",
    "Sector": "Education",
    "Lead": "Ravi Sharma",
    "Lead Status": "Pending",
    "Partner": "EduNext Pvt Ltd",
    "Confirmation Deadline": "2024-06-10",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "EDU-2412",
    "Assigned To Budget": 600000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-06-01",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "High material costs",
    "Coments": "Awaiting donor feedback"
  },
  {
    "sl": 3,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "UNDP",
    "Client Name": "Education Ministry",
    "Project Name": "Inclusive Learning Program",
    "Sector": "Education",
    "Lead": "Sujan Lama",
    "Lead Status": "Active",
    "Partner": "SmartLearn Nepal",
    "Confirmation Deadline": "2024-07-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "EDU-2413",
    "Assigned To Budget": 550000,
    "Duration": "10 months",
    "Clarification Deadline": "2024-06-20",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Limited access in mountain areas",
    "Coments": "Training phase ongoing"
  },
  {
    "sl": 4,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "WHO",
    "Client Name": "Ministry of Health",
    "Project Name": "COVID Recovery Support",
    "Sector": "Health",
    "Lead": "Ahsan Raza",
    "Lead Status": "Active",
    "Partner": "CareZone Pvt Ltd",
    "Confirmation Deadline": "2024-05-15",
    "Process": "Proposal",
    "Status": "Awarded",
    "Project Code": "HLT-2414",
    "Assigned To Budget": 900000,
    "Duration": "16 months",
    "Clarification Deadline": "2024-05-01",
    "Selection method Submission Prep (RFP)": "Direct Selection",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Procurement delay",
    "Coments": "Donor satisfied with progress"
  },
  {
    "sl": 5,
    "Year": 2024,
    "Country": "Sri Lanka",
    "Donor Name": "UNESCO",
    "Client Name": "National Education Council",
    "Project Name": "Digital Teacher Program",
    "Sector": "Education",
    "Lead": "Kavya Perera",
    "Lead Status": "Active",
    "Partner": "SkillBright Lanka",
    "Confirmation Deadline": "2024-08-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "EDU-2415",
    "Assigned To Budget": 450000,
    "Duration": "8 months",
    "Clarification Deadline": "2024-07-25",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Low teacher participation rate",
    "Coments": "Online modules being tested"
  },
  {
    "sl": 6,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "ADB",
    "Client Name": "Ministry of Health",
    "Project Name": "E-Clinic System Upgrade",
    "Sector": "Health",
    "Lead": "Tanvir Alam",
    "Lead Status": "Pending",
    "Partner": "MediTech BD",
    "Confirmation Deadline": "2024-09-10",
    "Process": "Proposal",
    "Status": "Under Review",
    "Project Code": "HLT-2416",
    "Assigned To Budget": 670000,
    "Duration": "12 months",
    "Clarification Deadline": "2024-08-25",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Budget allocation delay",
    "Coments": "Donor evaluation in process"
  },
  {
    "sl": 7,
    "Year": 2024,
    "Country": "India",
    "Donor Name": "UNICEF",
    "Client Name": "Ministry of Women & Child",
    "Project Name": "Child Nutrition Initiative",
    "Sector": "Health",
    "Lead": "Pooja Nair",
    "Lead Status": "Active",
    "Partner": "NutriServe Pvt Ltd",
    "Confirmation Deadline": "2024-10-05",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "HLT-2417",
    "Assigned To Budget": 500000,
    "Duration": "11 months",
    "Clarification Deadline": "2024-09-25",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Supply chain disruptions",
    "Coments": "80% field coverage achieved"
  },
  {
    "sl": 8,
    "Year": 2024,
    "Country": "Nepal",
    "Donor Name": "Save the Children",
    "Client Name": "Ministry of Education",
    "Project Name": "Safe School Initiative",
    "Sector": "Education",
    "Lead": "Rina Tamang",
    "Lead Status": "Pending",
    "Partner": "EduSafe Nepal",
    "Confirmation Deadline": "2024-07-20",
    "Process": "Proposal",
    "Status": "Submitted",
    "Project Code": "EDU-2418",
    "Assigned To Budget": 300000,
    "Duration": "9 months",
    "Clarification Deadline": "2024-07-10",
    "Selection method Submission Prep (RFP)": "Direct Selection",
    "CV Stat. (RFP)": "Pending",
    "Financial (RFP)": "Pending",
    "Compliance (RFP)": "Under Review",
    "challanges": "Site safety checks pending",
    "Coments": "Site inspections scheduled"
  },
  {
    "sl": 9,
    "Year": 2024,
    "Country": "Bangladesh",
    "Donor Name": "DFID",
    "Client Name": "Technical Education Board",
    "Project Name": "Vocational Health Courses",
    "Sector": "Education",
    "Lead": "Farhan Islam",
    "Lead Status": "Active",
    "Partner": "SkillCare BD",
    "Confirmation Deadline": "2024-11-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "EDU-2419",
    "Assigned To Budget": 700000,
    "Duration": "15 months",
    "Clarification Deadline": "2024-10-20",
    "Selection method Submission Prep (RFP)": "Open Tender",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Under Review",
    "Compliance (RFP)": "Compliant",
    "challanges": "Low enrollment rate",
    "Coments": "Campaign in progress"
  },
  {
    "sl": 10,
    "Year": 2024,
    "Country": "Pakistan",
    "Donor Name": "UNESCO",
    "Client Name": "National Health Board",
    "Project Name": "Medical Staff E-Training",
    "Sector": "Health",
    "Lead": "Sadia Khan",
    "Lead Status": "Active",
    "Partner": "Learn4Health",
    "Confirmation Deadline": "2024-12-01",
    "Process": "Bidding",
    "Status": "Ongoing",
    "Project Code": "HLT-2420",
    "Assigned To Budget": 800000,
    "Duration": "13 months",
    "Clarification Deadline": "2024-11-25",
    "Selection method Submission Prep (RFP)": "Competitive",
    "CV Stat. (RFP)": "Approved",
    "Financial (RFP)": "Approved",
    "Compliance (RFP)": "Compliant",
    "challanges": "Tech integration delays",
    "Coments": "Strong partner performance"
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