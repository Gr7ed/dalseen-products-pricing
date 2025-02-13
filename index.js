const prices = {
    mix: { 
        monthly: { 1: 399, 2: 299 }, 
        cash: { 1: { old: 4499, new: 4299 }, 2: { old: 5299, new: 4799 } } 
    },
    shamela: { 
        monthly: { 1: 349, 2: 249 }, 
        cash: { 1: { old: 3849, new: 3649 }, 2: { old: 4749, new: 4249 } } 
    },
    asasiyah: { 
        monthly: { 1: 297, 2: 199 }, 
        cash: { 1: 3199, 2: 4199 } 
    },
    mobile: { 
        monthly: { 1: 149, 2: 119 }, 
        cash: { 1: 1668, 2: 2666 } 
    }
};

let selectedPackage = null;
let duration;
let paymentType;

function updatePriceForPackage(pkg) {
    duration = parseInt(document.getElementById("duration-" + pkg).value);
    paymentType = document.getElementById("paymentType-" + pkg).value;
    
    let priceText = "";
    
    if (prices[pkg][paymentType][duration] && typeof prices[pkg][paymentType][duration] === "object") {
        const oldPrice = prices[pkg][paymentType][duration].old;
        const newPrice = prices[pkg][paymentType][duration].new;
        priceText = `💵 السعر: <span class="text-decoration-line-through warning-color">${oldPrice} ريال</span> ${newPrice} ريال`;
    } else {
        const price = prices[pkg][paymentType][duration];
        priceText = `💵 السعر: ${price} ريال`;
    }

    document.getElementById("price-" + pkg).innerHTML = priceText;
}

function selectPackage(button) {
    selectedPackage = button.value;
    highlightSelectedButton(button);
    redirectToWhatsApp(); // Redirect when a package is selected
}

function highlightSelectedButton(selectedButton) {
    document.querySelectorAll('.select-btn').forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
}

function redirectToWhatsApp() {
    if (!selectedPackage) return;

    const packageNamesArabic = {
        mix: "باقة مكس",
        shamela: "الباقة الشاملة",
        asasiyah: "الباقة الاساسية",
        mobile: "باقة المحمول",
    };
    const paymentTypeArabic = {
        monthly: "شهري",
        cash: "كاش/نقدي",
    };

    let finalPrice;
    if (prices[selectedPackage][paymentType][duration] && typeof prices[selectedPackage][paymentType][duration] === "object") {
        finalPrice = prices[selectedPackage][paymentType][duration].new;
    } else {
        finalPrice = prices[selectedPackage][paymentType][duration];
    }

    const msg = `لقد اخترت ${packageNamesArabic[selectedPackage]} لمدة ${duration} سنة، طريقة الدفع: ${paymentTypeArabic[paymentType]} بسعر ${finalPrice} ريال. أرغب في الحصول على المزيد من المعلومات `;
    const encodedMsg = encodeURIComponent(msg);
    
    // Redirect the user to WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=966126491000&text=${encodedMsg}`, '_blank');
}

// Ensure the script runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    Object.keys(prices).forEach(updatePriceForPackage);

    document.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', function () {
            selectPackage(this);
        });
    });
});
