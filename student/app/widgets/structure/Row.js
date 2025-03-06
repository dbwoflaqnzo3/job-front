// 'use client'
// import React from 'react';
// import './row.css';

// export function Row({ children }) {
//   return (
//     <div className="row-container">
//       {React.Children.toArray(children).map((child, index) => (
//         <div className="row-item" key={index}>
//           {child}
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';
import React from 'react';
import { Grid } from './Grid';

export function Row({ children, gap }) {
    return <Grid column={children.length} gap={gap}>{children}</Grid>;
}