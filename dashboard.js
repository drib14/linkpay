document.addEventListener('DOMContentLoaded', function () {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const transactionList = document.getElementById('transaction-list');

    // Populate user profile data
    if (userData) {
        document.getElementById('profile-name').textContent = userData.fullName || 'User Name';
        document.getElementById('profile-email').textContent = userData.email || 'user@example.com';
        document.getElementById('profile-mobile').textContent = userData.phone || 'Mobile Number';
        document.getElementById('balance').textContent = userData.balance || '0.00';
    }

    // Modal logic
    const modals = {
        send: document.getElementById('sendModal'),
        receive: document.getElementById('receiveModal'),
        payBills: document.getElementById('payBillsModal'),
        addPayment: document.getElementById('addPaymentModal')
    };

    const closeModal = function () {
        Object.values(modals).forEach(modal => modal.style.display = 'none');
    };

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Show modals when action buttons are clicked
    document.querySelector('.fa-paper-plane').addEventListener('click', () => modals.send.style.display = 'flex');
    document.querySelector('.fa-plus-circle').addEventListener('click', () => modals.receive.style.display = 'flex');
    document.querySelector('.fa-file-invoice-dollar').addEventListener('click', () => modals.payBills.style.display = 'flex');
    document.querySelector('.fa-credit-card').addEventListener('click', () => modals.addPayment.style.display = 'flex');

    // Function to update transaction history
    const updateTransactionHistory = (description) => {
        const li = document.createElement('li');
        li.textContent = description;
        transactionList.appendChild(li);
    };

    // Send Money Logic
    document.getElementById('send-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const recipient = document.getElementById('recipient').value;
        const amount = parseFloat(document.getElementById('amount-send').value);

        if (userData.balance && amount <= userData.balance) {
            userData.balance -= amount;
            alert(`Successfully sent ₱${amount} to ${recipient}.`);
            updateTransactionHistory(`Sent ₱${amount} to ${recipient}`);
        } else {
            alert("Insufficient balance!");
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        closeModal();
        location.reload();
    });

    // Receive Money Logic
    document.getElementById('receive-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const sender = document.getElementById('sender').value;
        const amount = parseFloat(document.getElementById('amount-receive').value);

        userData.balance = (userData.balance || 0) + amount;
        alert(`Successfully received ₱${amount} from ${sender}.`);
        updateTransactionHistory(`Received ₱${amount} from ${sender}`);
        localStorage.setItem('userData', JSON.stringify(userData));
        closeModal();
        location.reload();
    });

    // Pay Bills Logic
    document.getElementById('pay-bills-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const billType = document.getElementById('billType').value;
        const amount = parseFloat(document.getElementById('amount-bill').value);

        if (userData.balance && amount <= userData.balance) {
            userData.balance -= amount;
            alert(`Successfully paid ₱${amount} for ${billType}.`);
            updateTransactionHistory(`Paid ₱${amount} for ${billType}`);
        } else {
            alert("Insufficient balance to pay bills!");
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        closeModal();
        location.reload();
    });

    // Add Payment Method Logic
    document.getElementById('add-payment-method-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const methodName = document.getElementById('method-name').value;

        userData.paymentMethods = userData.paymentMethods || [];
        userData.paymentMethods.push({ name: methodName });
        alert(`Successfully added payment method: ${methodName}`);
        localStorage.setItem('userData', JSON.stringify(userData));
        closeModal();
        location.reload();
    });

    // Logout functionality
    document.getElementById('logout-button').addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });
});
