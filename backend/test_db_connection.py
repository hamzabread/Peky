import configparser
import os
import psycopg2

def test_db_connection():
    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
    print(f"Looking for config.ini at: {config_path}")
    if not os.path.exists(config_path):
        print(f"config.ini not found at {config_path}")
        return
    config.read(config_path)
    if 'postgres' not in config:
        print("Missing 'postgres' section in config.ini")
        return
    db_config = config['postgres']
    try:
        conn = psycopg2.connect(
            host=db_config.get('host'),
            database=db_config.get('database'),
            user=db_config.get('user'),
            password=db_config.get('password'),
            port=db_config.get('port', 5432),
            sslmode='require'
        )
        print("Database connection successful!")
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        print("Test query executed successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Database connection failed: {e}")

if __name__ == "__main__":
    test_db_connection()
