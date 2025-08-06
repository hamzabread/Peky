import os
import configparser
from flask import Flask
from flask_cors import CORS

# Import blueprints
from product_api import product_bp
from product_detail_api import product_detail_bp
from contact_api import contact_bp

app = Flask(__name__)
CORS(app)

# Load config
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
print(f"Looking for config.ini at: {config_path}")
if not os.path.exists(config_path):
    raise RuntimeError(f"config.ini not found at {config_path}")
config.read(config_path)
print(f"Config sections found: {config.sections()}")

# Register blueprints
app.register_blueprint(product_bp)
app.register_blueprint(product_detail_bp)
app.register_blueprint(contact_bp)

if __name__ == '__main__':
    app.run(debug=True)
if __name__ == '__main__':
    app.run(debug=True)
