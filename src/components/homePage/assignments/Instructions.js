import React from 'react';

const Instructions = ({ lesson }) => {
  return (
    <div>
      <h1><strong>{lesson}</strong></h1>
      <p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus, ipsum nec pretium placerat, leo justo accumsan lacus, et interdum.</strong></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet arcu quam, eu rhoncus ligula malesuada a. Sed non fringilla risus. Etiam consectetur iaculis ipsum, nec cursus erat mollis eu.</p>
    </div>
  )
}

export default Instructions;