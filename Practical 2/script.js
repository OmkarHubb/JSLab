function calculateBill() {

    // Input Values
    let customerName = document.getElementById("customerName").value;
    let productName = document.getElementById("productName").value;

    let price = Number(document.getElementById("price").value);
    let qty = Number(document.getElementById("qty").value);
    let discount = Number(document.getElementById("discount").value);
    let gst = Number(document.getElementById("gst").value);
    let shipping = Number(document.getElementById("shipping").value);
    let coupon = Number(document.getElementById("coupon").value);

    let paymentMethod = document.getElementById("paymentMethod").value;

    // Calculations
    let subtotal = price * qty;

    let discountAmount = (subtotal * discount) / 100;

    let taxableAmount = subtotal - discountAmount - coupon;

    // Prevent negative taxable amount
    if (taxableAmount < 0) {
        taxableAmount = 0;
    }

    let gstAmount = (taxableAmount * gst) / 100;

    let finalTotal = taxableAmount + gstAmount + shipping;

    // Display Bill Summary
    document.getElementById("customer").innerHTML =
        "Customer Name: " + customerName;

    document.getElementById("product").innerHTML =
        "Product Name: " + productName;

    document.getElementById("subtotal").innerHTML =
        "Subtotal: ₹ " + subtotal.toFixed(2);

    document.getElementById("discountAmount").innerHTML =
        "Discount (" + discount + "%): ₹ " + discountAmount.toFixed(2);

    document.getElementById("couponAmount").innerHTML =
        "Coupon Discount: ₹ " + coupon.toFixed(2);

    document.getElementById("taxable").innerHTML =
        "Taxable Amount: ₹ " + taxableAmount.toFixed(2);

    document.getElementById("gstAmount").innerHTML =
        "GST (" + gst + "%): ₹ " + gstAmount.toFixed(2);

    document.getElementById("shippingDisplay").innerHTML =
        "Shipping Charges: ₹ " + shipping.toFixed(2);

    document.getElementById("payment").innerHTML =
        "Payment Method: " + paymentMethod;

    document.getElementById("finalTotal").innerHTML =
        "Total Payable: ₹ " + finalTotal.toFixed(2);
}