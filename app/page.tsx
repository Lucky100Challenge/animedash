'use client'

import { useEffect, useState } from 'react'
import anime from 'animejs'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { faker } from '@faker-js/faker'
import ErrorMessage from './components/ErrorMessage'

ChartJS.register(...registerables)

export default function Dashboard() {
  const [data, setData] = useState({
    monthlySales: Array(12).fill(10000),
    customerSegments: Array(4).fill(25),
    leadConversion: Array(7).fill(50),
    totalCustomers: 1000,
    activeDeals: 50,
    customerSatisfaction: 4.5,
  })
  const [error, setError] = useState<string | null>(null)

  const generateData = () => {
    try {
      const newData = {
        monthlySales: Array.from({ length: 12 }, () => faker.number.int({ min: 5000, max: 20000 })),
        customerSegments: Array.from({ length: 4 }, () => faker.number.int({ min: 10, max: 40 })),
        leadConversion: Array.from({ length: 7 }, () => faker.number.int({ min: 30, max: 70 })),
        totalCustomers: faker.number.int({ min: 800, max: 1500 }),
        activeDeals: faker.number.int({ min: 30, max: 80 }),
        customerSatisfaction: Number(faker.number.float({ min: 3.5, max: 5 }).toFixed(1)),
      }
      setData(newData)
      animateCharts()
      setError(null)
    } catch (err) {
      setError('Failed to generate CRM data. Please try again.')
    }
  }

  const animateCharts = () => {
    anime({
      targets: '.chart-container',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(200),
    })
  }

  const handleInputChange = (key: string, index: number | null, value: number) => {
    setData(prevData => {
      if (index !== null) {
        const newArray = [...prevData[key as keyof typeof prevData] as number[]]
        newArray[index] = value
        return { ...prevData, [key]: newArray }
      } else {
        return { ...prevData, [key]: value }
      }
    })
  }

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: data.monthlySales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const customerSegmentsData = {
    labels: ['Enterprise', 'SMB', 'Startup', 'Individual'],
    datasets: [
      {
        data: data.customerSegments,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  }

  const leadConversionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Lead Conversion Rate',
        data: data.leadConversion,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">CRM Dashboard</h1>
        <p className="dashboard-subtitle">Customer relationship insights</p>
      </header>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <div className="kpi-row">
            <KPICard title="Total Customers" value={data.totalCustomers.toLocaleString()} change="+5.7%" color="text-green-600" />
            <KPICard title="Active Deals" value={data.activeDeals.toString()} change="+2.3%" color="text-green-600" />
            <KPICard title="Customer Satisfaction" value={`${data.customerSatisfaction.toFixed(1)}/5`} change="+0.2" color="text-green-600" />
          </div>
          
          <ChartCard title="Monthly Sales">
            <Bar data={monthlySalesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </ChartCard>
          
          <ChartCard title="Lead Conversion Rate">
            <Line data={leadConversionData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </ChartCard>
        </div>
        
        <div className="dashboard-column">
          <ChartCard title="Customer Segments">
            <Pie data={customerSegmentsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </ChartCard>
          
          <div className="info-card">
            <h2 className="info-card-title">Recent Activities</h2>
            <ul className="info-list">
              <li>New lead: John Doe (Software Company)</li>
              <li>Deal closed: XYZ Corp ($50,000)</li>
              <li>Customer meeting: Alice Smith (2:00 PM)</li>
              <li>Support ticket resolved: #1234</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h2 className="info-card-title">Top Customers</h2>
            <ul className="info-list">
              <li>1. Acme Inc. - $250,000</li>
              <li>2. Tech Solutions Ltd. - $180,000</li>
              <li>3. Global Enterprises - $120,000</li>
              <li>4. Innovative Startups Co. - $90,000</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="dashboard-footer">
        <button onClick={generateData} className="generate-button">
          Refresh CRM Data
        </button>
      </div>
    </div>
  )
}

function KPICard({ title, value, change, color }: { title: string; value: string; change: string; color: string }) {
  return (
    <div className="kpi-card">
      <h2 className="kpi-title">{title}</h2>
      <p className="kpi-value">{value}</p>
      <p className={`kpi-change ${color}`}>{change}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>
      <div className="chart-container">{children}</div>
    </div>
  )
}