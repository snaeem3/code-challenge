document.addEventListener('DOMContentLoaded', function () {
  // Add an event listener to the form to handle form submission
  document.getElementById('address-form').addEventListener('submit', function (event) {
    event.preventDefault() // Prevent page refresh

    const addressInput = document.getElementById('address').value
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value

    // Make a GET request to the API endpoint with the address as a query parameter
    fetch(`/api/parse/?address=${encodeURIComponent(addressInput)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          // If the response is successful, update the DOM with the parsed address components
          document.getElementById('parse-type').innerText = data.address_type
          const resultsTableBody = document.getElementById('results-table-body')
          resultsTableBody.innerHTML = ''

          for (const [part, tag] of Object.entries(data.address_components)) {
            const row = document.createElement('tr')
            const partCell = document.createElement('td')
            const tagCell = document.createElement('td')

            partCell.innerText = part
            tagCell.innerText = tag

            row.appendChild(partCell)
            row.appendChild(tagCell)
            resultsTableBody.appendChild(row)
          }

          document.getElementById('address-results').style.display = 'block'
        }
      })
      .catch(error => {
        console.error('Error:', error)
        alert('An error occurred while parsing the address.')
      })
  })
})