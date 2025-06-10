document.addEventListener('DOMContentLoaded', function() {
    // Fetch currencies and populate dropdowns
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const fromCurrency = document.getElementById('from-currency');
            const toCurrency = document.getElementById('to-currency');
            
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
                
                // Set default to EUR
                if (currency === 'EUR') {
                    option2.selected = true;
                    updateCurrencySymbol('to-currency-symbol', currency);
                    updateFlag('to-flag', currency);
                }
            });
            
            // Set default from USD
            fromCurrency.value = 'USD';
            updateCurrencySymbol('from-currency-symbol', 'USD');
            updateFlag('from-flag', 'USD');
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
    
    // Event listeners
    document.getElementById('convert-btn').addEventListener('click', convertCurrency);
    document.getElementById('swap-btn').addEventListener('click', swapCurrencies);
    document.getElementById('from-currency').addEventListener('change', function() {
        updateCurrencySymbol('from-currency-symbol', this.value);
        updateFlag('from-flag', this.value);
    });
    document.getElementById('to-currency').addEventListener('change', function() {
        updateCurrencySymbol('to-currency-symbol', this.value);
        updateFlag('to-flag', this.value);
    });
    
    // Convert on Enter key
    document.getElementById('amount').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
    
    // Initial conversion
    convertCurrency();
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = (amount * rate).toFixed(2);
            
            document.getElementById('result-value').textContent = result;
            document.getElementById('rate-info').textContent = 
                `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`;
            
            // Show result with animation
            const resultElement = document.getElementById('result');
            resultElement.classList.add('show');
        })
        .catch(error => {
            console.error('Error converting currency:', error);
            alert('Error converting currency. Please try again later.');
        });
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const temp = fromCurrency.value;
    
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    updateCurrencySymbol('from-currency-symbol', fromCurrency.value);
    updateCurrencySymbol('to-currency-symbol', toCurrency.value);
    updateFlag('from-flag', fromCurrency.value);
    updateFlag('to-flag', toCurrency.value);
    
    convertCurrency();
}

function updateCurrencySymbol(elementId, currencyCode) {
    const symbols = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 
        'AUD': 'A$', 'CAD': 'C$', 'CHF': 'Fr', 'CNY': '¥',
        'SEK': 'kr', 'NZD': 'NZ$', 'MXN': 'Mex$', 'SGD': 'S$',
        'HKD': 'HK$', 'NOK': 'kr', 'KRW': '₩', 'TRY': '₺',
        'RUB': '₽', 'INR': '₹', 'BRL': 'R$', 'ZAR': 'R'
    };
    
    const symbol = symbols[currencyCode] || currencyCode;
    document.getElementById(elementId).textContent = symbol;
}

function updateFlag(elementId, currencyCode) {
    const countryCodes = {
        'USD': 'us', 'EUR': 'eu', 'GBP': 'gb', 'JPY': 'jp',
        'AUD': 'au', 'CAD': 'ca', 'CHF': 'ch', 'CNY': 'cn',
        'SEK': 'se', 'NZD': 'nz', 'MXN': 'mx', 'SGD': 'sg',
        'HKD': 'hk', 'NOK': 'no', 'KRW': 'kr', 'TRY': 'tr',
        'RUB': 'ru', 'INR': 'in', 'BRL': 'br', 'ZAR': 'za'
    };
    
    const countryCode = countryCodes[currencyCode] || 'un';
    document.getElementById(elementId).innerHTML = 
        `<img src="https://flagcdn.com/w80/${countryCode}.png" alt="${currencyCode} Flag">`;
}