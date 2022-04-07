import React, { useEffect, useState } from 'react';

import Job from './components/Job';
import Nav from './components/Nav';
import OrderBy from './components/OrderBy';
import OrderContext from './contexts/OrderContext';
import { OrderTypes } from './types/order';
import JobDefinition from './types/job';

import './App.css';

const App: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [paginatedJobs, setPaginatedJobs] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(100);

  const fetchData: () => Promise<void> = async () => {
    const result = await fetch('/jobs.json');
    const data = await result.json();
    setJobs(data);
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 3000);
  }, []);

  useEffect(() => {
    setPaginatedJobs([]);
    setPaginatedJobs(
      [...jobs].slice(pageIndex * pageSize, pageSize + pageIndex * pageSize)
    );
  }, [jobs, pageIndex]);

  const toggleOrder = (newOrder: string) => {
    const jobsCopy = [...jobs];
    if (newOrder === OrderTypes.Priority) {
      jobsCopy.sort((a: JobDefinition, b: JobDefinition) =>
        a.priority > b.priority ? -1 : 1
      );
    } else {
      jobsCopy.sort(() => 0.5 - Math.random());
    }
    setJobs(jobsCopy);
  };

  const JobList: React.ReactElement[] = paginatedJobs.map((value) => {
    const { id } = value;
    return <Job key={id} {...value} />;
  });

  return (
    <div className='App'>
      <OrderContext.Provider
        value={{
          orderby: OrderTypes.Random,
          toggleOrder,
        }}
      >
        <Nav />
        {!JobList.length ? (
          <div className='loader-wrapper'>
            <div className='loader'></div>
            <span>Loading Jobs...</span>
          </div>
        ) : (
          <div data-testid='app-jobs' className='App-jobs'>
            <OrderBy toggleOrder={toggleOrder} />
            {JobList}
            <div className='App-paggination'>
              <button
                disabled={pageIndex === 0}
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setPageIndex(pageIndex - 1);
                }}
              >
                Prev
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setPageIndex(pageIndex + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </OrderContext.Provider>
    </div>
  );
};

export default App;
