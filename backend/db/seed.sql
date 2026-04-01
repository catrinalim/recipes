-- Sample Testing Data

-- Test user
INSERT INTO users (username, email, password_hash)
VALUES ('testuser', 'test@example.com', 'test_password')
RETURNING id;

