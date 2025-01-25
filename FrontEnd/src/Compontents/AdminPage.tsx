import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPage: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:52944/api/Stocks/GetStockByQty") // Replace with your API endpoint
      .then((response) => {
        const products = response.data;

        // Extract product names and stock quantities for the chart
        const productNames = products.map((product: any) => product.Name);
        const stockQuantities = products.map((product: any) => product.StockInQty);

        // Set up the chart data
        setChartData({
          labels: productNames,
          datasets: [
            {
              label: "Stock Quantity",
              data: stockQuantities,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#FAF6E3", minHeight: "100vh", padding: "20px" }}>
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Admin Dashboard */}
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#2A3663" }}>
          Admin Dashboard
        </h1>

        <div className="row gy-4">
          {/* First Chart */}
          <div className="col-md-6 col-lg-6">
            <div
              className="p-3 shadow-sm"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "450px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h4 style={{ textAlign: "center", color: "#2A3663", marginBottom: "20px" }}>
                Product Stock Quantities
              </h4>
              <div style={{ width: "100%", height: "100%" }}>
                {chartData ? (
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Ensures the chart adapts to the container size
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Stock Quantities by Product",
                        },
                      },
                      layout: {
                        padding: {
                          top: 10,
                          bottom: 10,
                        },
                      },
                    }}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>Loading chart...</p>
                )}
              </div>
            </div>
          </div>

          {/* Second Chart Placeholder */}
          <div className="col-md-6 col-lg-6">
            <div
              className="p-3 shadow-sm"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "450px",
              }}
            >
              <h4 style={{ textAlign: "center", color: "#2A3663" }}>Chart 2</h4>
              <p style={{ textAlign: "center", marginTop: "50%" }}>Coming soon...</p>
            </div>
          </div>

          {/* Third Chart Placeholder */}
          <div className="col-md-6 col-lg-3">
            <div
              className="p-3 shadow-sm"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "300px",
              }}
            >
              <h4 style={{ textAlign: "center", color: "#2A3663" }}>Chart 3</h4>
              <p style={{ textAlign: "center", marginTop: "50%" }}>Coming soon...</p>
            </div>
          </div>

          {/* Fourth Chart Placeholder */}
          <div className="col-md-6 col-lg-3">
            <div
              className="p-3 shadow-sm"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "300px",
              }}
            >
              <h4 style={{ textAlign: "center", color: "#2A3663" }}>Chart 4</h4>
              <p style={{ textAlign: "center", marginTop: "50%" }}>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
