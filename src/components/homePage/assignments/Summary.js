import React from 'react';

const Summary = ({ weekNumber, unit }) => {
  return (
    <div>
      <h1><strong>Welcome to Week {weekNumber} of our {unit.unit_name} Development track.</strong></h1>
      <h4><strong>Summary</strong></h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus, ipsum nec pretium placerat, leo justo accumsan lacus, et interdum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet arcu quam, eu rhoncus ligula malesuada a. Sed non fringilla risus. Etiam consectetur iaculis ipsum, nec cursus erat mollis eu.</p>
    </div>
  )
}

export default Summary;