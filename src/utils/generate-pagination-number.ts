export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i);
	}

	if (currentPage <= 2) {
		return [0, 1, 2, '...', totalPages - 1, totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [0, 1, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	return [0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
