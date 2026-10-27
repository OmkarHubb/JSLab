document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeeTableBody = document.getElementById('employeeTableBody');
    const loadBtn = document.getElementById('loadBtn');
    const jsonOutputBox = document.getElementById('jsonOutputBox');
    const jsonDisplay = document.getElementById('jsonDisplay');

    // Array to hold the latest complete list of employees
    let currentEmployees = [];

    // Pre-load current state silently in the background so we have the existing records
    fetch('employees.json')
        .then(res => res.ok ? res.json() : [])
        .then(data => {
            currentEmployees = data;
        })
        .catch(err => console.log('Silent initial load failed. Starting with empty array.'));

    // Handle form submission to add a new employee
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Take details from the user
        const empId = document.getElementById('empId').value;
        const empName = document.getElementById('empName').value;
        const empDept = document.getElementById('empDept').value;
        const empSalary = document.getElementById('empSalary').value;

        // 2. Convert entered info to a JS Object
        const newEmployee = {
            id: empId,
            name: empName,
            department: empDept,
            salary: parseFloat(empSalary)
        };

        // Add the new employee to our running list
        currentEmployees.push(newEmployee);

        // Convert the ENTIRE LIST into JSON using JSON.stringify()
        const jsonString = JSON.stringify(currentEmployees, null, 2);
        
        // Show JSON output to the user
        jsonOutputBox.style.display = 'block';
        jsonDisplay.textContent = jsonString;

        // Automatically trigger download of the updated JSON file
        downloadJSON(jsonString, 'employees.json');

        // 3. Display the info dynamically in the HTML table
        addEmployeeToTable(newEmployee);

        // Reset the form
        employeeForm.reset();
    });

    // Helper function to trigger a file download from the browser
    function downloadJSON(content, fileName) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a); // Append to body for Firefox support
        a.click();
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(url);
    }

    // 5. Use fetch() to load records from employees.json
    loadBtn.addEventListener('click', () => {
        const originalText = loadBtn.textContent;
        loadBtn.textContent = 'Loading...';
        loadBtn.disabled = true;

        // Fetching data
        fetch('employees.json')
            .then(response => {
                // Browsers often cache fetch responses. We add a timestamp query parameter to bypass cache 
                // so it actually loads the newly downloaded file if the user replaced it on the server.
                return fetch('employees.json?t=' + new Date().getTime());
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Clear existing table data to avoid duplicates
                employeeTableBody.innerHTML = '';
                
                // Update our running list to match what was fetched
                currentEmployees = data;
                
                // Dynamically display loaded records
                data.forEach(employee => {
                    addEmployeeToTable(employee);
                });
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                alert('Failed to load employee data. Note: fetch() requires a local web server (like VS Code Live Server).');
            })
            .finally(() => {
                loadBtn.textContent = originalText;
                loadBtn.disabled = false;
            });
    });

    // Helper function to append a new row to the table
    function addEmployeeToTable(employee) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>$${employee.salary.toLocaleString()}</td>
        `;
        
        employeeTableBody.appendChild(row);
    }
});
