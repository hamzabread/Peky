import os
from flask import Flask
from flask_cors import CORS

# Import blueprints
from product_api import product_bp
from product_detail_api import product_detail_bp
from contact_api import contact_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(product_bp)
app.register_blueprint(product_detail_bp)
app.register_blueprint(contact_bp)

if __name__ == '__main__':
    app.run(debug=True)
config.read(config_path)
print(f"Config sections found: {config.sections()}")

# Register blueprints
app.register_blueprint(product_bp)
app.register_blueprint(product_detail_bp)
app.register_blueprint(contact_bp)

if __name__ == '__main__':
    app.run(debug=True)
