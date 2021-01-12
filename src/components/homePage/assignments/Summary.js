import React from 'react';

const Summary = ({ weekNumber, unit }) => {
  return (
    <div>
      <h1><strong>Welcome to <u>Week {weekNumber}</u> of our <u>{unit.unit_name}</u> Development track.</strong></h1>
      <h4><strong>Summary</strong></h4>
      <p>The Front End Development Track covers the principle front-end development skills needed to prepare you for a career in building user interfaces, websites, and user experiences that delight users. These skills include advanced HTML, CSS, and JavaScript.</p>
    </div>
  )
}

export default Summary;