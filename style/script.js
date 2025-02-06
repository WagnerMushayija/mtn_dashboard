// Navigation
const navLinks = document.querySelectorAll("nav a")
const sections = document.querySelectorAll("main section")

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
        sections.forEach((s) => s.classList.remove("active"))
        document.querySelector(link.getAttribute("href")).classList.add("active")
    })
})

// Charts
// Import Chart.js library.  This assumes Chart.js is included in your HTML file via a <script> tag.
// If not, you'll need to include it, for example: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

const transactionTypeChart = new Chart(document.getElementById("transactionTypeChart"), {
    type: "doughnut",
    data: {
        labels: ["Mobile Transfer", "Bank Transfer", "Cash"],
        datasets: [
            {
                data: [300, 150, 100],
                backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Transaction Types",
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    },
})

const categoryChart = new Chart(document.getElementById("categoryChart"), {
    type: "polarArea",
    data: {
        labels: ["Food", "Transport", "Entertainment", "Bills", "Shopping"],
        datasets: [
            {
                data: [250, 100, 150, 300, 200],
                backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0"],
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Spending by Category",
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    },
})

const trendChart = new Chart(document.getElementById("trendChart"), {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Income",
                data: [1000, 1200, 1100, 1300, 1150, 1400],
                backgroundColor: "#4CAF50",
            },
            {
                label: "Expenses",
                data: [900, 950, 1000, 1050, 1100, 1150],
                backgroundColor: "#F44336",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Income vs Expenses Trend",
            },
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
    },
})

const cashFlowChart = new Chart(document.getElementById("cashFlowChart"), {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Income",
                data: [1000, 1200, 1100, 1300, 1150, 1400],
                borderColor: "#4CAF50",
                fill: false,
            },
            {
                label: "Expenses",
                data: [900, 950, 1000, 1050, 1100, 1150],
                borderColor: "#F44336",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Cash Flow Analysis",
            },
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
    },
})

// Transactions
const transactions = [
    {
        id: 1,
        date: "2023-05-01",
        amount: -50.0,
        type: "Mobile Transfer",
        category: "Food",
        description: "Grocery shopping",
    },
    { id: 2, date: "2023-05-03", amount: -30.0, type: "Bank Transfer", category: "Transport", description: "Fuel" },
    { id: 3, date: "2023-05-05", amount: 1000.0, type: "Bank Transfer", category: "Income", description: "Salary" },
    {
        id: 4,
        date: "2023-05-07",
        amount: -80.0,
        type: "Mobile Transfer",
        category: "Entertainment",
        description: "Movie night",
    },
    {
        id: 5,
        date: "2023-05-10",
        amount: -200.0,
        type: "Bank Transfer",
        category: "Bills",
        description: "Electricity bill",
    },
]

function createTransactionCard(transaction) {
    const card = document.createElement("div")
    card.classList.add("transaction-card")
    card.innerHTML = `
        <div>
            <h3>${transaction.category}</h3>
            <p>${transaction.date}</p>
        </div>
        <div class="transaction-amount ${transaction.amount > 0 ? "positive" : "negative"}">
            ${transaction.amount > 0 ? "+" : ""}$${Math.abs(transaction.amount).toFixed(2)}
        </div>
        <div class="transaction-details">
            <p><strong>Type:</strong> ${transaction.type}</p>
            <p><strong>Description:</strong> ${transaction.description}</p>
        </div>
    `
    card.addEventListener("click", () => {
        const details = card.querySelector(".transaction-details")
        details.style.display = details.style.display === "none" ? "block" : "none"
    })
    return card
}

const transactionList = document.querySelector("#transactions .transaction-list")
transactions.forEach((transaction) => {
    transactionList.appendChild(createTransactionCard(transaction))
})

// Search functionality
const searchForm = document.getElementById("search-form")
const searchCategory = document.getElementById("search-category")
const searchInput = document.getElementById("search-input")
const searchDate = document.getElementById("search-date")
const searchType = document.getElementById("search-type")
const searchResults = document.getElementById("search-results")

searchCategory.addEventListener("change", () => {
    searchInput.style.display = searchCategory.value === "amount" ? "inline-block" : "none"
    searchDate.style.display = searchCategory.value === "date" ? "inline-block" : "none"
    searchType.style.display = searchCategory.value === "type" ? "inline-block" : "none"
})

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let query
    switch (searchCategory.value) {
        case "date":
            query = searchDate.value
            break
        case "amount":
            query = searchInput.value
            break
        case "type":
            query = searchType.value
            break
    }

    const filteredTransactions = transactions.filter((transaction) => {
        switch (searchCategory.value) {
            case "date":
                return transaction.date === query
            case "amount":
                return transaction.amount.toString().includes(query)
            case "type":
                return transaction.type === query
            default:
                return false
        }
    })

    searchResults.innerHTML = ""
    filteredTransactions.forEach((transaction) => {
        searchResults.appendChild(createTransactionCard(transaction))
    })
})

// Chatbot functionality
const chatbotForm = document.getElementById("chatbot-form")
const chatbotInput = document.getElementById("chatbot-input")
const chatbotMessages = document.getElementById("chatbot-messages")

chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const message = chatbotInput.value.trim()
    if (message) {
        addChatMessage("user", message)
        chatbotInput.value = ""
        // Simulated bot response (replace with actual API call)
        setTimeout(() => {
            addChatMessage("bot", "Thank you for your message. I'm processing your request.")
        }, 1000)
    }
})

function addChatMessage(sender, message) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("chat-message", sender)
    messageElement.textContent = message
    chatbotMessages.appendChild(messageElement)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

// Add some initial animations
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector(".hero-text")
    heroText.style.opacity = "0"
    heroText.style.transform = "translateY(-20px)"
    setTimeout(() => {
        heroText.style.transition = "opacity 0.5s, transform 0.5s"
        heroText.style.opacity = "1"
        heroText.style.transform = "translateY(0)"
    }, 100)

    const balanceAmount = document.querySelector(".balance-amount")
    balanceAmount.style.opacity = "0"
    setTimeout(() => {
        balanceAmount.style.transition = "opacity 0.5s"
        balanceAmount.style.opacity = "1"
    }, 500)
})

