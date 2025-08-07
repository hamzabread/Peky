import os
import configparser
from flask import Blueprint, request, jsonify
import psycopg2

contact_bp = Blueprint('contact', __name__)

# Load DB config from ini file
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
config.read(config_path)
if 'postgres' not in config:
    raise RuntimeError("Missing 'postgres' section in config.ini")
db_config = config['postgres']

def get_db_connection():
    conn = psycopg2.connect(
        host=db_config.get('host'),
        database=db_config.get('database'),
        user=db_config.get('user'),
        password=db_config.get('password'),
        port=db_config.get('port', 5432),
        sslmode='require'
    )
    return conn

@contact_bp.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')

    if not name or not email or not phone or not message:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO customers (name, email, phone, message) VALUES (%s, %s, %s, %s)",
            (name, email, phone, message)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'message': 'Contact form submitted successfully'}), 201
    except Exception as e:
        print(f"Error inserting contact: {e}")
        return jsonify({'success': False, 'message': 'Failed to submit contact form', 'error': str(e)}), 500
