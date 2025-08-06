import os
import configparser
import boto3
from botocore.exceptions import ClientError
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# Load AWS config from ini file
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
config.read(config_path)
if 'aws' not in config:
    raise RuntimeError("Missing 'aws' section in config.ini.")
aws_config = config['aws']

# Initialize AWS Cognito client
cognito_client = boto3.client('cognito-idp',
    region_name=aws_config.get('region_name'),
    aws_access_key_id=aws_config.get('aws_access_key_id'),
    aws_secret_access_key=aws_config.get('aws_secret_access_key')
)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')
    phone = data.get('phone', '')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400
    
    if email.lower() == 'guest':
        return jsonify({'success': False, 'message': 'Cannot use reserved email'}), 403
    
    try:
        response = cognito_client.sign_up(
            ClientId=aws_config.get('app_client_id'),
            Username=email,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'name',
                    'Value': name
                },
                {
                    'Name': 'phone_number',
                    'Value': phone
                }
            ]
        )
        return jsonify({'success': True, 'message': 'User registered successfully', 'user_id': response['UserSub']}), 201
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code')
        if error_code == 'UsernameExistsException':
            return jsonify({'success': False, 'message': 'User already exists'}), 409
        else:
            print(f"Signup error: {e}")
            return jsonify({'success': False, 'message': str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400
    
    if email.lower() == 'guest':
        return jsonify({'success': False, 'message': 'Cannot login as guest'}), 403
    
    try:
        response = cognito_client.initiate_auth(
            ClientId=aws_config.get('app_client_id'),
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            }
        )
        
        return jsonify({
            'success': True, 
            'message': 'Login successful',
            'tokens': {
                'access_token': response['AuthenticationResult']['AccessToken'],
                'id_token': response['AuthenticationResult']['IdToken'],
                'refresh_token': response['AuthenticationResult']['RefreshToken'],
                'expires_in': response['AuthenticationResult']['ExpiresIn']
            }
        }), 200
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code')
        if error_code == 'NotAuthorizedException':
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        else:
            print(f"Login error: {e}")
            return jsonify({'success': False, 'message': str(e)}), 400

@auth_bp.route('/guest', methods=['POST'])
def guest():
    # Allow anonymous guest access
    return jsonify({'success': True, 'message': 'Guest access granted', 'user': 'guest'}), 200
