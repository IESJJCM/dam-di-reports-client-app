import {  useState, useEffect } from 'react';
import { getReports } from '../api/jasper-report-api';

export const useReports = () => {

  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReports()
      .then(data => { setReports(data as any);}).catch(e => console.log(e));
  }, []);

  return {  
    reports,
  };
}