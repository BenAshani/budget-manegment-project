// PieChart.jsx
import React, { useEffect, useContext, useState } from "react";
import { Chart } from "react-google-charts";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AtomicSpinner from 'atomic-spinner'

export default function PieChart() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([["Outcome", "Amount"]]);
  const date = new Date();
  useEffect(() => {
    if (!user.UserName) {
      navigate("/error");
    } else {
      // Simulate data loading
      setTimeout(() => {
        setIsLoading(false);
        let totalcost = 0;
        let newData = [["Outcome", "Amount"]];
        let positivevalues = 0;
        user.events?.forEach((event) => {
          if (extractMonthFromDate(event.start) == date.getMonth() + 1){
          const title = event?.title;
          let amount = Number(event?.ammount) || 0;
            if( amount < 0){
           amount = amount *-1
           positivevalues = Number(positivevalues) + Number(amount);
          }else{totalcost = totalcost + amount;}
          
          newData.push([title, amount]);
        }});

        if (user.events && user.events.length > 1) {
          newData.push(["Other", 0]);
        }

        totalcost = totalcost + Number(user?.regularexpenses);

        if (user?.events && Number(user?.monthlyincome) + positivevalues >= totalcost) {
          newData.push([`Regular Expenses: ${user?.regularexpenses}`, Number(user?.regularexpenses)]);
          newData.push([`Margin: ${user?.monthlyincome - totalcost >= 0 ?user?.monthlyincome - totalcost : user?.monthlyincome - totalcost + positivevalues}`, Number(user?.monthlyincome - totalcost >= 0 ?user?.monthlyincome - totalcost : user?.monthlyincome - totalcost + positivevalues)]);
        } else {
          newData = [["Outcome", "Amount"], [`Monthly Income: ${Number(user?.monthlyincome) + positivevalues}`, Number(user?.monthlyincome )+positivevalues], [`Monthly Outcome: ${totalcost}`, Number(totalcost)]];
        }
        setData(newData);
      }, 500); 
    }
  }, [user, navigate]);
  function extractMonthFromDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return month;
  }
  return (
    <div className="budget-pie-chart">
      {isLoading ? (
          <div>
          <h1  style={{width: '100%',display:'flex',justifyContent:'center'}}>Loading Pie Chart</h1>
            <div style={{width: '100%', height:'80vh', display:'flex', justifyContent:"center"}}>
            <AtomicSpinner nucleusParticleFillColor={'#220e22'} displayElectronPaths={false} electronPathCount={4} electronsPerPath={15} electronColorPalette={[ '#720e9e', `#AA44AE`, `#220e22` ]} atomSize={500} />
              </div>
              </div>
      ) : (
        <Chart
          chartType="PieChart"
          width="100%"
          height="450px"
          data={data}
          options={{ title: `My Budget: ${user?.monthlyincome}`, is3D: true }}
        />
      )}
    </div>
  );
}
