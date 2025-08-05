import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_signup_and_login(client):
    # Clean up user if exists (optional, requires DB access)
    email = "testuser@example.com"
    password = "testpassword"

    # Signup
    resp = client.post('/signup', json={
        "email": email,
        "password": password,
        "name": "Test User",
        "phone": "1234567890"
    })
    assert resp.status_code in (201, 409)  # 409 if already exists
    print("Signup (new or already exists): PASSED")

    # Signup with missing fields
    resp = client.post('/signup', json={})
    assert resp.status_code == 400
    print("Signup with missing fields: PASSED")

    # Signup as guest (should fail)
    resp = client.post('/signup', json={
        "email": "guest",
        "password": "any"
    })
    assert resp.status_code == 403
    print("Signup as guest: PASSED")

    # Login with correct credentials
    resp = client.post('/login', json={
        "email": email,
        "password": password
    })
    assert resp.status_code == 200
    print("Login with correct credentials: PASSED")

    # Login with wrong password
    resp = client.post('/login', json={
        "email": email,
        "password": "wrongpassword"
    })
    assert resp.status_code == 401
    print("Login with wrong password: PASSED")

    # Login with missing fields
    resp = client.post('/login', json={})
    assert resp.status_code == 400
    print("Login with missing fields: PASSED")

    # Login as guest (should fail)
    resp = client.post('/login', json={
        "email": "guest",
        "password": "any"
    })
    assert resp.status_code == 403
    print("Login as guest: PASSED")

def test_guest_route(client):
    resp = client.post('/guest')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['success'] is True
    assert data['user'] == 'guest'
    print("Guest route: PASSED")
