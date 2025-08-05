import configparser
import os
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2

app = Flask(__name__)

# Load DB config from ini file
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
print(f"Looking for config.ini at: {config_path}")
if not os.path.exists(config_path):
    raise RuntimeError(f"config.ini not found at {config_path}")
config.read(config_path)
print(f"Config sections found: {config.sections()}")
if 'postgres' not in config:
    raise RuntimeError("Missing 'postgres' section in config.ini. Please ensure config.ini exists and has a [postgres] section.")
db_config = config['postgres']

def get_db_connection():
    # Fill in with your actual Supabase/Postgres details in config.ini
    conn = psycopg2.connect(
        host=db_config['host'],
        database=db_config['database'],
        user=db_config['user'],
        password=db_config['password'],
        port=db_config.get('port', 5432),
        sslmode='require'
    )
    return conn

def user_exists(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM users WHERE email = %s", (email,))
    exists = cur.fetchone() is not None
    cur.close()
    conn.close()
    return exists

def create_user(email, password_hash, name=None, phone=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (email, password_hash, name, phone) VALUES (%s, %s, %s, %s)",
        (email, password_hash, name, phone)
    )
    conn.commit()
    cur.close()
    conn.close()

def get_user_hash(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row[0] if row else None

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone = data.get('phone')
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400
    if email.lower() == 'guest':
        return jsonify({'success': False, 'message': 'Cannot use reserved email'}), 403
    if user_exists(email):
        return jsonify({'success': False, 'message': 'User already exists'}), 409
    password_hash = generate_password_hash(password)
    create_user(email, password_hash, name, phone)
    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400
    if email.lower() == 'guest':
        return jsonify({'success': False, 'message': 'Cannot login as guest'}), 403
    user_hash = get_user_hash(email)
    if not user_hash or not check_password_hash(user_hash, password):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    return jsonify({'success': True, 'message': 'Login successful'}), 200

@app.route('/guest', methods=['POST'])
def guest():
    # Allow anonymous guest access
    return jsonify({'success': True, 'message': 'Guest access granted', 'user': 'guest'}), 200

if __name__ == '__main__':
    app.run(debug=True)
