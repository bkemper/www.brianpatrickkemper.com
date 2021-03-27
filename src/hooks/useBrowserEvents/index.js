import React from 'react';
import Elephant from './Elephant';

const useBrowserEvents = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const dumbo = new Elephant({ onChange: setEvents });

    return () => {
      dumbo.teardown();
    };
  }, []);

  return { events };
};

export default useBrowserEvents;
