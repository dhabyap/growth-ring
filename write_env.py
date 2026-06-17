import sys, os

# Build .env content
env_lines = [
    'DATABASE_URL="mysql://root:@localhost:3306/growthring"',
    'TWITTER_CONSUMER_KEY=aWlwVmFtQnhLNEZzMGdqMVduTzA6MTpjaQ',
    'TWITTER_CONSUMER_SECRET=F9f2Ob...with open(env_path, 'r') as f:
    for line in f:
        if line.startswith('NEXTAUTH_SECRET='):
            env_lines.append(line.rstrip('\n\r'))

env_lines.append('NEXTAUTH_URL=https:...open(env_path, 'w') as f:
    f.write('\n'.join(env_lines))
    f.write('\n')

print(f"Written {len(env_lines)} lines to {env_path}")
with open(env_path, 'r') as f:
    print(f.read())
