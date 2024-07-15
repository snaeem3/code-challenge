import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_api_parse_succeeds(client):
    address_string = '123 main st chicago il'
    response = client.get(reverse('address-parse'), {'address': address_string})

    assert response.status_code == 200
    data = response.json()

    assert 'input_string' in data
    assert 'address_components' in data
    assert 'address_type' in data

    assert data['input_string'] == address_string
    assert isinstance(data['address_components'], dict)
    assert isinstance(data['address_type'], str)

    parsed_address = data["address_components"]
    assert parsed_address == {
        "AddressNumber": "123",
        "StreetName": "main",
        "StreetNamePostType": "st",
        "PlaceName": "chicago",
        "StateName": "il",
    }


@pytest.mark.django_db
def test_api_parse_raises_error(client):
    address_string = '123 main st chicago il 123 main st'
    response = client.get(reverse('address-parse'), {'address': address_string})

    assert response.status_code == 400
    data = response.json()

    assert 'error' in data
    assert 'details' in data
