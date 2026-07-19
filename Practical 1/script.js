function calculateBill() {

    let customerName = document.getElementById("name").value;
    let product = document.getElementById("product").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);

    const GST = 0.18;

    let subtotal = price * quantity;
    let gstAmount = subtotal * GST;
    let total = subtotal + gstAmount;

    const bill = {
        customerName,
        product,
        subtotal,
        gstAmount,
        total
    };

    const {
        customerName: name,
        product: item,
        subtotal: sub,
        gstAmount: gst,
        total: finalAmount
    } = bill;

    document.getElementById("bill").innerHTML = `
        <h2>Bill Details</h2>
        <p><b>Customer:</b> ${name}</p>
        <p><b>PRN: 25070521515</b></p>
        <p><b>Product:</b> ${item}</p>
        <p><b>Subtotal:</b> ₹${sub.toFixed(2)}</p>
        <p><b>GST (18%):</b> ₹${gst.toFixed(2)}</p>
        <h3><b>Total Amount:</b> ₹${finalAmount.toFixed(2)}</h3>
    `;

    console.log(`Customer: ${name}`);
    console.log(`Product: ${item}`);
    console.log(`Total Bill: ${finalAmount.toFixed(2)}`);
}