function showContent(section) {
    // Hide all content sections except the search bar if the section is related to search
    document.querySelectorAll('.content-section').forEach((el) => {
        if (section === 'Date' || section === 'Amount' || section === 'Transaction Type') {
            // Do not hide the search bar for search-related sections
            if (el.id !== 'search-content') {
                el.style.display = 'none';
            }
        } else {
            // Hide all content sections for non-search sections
            el.style.display = 'none';
        }
    });

    // Show the selected content section
    if (section === 'Date' || section === 'Amount' || section === 'Transaction Type') {
        // Ensure the search bar is visible
        document.getElementById('search-content').style.display = 'block';
    } else {
        document.getElementById(`${section.toLowerCase()}-content`).style.display = 'block';
    }
}

function performSearch() {
    const searchInput = document.getElementById('search-input').value;
    const searchResults = document.getElementById('search-results');
    const resultsTitle = document.getElementById('results-title');
    const resultsTable = document.getElementById('results-table');

    // Show the table and title
    resultsTitle.style.display = 'block';
    resultsTable.style.display = 'table';

    // Clear previous results
    const tableBody = resultsTable.querySelector('tbody');
    tableBody.innerHTML = '';

    // Simulate search results (dummy data)
    const dummyData = [
        { id: 1, date: '2023-10-01', type: 'Payment', amount: 100, sender: 'User A' },
        { id: 2, date: '2023-10-02', type: 'Deposit', amount: 200, sender: 'User B' },
        { id: 3, date: '2023-10-03', type: 'Withdrawal', amount: 50, sender: 'User C' },
    ];

    // Add rows to the table
    dummyData.forEach((item) => {
        const row = document.createElement('tr');

        // Add Transaction ID
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        // Add Date
        const dateCell = document.createElement('td');
        dateCell.textContent = item.date;
        row.appendChild(dateCell);

        // Add Type
        const typeCell = document.createElement('td');
        typeCell.textContent = item.type;
        row.appendChild(typeCell);

        // Add Amount
        const amountCell = document.createElement('td');
        amountCell.textContent = `$${item.amount}`;
        row.appendChild(amountCell);

        // Add Sender
        const senderCell = document.createElement('td');
        senderCell.textContent = item.sender;
        row.appendChild(senderCell);

        // Add the row to the table
        tableBody.appendChild(row);
    });
}

// Toggle submenu visibility when clicking the search menu
document.querySelectorAll('.sidebar ul li > a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent jumping to top

        let submenu = this.nextElementSibling; // Find the next UL (submenu)

        if (submenu && submenu.classList.contains('submenu')) {
            submenu.classList.toggle('active'); // Toggle visibility
        }
    });
});