new_lines = []

with open('pokemon_data.csv') as f:
    content = f.readlines()
    for line in content:
        for l in line.split():
            new_lines.append(l)

with open('pokemon_data.csv', 'w') as f:
    for line in new_lines:
        f.write(line + '\n')