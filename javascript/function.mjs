import { renderTable, previousBtn, nextBtn } from "./dashboard.mjs";

// Function for the Filter the Data in the Table:
export const Filter = (searchQuery, parseData) => {
    let newData = [];

    // Change the search query into lowercase:
    let lowerCaseQuery = searchQuery.toLowerCase();

    parseData.forEach((personalDetail, index) => {
        let storeFirstName = `${personalDetail.firstName} ${personalDetail.lastName}`.toLowerCase();
        if (lowerCaseQuery && storeFirstName.includes(lowerCaseQuery)) {
            newData.push(parseData[index]);
        }

    });
    return newData;
};

// Function for the Pagination:

let currentPage = 1;
let numberPerPage = 2;

export const paginationPreviousBtn = (personalDetails) => {
    currentPage -= 1;
    updatePagination(personalDetails);
    return currentPage

}

export const paginationNextBtn = (personalDetails) => {
    currentPage += 1;
    updatePagination(personalDetails);
    return currentPage

}

export const updatePagination = (personalDetails) => {
    const totalPages = Math.ceil(personalDetails.length / numberPerPage);

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    previousBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    renderTable();
}

export const pagination = (personalDetails) => {
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const tableData = personalDetails.slice(startIndex, endIndex);
    return tableData
}
