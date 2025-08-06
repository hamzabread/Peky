import os
import configparser
from flask import Blueprint, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor

product_bp = Blueprint('product', __name__)

# Load DB config from ini file
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
config.read(config_path)

# Check for postgres section
if 'postgres' not in config:
    raise RuntimeError("Missing 'postgres' section in config.ini")

db_config = config['postgres']

def get_db_connection():
    """Create and return a database connection"""
    conn = psycopg2.connect(
        host=db_config.get('host'),
        database=db_config.get('database'),
        user=db_config.get('user'),
        password=db_config.get('password'),
        port=db_config.get('port', 5432),
        sslmode='require'
    )
    return conn

@product_bp.route('/products', methods=['GET'])
def get_products():
    """
    Fetch all products with their primary images.
    Returns a list of products with basic info and primary image URL.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT 
            p.id, 
            p.product_code, 
            p.name, 
            p.type, 
            p.description,
            (
                SELECT image_url 
                FROM product_images 
                WHERE product_id = p.id AND is_primary = TRUE 
                ORDER BY id ASC LIMIT 1
            ) as primary_image
        FROM 
            products p
        ORDER BY 
            p.name
        """
        cursor.execute(query)
        products = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({
            'success': True,
            'products': products
        })
    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({
            'success': False,
            'message': 'Failed to fetch products',
            'error': str(e)
        }), 500
