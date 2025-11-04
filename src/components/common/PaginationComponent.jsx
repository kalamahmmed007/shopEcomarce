import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageClick(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            />
        </Pagination>
    );
};

export default PaginationComponent;
