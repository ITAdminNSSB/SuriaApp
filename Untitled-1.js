import React from 'react';
import { BarChart, Bar, PieChart, Pie, DoughnutChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const OrderPerformanceDashboard = () => {
  // KPI Data
  const kpiData = [
    { title: 'Total Attendance', value: 365 },
    { title: 'Total Orders', value: 247 },
    { title: 'Total Non Claimed', value: 19 }
  ];

  // Attendance Breakdown Data
  const attendanceData = [
    { name: 'Morning', value: 258 },
    { name: 'Night', value: 107 }
  ];

  // Order Distribution Data
  const orderDistributionData = [
    { name: 'Morning Orders', value: 152 },
    { name: 'Night Orders', value: 92 }
  ];

  // Order Status Data
  const orderStatusData = [
    { name: 'Claimed', value: 225 },
    { name: 'Not Claimed', value: 19 }
  ];

  // Attendance and Order Submission Data
  const attendanceOrderData = [
    { name: 'Total', attendance: 365, orders: 247 }
  ];

  // IT Ticket Issues Data
  const issuesData = [
    { date: '17 Mar', issues: 3, fixed: 3 },
    { date: '20 Mar', issues: 4, fixed: 4 },
    { date: '24 Mar', issues: 3, fixed: 3 },
    { date: '25 Mar', issues: 2, fixed: 2 }
  ];

  // Colors
  const COLORS = ['#0078d4', '#50e3c2'];

  // Render KPI Cards
  const renderKPICards = () => {
    return kpiData.map((kpi, index) => (
      <Card key={index} className="p-4 text-center">
        <div className="text-gray-600 mb-2">{kpi.title}</div>
        <div className="text-2xl font-bold text-blue-600">{kpi.value}</div>
      </Card>
    ));
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="dashboard-header bg-blue-600 text-white p-4 mb-6 rounded">
        <h1 className="text-3xl font-bold">Order Performance Dashboard</h1>
        <div className="text-lg">27/3/2025</div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {renderKPICards()}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Attendance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {attendanceData.map((item, index) => (
              <div key={index} className="flex justify-between mt-2">
                <span>{item.name}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orderDistributionData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#0078d4"
                >
                  {orderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {orderDistributionData.map((item, index) => (
              <div key={index} className="flex justify-between mt-2">
                <span>{item.name}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {orderStatusData.map((item, index) => (
              <div key={index} className="flex justify-between mt-2">
                <span>{item.name}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Attendance and Order Submission Comparison */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Attendance vs Order Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceOrderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#0078d4" name="Total Attendance" />
              <Bar dataKey="orders" fill="#50e3c2" name="Total Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* IT Ticket Issues */}
      <Card>
        <CardHeader>
          <CardTitle>IT Ticket Issues (March)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={issuesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="issues" fill="#e74c3c" name="Issues" />
              <Bar dataKey="fixed" fill="#2ecc71" name="Fixed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPerformanceDashboard;