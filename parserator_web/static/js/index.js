/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
   document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('address-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const addressInput = document.getElementById('address').value;
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    
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
            alert(data.error);
          } else {
            document.getElementById('parse-type').innerText = data.address_type;
            const resultsTableBody = document.getElementById('results-table-body');
            resultsTableBody.innerHTML = '';
    
            for (const [part, tag] of Object.entries(data.address_components)) {
              const row = document.createElement('tr');
              const partCell = document.createElement('td');
              const tagCell = document.createElement('td');
    
              partCell.innerText = part;
              tagCell.innerText = tag;
    
              row.appendChild(partCell);
              row.appendChild(tagCell);
              resultsTableBody.appendChild(row);
            }
    
            document.getElementById('address-results').style.display = 'block';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while parsing the address.');
        });
      });
    });