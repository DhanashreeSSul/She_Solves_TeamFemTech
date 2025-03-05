document.getElementByld('ineventoryForm')
.addEventListener('submit',async(e)=> {
    e.preventDefault();
    const item ={
        name:
document.getElementById('name').value,
        category:
document.getElementById('category').value,
        quantity:
document.getElementById('quantity').value,
        expiry_date:
document.getElementById('expiry_date').value,
        threshold_limit:
document.getElementById('threshold_limit').value                                        
    };
    await fetch('http://localhost:5000/api/inventory/add',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(item)
    

    });
    loadInventory();

});
async function loadInventory() {
    const res = await fetch('http://localhost:5000/api/inventory');
    const data = await res.json();
    let html = '<h2>Inventory List</h2>';
    data.forEach(item => {
        html += <p>${item.name} - ${item.quantity}</p>;
    });
    document.getElementById('inventoryList').innerHTML = html;
}

loadInventory();

