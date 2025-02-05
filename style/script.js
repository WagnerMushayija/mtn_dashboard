// Function to show the selected content section
function showContent(section) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach((el) => {
        el.style.display = 'none';
    });

    // Show the selected content section
    if (section === 'Date' || section === 'Amount' || section === 'Transaction Type') {
        // Ensure the search bar is visible for search-related sections
        document.getElementById('search-content').style.display = 'block';
    } else {
        document.getElementById(`${section.toLowerCase()}-content`).style.display = 'block';
    }
}

// Function to perform a search
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

// Function to toggle the search dropdown
function toggleSearchDropdown(event) {
    event.preventDefault(); // Prevent default link behavior

    const searchMenu = document.getElementById('search-menu');
    const submenu = searchMenu.querySelector('.submenu');

    // Toggle the submenu visibility
    if (submenu) {
        submenu.classList.toggle('active');
    }
}

// Function to render charts for the Reports section
function renderCharts() {
    // Dummy data for the charts
    const transactionVolumeData = {
        labels: ['Payments', 'Deposits', 'Withdrawals'],
        datasets: [{
            label: 'Transaction Volume',
            data: [40, 35, 25], // Example data
            backgroundColor: ['#0033a0', '#ffcc00', '#00688f'], // MTN colors
        }]
    };

    const monthlySummaryData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Total Transactions',
            data: [10000, 15000, 12000, 18000, 20000], // Example data
            backgroundColor: '#0033a0', // Blue
        }]
    };

    const topTransactionsData = {
        labels: ['Transaction 1', 'Transaction 2', 'Transaction 3', 'Transaction 4', 'Transaction 5'],
        datasets: [{
            label: 'Amount',
            data: [5000, 4500, 4000, 3500, 3000], // Example data
            backgroundColor: '#ffcc00', // Yellow
        }]
    };

    // Render Transaction Volume Chart (Pie Chart)
    const ctx1 = document.getElementById('transactionVolumeChart').getContext('2d');
    new Chart(ctx1, {
        type: 'pie',
        data: transactionVolumeData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Transaction Volume by Type'
                }
            }
        }
    });

    // Render Monthly Summary Chart (Bar Chart)
    const ctx2 = document.getElementById('monthlySummaryChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: monthlySummaryData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Transaction Summary'
                }
            }
        }
    });

    // Render Top Transactions Chart (Bar Chart)
    const ctx3 = document.getElementById('topTransactionsChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: topTransactionsData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 5 Transactions'
                }
            }
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Add click event to the search menu to toggle the dropdown
    const searchMenu = document.getElementById('search-menu');
    if (searchMenu) {
        searchMenu.addEventListener('click', toggleSearchDropdown);
    }

    // Add click events to the dropdown items
    document.querySelectorAll('.submenu a').forEach((link) => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const section = this.textContent.trim(); // Get the section name
            showContent(section); // Show the corresponding content
        });
    });

    // Add click event to the Report link
    const reportLink = document.querySelector('a[onclick="showContent(\'Report\')"]');
    if (reportLink) {
        reportLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            showContent('Report'); // Show the Report section
            renderCharts(); // Render the charts
        });
    }
});