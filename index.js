
const prices = {
    mix: { monthly: { 1: 399, 2: 299 }, cash: { 1: 4499, 2: 5299 } },
    shamela: { monthly: { 1: 349, 2: 249 }, cash: { 1: 3850, 2: 4750 } },
    asasiyah: { monthly: { 1: 279, 2: 199 }, cash: { 1: 3200, 2: 4200 } },
    mobile: { monthly: { 1: 149, 2: 119 }, cash: { 1: 1668, 2: 2666 } }
};

let selectedPackage = null;
let duration;
let paymentType;
function updatePriceForPackage(pkg) {
    duration = parseInt(document.getElementById("duration-" + pkg).value);
    paymentType = document.getElementById("paymentType-" + pkg).value;
    const price = prices[pkg][paymentType][duration];
    document.getElementById("price-" + pkg).innerHTML = `💵 السعر: ${price} ريال`;
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

    const msg = `لقد اخترت ${packageNamesArabic[selectedPackage]} لمدة ${duration} سنة، طريقة الدفع: ${paymentTypeArabic[paymentType]} بسعر ${prices[selectedPackage][paymentType][duration]}  ريال. أرغب في الحصول على المزيد من المعلومات `;
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

