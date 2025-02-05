// 'use client'
// import React from 'react';
// import './column.css';

// export function Column({ children }) {
//   return (
//     <div className="column-container">
//       {React.Children.map(children, (child, index) => (
//         <div className="column-item" key={index}>
//           {child}
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';
import React from 'react';
import Grid from './Grid';

export function Column({ children, gap }) {
  return <Grid row={children.length} gap={gap}>{children}</Grid>;
}