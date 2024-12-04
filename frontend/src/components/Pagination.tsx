import { Dispatch, SetStateAction } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}) => {
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages: any[] = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10 md:mt-14 lg:mt-16 font-bold text-white overflow-hidden">
      <div className="flex items-center sm:justify-center overflow-x-scroll">
        <nav
          aria-label="Pagination"
          className="flex"
        >
          <button
            className="px-4 py-2 rounded-md"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            Prev
          </button>
          {getPageNumbers().map((page, index) => {
            const isActive = currentPage === page;

            return (
              <p
                key={index}
                aria-current="page"
                className={`px-4 py-2 rounded-md ${
                  isActive ? "bg-cytric-600" : ""
                }`}
              >
                {page === "..." ? (
                  <>...</>
                ) : (
                  <span onClick={() => onPageChange(page)}>{page}</span>
                )}
              </p>
            );
          })}

          <button
            className="px-4 py-2 rounded-md"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
