import React,{ memo } from 'react';
import './style.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    pages.push(1);
    if (currentPage === 1 || currentPage === 2) {
      if (totalPages >= 2) pages.push(2);
      if (totalPages >= 3) pages.push(3);
    } else {
      if (currentPage > 3) {
        pages.push("...");
      }

      if (currentPage - 1 > 1) {
        pages.push(currentPage - 1);
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }

      if (currentPage + 1 < totalPages) {
        pages.push(currentPage + 1);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          className={page === currentPage ? "active" : ""}
          disabled={page === "..."}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default memo(Pagination);

// const Pagination = ({ totalPages, currentPage, onPageChange }) => {
//   const getPageNumbers = () => {
//     let pages = [];
//     pages.push(1);
//     if (currentPage === 1 || currentPage === 2) {
//       if (totalPages >= 2) pages.push(2);
//       if (totalPages >= 3) pages.push(3);
//     } else {
//       if (currentPage > 3) {
//         pages.push("...");
//       }

//       if (currentPage - 1 > 1) {
//         pages.push(currentPage - 1);
//       }

//       if (currentPage !== 1 && currentPage !== totalPages) {
//         pages.push(currentPage);
//       }

//       if (currentPage + 1 < totalPages) {
//         pages.push(currentPage + 1);
//       }
//     }

//     if (currentPage < totalPages - 2) {
//       pages.push("...");
//     }

//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       {getPageNumbers().map((page, index) => (
//         <button
//           key={index}
//           onClick={() => page !== "..." && onPageChange(page)}
//           className={page === currentPage ? "active" : ""}
//           disabled={page === "..."}
//         >
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default memo(Pagination);
